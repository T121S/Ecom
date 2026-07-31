<template>
  <section id="features" class="section bg-slate-50 dark:bg-slate-950">
    <div class="container-page">
      <div class="max-w-2xl mx-auto text-center mb-14">
        <div class="badge-dot mb-4 mx-auto">Fitur</div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Semua yang Anda butuhkan untuk
          <span class="text-blue-600 dark:text-blue-400">kelola stok multi-platform</span>
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          Bits tanpa setup rumit. Hubungkan toko Anda sekali, biarkan OmniStock bekerja otomatis.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="f in features"
          :key="f.title"
          :class="`card p-6 group ring-1 ring-transparent ${colorMap[f.color].ring}`"
        >
          <div :class="`w-12 h-12 rounded-xl ${colorMap[f.color].bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`">
            <svg class="w-6 h-6" :class="colorMap[f.color].text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="iconMap[f.icon]" />
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ f.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Feature = {
  title: string
  desc: string
  icon: keyof typeof iconMap
  color: keyof typeof colorMap
}

const features: Feature[] = [
  {
    title: 'Sinkronisasi Real-time',
    desc: 'Update stok di satu tempat, langsung tersebar ke semua marketplace dalam hitungan detik. Tidak perlu refresh manual.',
    icon: 'sync',
    color: 'blue'
  },
  {
    title: 'Anti Overselling',
    desc: 'Sistem otomatis mengunci stok saat ada pesanan masuk, mencegah penjualan barang yang sudah habis di gudang fisik.',
    icon: 'shield',
    color: 'red'
  },
  {
    title: 'Satu Master SKU',
    desc: 'Satukan produk yang sama dari Shopee, Tokopedia, dan Lazada ke satu Master SKU. Edit stok sekali, update di mana-mana.',
    icon: 'tag',
    color: 'emerald'
  },
  {
    title: 'Dashboard Terpusat',
    desc: 'Pantau status koneksi, total produk, dan aktivitas sinkronisasi seluruh toko dari satu layar yang bersih & ringan.',
    icon: 'grid',
    color: 'cyan'
  },
  {
    title: 'Otomatisasi Webhook',
    desc: 'Setiap penjualan langsung memicu pembaruan stok ke platform lain tanpa intervensi manual. <5 detik end-to-end.',
    icon: 'bolt',
    color: 'amber'
  },
  {
    title: 'Aman & Terenkripsi',
    desc: 'Data Anda disimpan di Supabase dengan enkripsi standar industri. OAuth resmi dari tiap marketplace, tanpa simpan password.',
    icon: 'lock',
    color: 'purple'
  }
]

const iconMap = {
  sync: '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  tag: '<path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.59-7.59a1 1 0 0 0 0-1.41z"/><path d="M7 7h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
} as const

const colorMap = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-600 dark:text-blue-400', ring: 'group-hover:ring-blue-200 dark:group-hover:ring-blue-900' },
  red: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-600 dark:text-red-400', ring: 'group-hover:ring-red-200 dark:group-hover:ring-red-900' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-600 dark:text-emerald-400', ring: 'group-hover:ring-emerald-200 dark:group-hover:ring-emerald-900' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-600 dark:text-cyan-400', ring: 'group-hover:ring-cyan-200 dark:group-hover:ring-cyan-900' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400', ring: 'group-hover:ring-amber-200 dark:group-hover:ring-amber-900' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400', ring: 'group-hover:ring-purple-200 dark:group-hover:ring-purple-900' }
} as const
</script>