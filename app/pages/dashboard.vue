<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Ringkasan inventaris Anda</p>
      </div>
      <div class="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-gray-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
        <span>{{ new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
      </div>
    </div>

    <OnboardingBanner v-if="connections.length === 0 && !loading" />

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <DashboardStat title="Toko Terhubung" :value="stats.storesConnected" :max="3" icon="i-heroicons-building-storefront" color="blue" />
      <DashboardStat title="Total Produk" :value="stats.totalProducts" icon="i-heroicons-cube" color="cyan" />
      <DashboardStat title="Master SKU" :value="stats.masterSku" icon="i-heroicons-tag" color="emerald" />
      <DashboardStat title="Sinkronisasi" :value="stats.syncStatus" icon="i-heroicons-arrow-path" color="amber" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 class="font-semibold text-gray-900 dark:text-white">Marketplace Terhubung</h3>
        </div>
        <div v-if="loading" class="px-6 py-8 text-center text-sm text-gray-400">Memuat...</div>
        <div v-else class="divide-y divide-gray-50 dark:divide-gray-800">
          <div
            v-for="mp in marketplaces"
            :key="mp.id"
            class="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-xl">
                <UIcon :name="mp.icon_name" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ mp.name }}</p>
                <p v-if="getConnection(mp.id)?.store_name" class="text-xs text-gray-500">{{ getConnection(mp.id).store_name }}</p>
                <p v-else class="text-xs text-gray-400">Belum terhubung</p>
              </div>
            </div>
            <span
              :class="getConnection(mp.id)
                ? 'bg-green-50 text-green-700 ring-green-600/20'
                : 'bg-gray-100 text-gray-500 ring-gray-500/10'"
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            >
              <span :class="getConnection(mp.id) ? 'bg-green-500' : 'bg-gray-400'" class="w-1.5 h-1.5 rounded-full" />
              {{ getConnection(mp.id) ? 'Terhubung' : 'Terputus' }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 class="font-semibold text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
        </div>
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
            <UIcon name="i-heroicons-clock" class="w-6 h-6 text-gray-400" />
          </div>
          <p class="text-sm font-medium text-gray-900 dark:text-white mb-1">Belum Ada Aktivitas</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 max-w-xs">Hubungkan toko marketplace Anda untuk mulai melihat aktivitas sinkronisasi.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const { getMarketplaces, getConnections } = useIntegration()
const { getProductsCount } = useProducts()
const { getMasterSkuCount } = useMasterSku()
const marketplaces = ref<any[]>([])
const connections = ref<any[]>([])
const productCount = ref(0)
const masterSkuCount = ref(0)
const loading = ref(true)

function getConnection(marketplaceId: string) {
  return connections.value.find((c: any) => c.marketplace_id === marketplaceId) || null
}

const stats = computed(() => ({
  storesConnected: connections.value.filter((c: any) => c.status === 'connected').length,
  totalProducts: productCount.value,
  masterSku: masterSkuCount.value,
  syncStatus: connections.value.length > 0 ? 'Aktif' : 'Tidak Aktif'
}))

async function loadData() {
  loading.value = true
  try {
    marketplaces.value = await getMarketplaces()
    connections.value = await getConnections()
    productCount.value = await getProductsCount()
    masterSkuCount.value = await getMasterSkuCount()
  } catch (e) { console.error(e) } finally { loading.value = false }
}

onMounted(loadData)
</script>