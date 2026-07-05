<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Master SKU</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ items.length }} master SKU terdaftar
        </p>
      </div>
      <UButton color="primary" @click="openCreateModal">
        + Buat Master SKU
      </UButton>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-500">
      Memuat data...
    </div>

    <div v-else-if="items.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-tag" class="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Master SKU</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Buat Master SKU untuk menghubungkan produk yang sama dari berbagai marketplace.
      </p>
      <UButton color="primary" @click="openCreateModal">
        + Buat Master SKU Pertama
      </UButton>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="sku in items" :key="sku.id">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold truncate">{{ sku.name }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SKU: {{ sku.sku_code }}
            </p>
          </div>
          <UDropdownMenu :items="dropdownActions(sku)">
            <UButton icon="i-heroicons-ellipsis-vertical" color="neutral" variant="ghost" size="sm" />
          </UDropdownMenu>
        </div>
        <p v-if="sku.description" class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {{ sku.description }}
        </p>
        <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <UBadge :color="sku.current_stock > 0 ? 'success' : 'error'" variant="soft" size="sm">
            Stok: {{ sku.current_stock }}
          </UBadge>
          <span class="text-xs text-gray-500">
            {{ getLinkedCount(sku.id) }} produk terhubung
          </span>
        </div>
      </UCard>
    </div>

    <UModal v-model="showModal">
      <UCard>
        <template #header>
          <h3 class="font-semibold">{{ editingId ? 'Edit Master SKU' : 'Buat Master SKU' }}</h3>
        </template>
        <UForm :state="form" @submit="handleSave" class="space-y-4">
          <UFormField label="Kode SKU" name="skuCode" required>
            <UInput v-model="form.sku_code" placeholder="KAOS-POLOS-HITAM-M" class="w-full" />
          </UFormField>
          <UFormField label="Nama Produk" name="name" required>
            <UInput v-model="form.name" placeholder="Kaos Polos Hitam Size M" class="w-full" />
          </UFormField>
          <UFormField label="Deskripsi" name="description">
            <UTextarea v-model="form.description" placeholder="Deskripsi master SKU" class="w-full" />
          </UFormField>
          <UFormField label="Stok Awal" name="currentStock">
            <UInput v-model.number="form.current_stock" type="number" min="0" class="w-full" />
          </UFormField>
          <div class="flex justify-end gap-3 pt-2">
            <UButton color="neutral" variant="soft" @click="showModal = false">
              Batal
            </UButton>
            <UButton type="submit" color="primary" :loading="saving">
              {{ editingId ? 'Simpan' : 'Buat' }}
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

    <UModal v-model="showLinkModal">
      <UCard>
        <template #header>
          <h3 class="font-semibold">Hubungkan Produk ke {{ linkingSkuName }}</h3>
        </template>

        <div v-if="availableProducts.length === 0" class="text-center py-6 text-gray-500">
          Tidak ada produk yang tersedia. Buat produk terlebih dahulu.
        </div>

        <div v-else class="space-y-2 max-h-80 overflow-y-auto">
          <div
            v-for="product in availableProducts"
            :key="product.id"
            class="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div>
              <p class="font-medium text-sm">{{ product.name }}</p>
              <p class="text-xs text-gray-500">SKU: {{ product.sku || '-' }} | Stok: {{ product.stock }}</p>
            </div>
            <UButton
              size="sm"
              color="primary"
              variant="soft"
              @click="handleLinkProduct(product)"
            >
              Hubungkan
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const {
  getMasterSkus, getMasterSkuItems, createMasterSku,
  updateMasterSku, deleteMasterSku, linkProduct
} = useMasterSku()
const { getProducts } = useProducts()

const items = ref<any[]>([])
const linkedItems = ref<Record<string, any[]>>({})
const allProducts = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editingId = ref('')
const saving = ref(false)
const showLinkModal = ref(false)
const linkingSkuId = ref('')
const linkingSkuName = ref('')

const form = reactive({
  sku_code: '',
  name: '',
  description: '',
  current_stock: 0
})

const availableProducts = computed(() => {
  const linked = linkedItems.value[linkingSkuId.value] || []
  const linkedIds = new Set(linked.map((li: any) => li.product_id))
  return allProducts.value.filter((p: any) => !linkedIds.has(p.id))
})

function getLinkedCount(skuId: string) {
  return (linkedItems.value[skuId] || []).length
}

function openCreateModal() {
  editingId.value = ''
  form.sku_code = ''
  form.name = ''
  form.description = ''
  form.current_stock = 0
  showModal.value = true
}

function editSku(sku: any) {
  editingId.value = sku.id
  form.sku_code = sku.sku_code
  form.name = sku.name
  form.description = sku.description || ''
  form.current_stock = sku.current_stock || 0
  showModal.value = true
}

function openLinkModal(sku: any) {
  linkingSkuId.value = sku.id
  linkingSkuName.value = sku.name
  showLinkModal.value = true
}

function dropdownActions(sku: any) {
  return [
    [{
      label: 'Hubungkan Produk',
      icon: 'i-heroicons-link',
      onSelect: () => openLinkModal(sku)
    }],
    [{
      label: 'Edit',
      icon: 'i-heroicons-pencil-square',
      onSelect: () => editSku(sku)
    }],
    [{
      label: 'Hapus',
      icon: 'i-heroicons-trash',
      color: 'error' as const,
      onSelect: () => handleDelete(sku.id)
    }]
  ]
}

async function handleSave() {
  if (!form.sku_code || !form.name) return
  saving.value = true
  try {
    const payload = {
      sku_code: form.sku_code,
      name: form.name,
      description: form.description,
      current_stock: form.current_stock
    }
    if (editingId.value) {
      await updateMasterSku(editingId.value, payload)
    } else {
      await createMasterSku(payload)
    }
    showModal.value = false
    await loadData()
  } catch (e: any) {
    console.error(e)
  } finally {
    saving.value = false
  }
}

async function handleDelete(id: string) {
  try {
    await deleteMasterSku(id)
    await loadData()
  } catch (e) {
    console.error(e)
  }
}

async function handleLinkProduct(product: any) {
  try {
    await linkProduct(linkingSkuId.value, product.id)
    await loadData()
  } catch (e) {
    console.error(e)
  }
}

async function loadData() {
  loading.value = true
  try {
    items.value = await getMasterSkus()
    allProducts.value = await getProducts()
    const linkedMap: Record<string, any[]> = {}
    for (const sku of items.value) {
      linkedMap[sku.id] = await getMasterSkuItems(sku.id)
    }
    linkedItems.value = linkedMap
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>
