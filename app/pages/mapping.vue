<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Mapping SKU</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Hubungkan produk marketplace ke Master SKU
        </p>
      </div>
      <UButton color="primary" @click="openLinkModal">
        + Tambah Mapping
      </UButton>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-500">
      Memuat data...
    </div>

    <div v-else-if="masterSkus.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-arrows-right-left" class="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Mapping</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
        Buat Master SKU terlebih dahulu, lalu hubungkan produk-produk dari marketplace ke Master SKU tersebut.
      </p>
      <UButton to="/master-sku" color="primary" variant="soft">
        Buat Master SKU
      </UButton>
    </div>

    <div v-else class="space-y-6">
      <UCard v-for="sku in masterSkus" :key="sku.id">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">{{ sku.name }}</h3>
              <p class="text-xs text-gray-500">SKU: {{ sku.sku_code }} | Stok: {{ sku.current_stock }}</p>
            </div>
            <UBadge color="primary" variant="soft" size="sm">
              {{ getLinkedProducts(sku.id).length }} produk
            </UBadge>
          </div>
        </template>

        <div v-if="getLinkedProducts(sku.id).length === 0" class="text-center py-4 text-sm text-gray-500">
          Belum ada produk yang terhubung
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="item in getLinkedProducts(sku.id)"
            :key="item.id"
            class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
          >
            <div class="flex items-center gap-3">
              <UIcon
                :name="getMarketplaceIcon(item.marketplace_id)"
                class="text-xl"
              />
              <div>
                <p class="text-sm font-medium">{{ item.product?.name || 'Produk' }}</p>
                <p class="text-xs text-gray-500">
                  SKU: {{ item.product?.sku || '-' }} | Stok: {{ item.product?.stock || 0 }}
                </p>
              </div>
            </div>
            <UButton
              icon="i-heroicons-x-mark"
              color="error"
              variant="ghost"
              size="sm"
              @click="handleUnlink(item.id)"
            />
          </div>
        </div>
      </UCard>
    </div>

    <UModal v-model="showLinkModal">
      <UCard>
        <template #header>
          <h3 class="font-semibold">Tambah Mapping</h3>
        </template>

        <UForm @submit="handleAddMapping" class="space-y-4">
          <UFormField label="Master SKU" name="masterSku" required>
            <USelectMenu
              v-model="selectedSkuId"
              :items="skuOptions"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Produk" name="product" required>
            <USelectMenu
              v-model="selectedProductId"
              :items="productOptions"
              class="w-full"
            />
          </UFormField>

          <div class="flex justify-end gap-3 pt-2">
            <UButton color="neutral" variant="soft" @click="showLinkModal = false">
              Batal
            </UButton>
            <UButton type="submit" color="primary" :loading="saving">
              Hubungkan
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { getMasterSkus, getMasterSkuItems, linkProduct, unlinkProduct } = useMasterSku()
const { getProducts } = useProducts()
const { getMarketplaces } = useIntegration()

const masterSkus = ref<any[]>([])
const allProducts = ref<any[]>([])
const marketplaces = ref<any[]>([])
const linkedMap = ref<Record<string, any[]>>({})
const loading = ref(true)
const showLinkModal = ref(false)
const selectedSkuId = ref('')
const selectedProductId = ref('')
const saving = ref(false)

const skuOptions = computed(() =>
  masterSkus.value.map((s: any) => ({ label: `${s.name} (${s.sku_code})`, value: s.id }))
)

const productOptions = computed(() => {
  const linkedIds = new Set<string>()
  Object.values(linkedMap.value).forEach((items: any) => {
    items.forEach((item: any) => linkedIds.add(item.product_id))
  })
  return allProducts.value
    .filter((p: any) => !linkedIds.has(p.id))
    .map((p: any) => ({ label: `${p.name} (${p.sku || '-'})`, value: p.id }))
})

function getLinkedProducts(skuId: string) {
  return linkedMap.value[skuId] || []
}

function getMarketplaceIcon(marketplaceId: string) {
  const mp = marketplaces.value.find((m: any) => m.id === marketplaceId)
  return mp?.icon_name || 'i-heroicons-building-storefront'
}

function openLinkModal() {
  selectedSkuId.value = ''
  selectedProductId.value = ''
  showLinkModal.value = true
}

async function handleAddMapping() {
  if (!selectedSkuId.value || !selectedProductId.value) return
  saving.value = true
  try {
    const product = allProducts.value.find((p: any) => p.id === selectedProductId.value)
    await linkProduct(selectedSkuId.value, selectedProductId.value, product?.marketplace_id)
    showLinkModal.value = false
    await loadData()
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}

async function handleUnlink(itemId: string) {
  try {
    await unlinkProduct(itemId)
    await loadData()
  } catch (e) {
    console.error(e)
  }
}

async function loadData() {
  loading.value = true
  try {
    masterSkus.value = await getMasterSkus()
    allProducts.value = await getProducts()
    marketplaces.value = await getMarketplaces()

    const map: Record<string, any[]> = {}
    for (const sku of masterSkus.value) {
      const items = await getMasterSkuItems(sku.id)
      map[sku.id] = items.map((item: any) => {
        const product = allProducts.value.find((p: any) => p.id === item.product_id)
        return { ...item, product }
      })
    }
    linkedMap.value = map
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>
