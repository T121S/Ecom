<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Integrasi Marketplace</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-8">Hubungkan toko Anda dari berbagai marketplace untuk mengelola stok secara terpusat.</p>

    <div v-if="loading" class="text-center py-12 text-gray-500">
      Memuat data...
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ConnectCard
        v-for="mp in marketplaces"
        :key="mp.id"
        :marketplace="mp"
        :connection="getConnection(mp.id)"
        :icon="mp.icon_name"
        :description="`Integrasikan toko ${mp.name} Anda`"
        @connect="openConnectDialog(mp.id, mp.name)"
        @disconnect="handleDisconnect"
      />
    </div>

    <UModal v-model="showModal">
      <UCard>
        <template #header>
          <h3 class="font-semibold">Hubungkan {{ connectingName }}</h3>
        </template>
        <UForm :state="form" @submit="handleConnect" class="space-y-4">
          <UFormField label="Nama Toko" name="storeName" required>
            <UInput v-model="form.storeName" placeholder="contoh: Toko Saya" class="w-full" />
          </UFormField>
          <UButton type="submit" color="primary" block :loading="saving">
            Simpan
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { getMarketplaces, getConnections, connect, disconnect } = useIntegration()
const toast = useToast()
const marketplaces = ref<any[]>([])
const connections = ref<any[]>([])
const loading = ref(true)
const error = ref('')
const showModal = ref(false)
const connectingId = ref('')
const connectingName = ref('')
const saving = ref(false)
const form = reactive({ storeName: '' })

function getConnection(marketplaceId: string) {
  return connections.value.find(c => c.marketplace_id === marketplaceId) || null
}

function openConnectDialog(id: string, name: string) {
  if (!id) return
  toast.add({
    title: 'Dalam Pengembangan',
    description: `Fitur integrasi ${name} sedang dalam pengembangan dan belum tersedia.`,
    color: 'warning',
    icon: 'i-heroicons-information-circle',
    timeout: 4000
  })
}

async function handleConnect() {
  if (!connectingId.value || !form.storeName) return
  saving.value = true
  try {
    await connect(connectingId.value, form.storeName)
    showModal.value = false
    await loadData()
  } catch (e: any) {
    error.value = e.message || 'Gagal menghubungkan'
  } finally {
    saving.value = false
  }
}

async function handleDisconnect(connectionId: string) {
  try {
    await disconnect(connectionId)
    await loadData()
  } catch (e) {
    console.error(e)
  }
}

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    marketplaces.value = await getMarketplaces()
    connections.value = await getConnections()
  } catch (e: any) {
    error.value = 'Gagal memuat data'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  setTimeout(loadData, 100)
})
</script>
