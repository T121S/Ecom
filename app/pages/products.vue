<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Produk</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ products.length }} produk terdaftar</p>
      </div>
      <UButton color="primary" @click="openCreateModal" size="lg">
        + Tambah Produk
      </UButton>
    </div>

    <div v-if="loading" class="text-center py-20 text-gray-400">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 mx-auto mb-3 animate-spin" />
      <p class="text-sm">Memuat data...</p>
    </div>

    <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
      <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <UIcon name="i-heroicons-cube" class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Produk</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
        Tambahkan produk pertama Anda untuk mulai mengelola inventaris.
      </p>
      <UButton color="primary" @click="openCreateModal">
        + Tambah Produk Pertama
      </UButton>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <UCard v-for="product in products" :key="product.id" class="hover:shadow-lg transition-shadow">
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ product.name }}</h3>
            <p v-if="product.sku" class="text-xs text-gray-500 font-mono mt-0.5">SKU: {{ product.sku }}</p>
          </div>
          <UDropdownMenu :items="dropdownActions(product.id)">
            <UButton icon="i-heroicons-ellipsis-vertical" color="neutral" variant="ghost" size="sm" />
          </UDropdownMenu>
        </div>
        <p v-if="product.description" class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {{ product.description }}
        </p>
        <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <UBadge
            :color="product.stock > 0 ? 'success' : 'error'"
            variant="soft"
            size="sm"
          >
            Stok: {{ product.stock }}
          </UBadge>
          <span v-if="product.price" class="text-sm font-semibold text-gray-900 dark:text-white">
            Rp{{ formatPrice(product.price) }}
          </span>
          <span v-else class="text-xs text-gray-400">-</span>
        </div>
      </UCard>
    </div>

    <UModal v-model="showModal">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-lg">{{ editingId ? 'Edit Produk' : 'Tambah Produk' }}</h3>
          <p class="text-sm text-gray-500">Lengkapi informasi produk Anda</p>
        </template>
        <UForm :state="form" @submit="handleSave" class="space-y-4">
          <UFormField label="Nama Produk" name="name" required>
            <UInput v-model="form.name" placeholder="Nama produk" class="w-full" />
          </UFormField>
          <UFormField label="Deskripsi" name="description">
            <UTextarea v-model="form.description" placeholder="Deskripsi produk" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="SKU" name="sku">
              <UInput v-model="form.sku" placeholder="SKU-001" class="w-full" />
            </UFormField>
            <UFormField label="Marketplace" name="marketplace">
              <USelectMenu v-model="form.marketplace_id" :items="marketplaceOptions" class="w-full" />
            </UFormField>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Stok" name="stock">
              <UInput v-model.number="form.stock" type="number" min="0" class="w-full" />
            </UFormField>
            <UFormField label="Harga (Rp)" name="price">
              <UInput v-model.number="form.price" type="number" min="0" class="w-full" />
            </UFormField>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <UButton color="neutral" variant="soft" @click="showModal = false">Batal</UButton>
            <UButton type="submit" color="primary" :loading="saving">{{ editingId ? 'Simpan' : 'Tambah' }}</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const { getProducts, createProduct, updateProduct, deleteProduct } = useProducts()
const { getMarketplaces } = useIntegration()
const products = ref<any[]>([])
const marketplaces = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editingId = ref('')
const saving = ref(false)
const form = reactive({ name: '', description: '', sku: '', stock: 0, price: 0, marketplace_id: '' })

const marketplaceOptions = computed(() => [
  { label: 'Tidak ada', value: '' },
  ...marketplaces.value.map((m: any) => ({ label: m.name, value: m.id }))
])

function openCreateModal() {
  editingId.value = ''
  form.name = ''; form.description = ''; form.sku = ''; form.stock = 0; form.price = 0; form.marketplace_id = ''
  showModal.value = true
}

function editProduct(product: any) {
  editingId.value = product.id
  form.name = product.name; form.description = product.description || ''
  form.sku = product.sku || ''; form.stock = product.stock || 0
  form.price = product.price || 0; form.marketplace_id = product.marketplace_id || ''
  showModal.value = true
}

function dropdownActions(productId: string) {
  return [
    [{ label: 'Edit', icon: 'i-heroicons-pencil-square', onSelect: () => editProduct(products.value.find(p => p.id === productId)) }],
    [{ label: 'Hapus', icon: 'i-heroicons-trash', color: 'error' as const, onSelect: () => handleDelete(productId) }]
  ]
}

async function handleSave() {
  if (!form.name) return
  saving.value = true
  try {
    const payload = { name: form.name, description: form.description, sku: form.sku, stock: form.stock, price: form.price, marketplace_id: form.marketplace_id || null }
    if (editingId.value) await updateProduct(editingId.value, payload)
    else await createProduct(payload)
    showModal.value = false; await loadData()
  } catch (e: any) { console.error(e) } finally { saving.value = false }
}

async function handleDelete(id: string) {
  try { await deleteProduct(id); await loadData() } catch (e) { console.error(e) }
}

async function loadData() {
  loading.value = true
  try { marketplaces.value = await getMarketplaces(); products.value = await getProducts() }
  catch (e) { console.error(e) } finally { loading.value = false }
}

function formatPrice(price: number) { return new Intl.NumberFormat('id-ID').format(price) }

onMounted(loadData)
</script>
