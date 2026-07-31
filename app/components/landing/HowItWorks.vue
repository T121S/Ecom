<template>
  <section id="how-it-works" class="section bg-white dark:bg-slate-900/30">
    <div class="container-page">
      <div class="max-w-2xl mx-auto text-center mb-16">
        <div class="badge-dot mb-4 mx-auto">Cara Kerja</div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Mulai dalam 3 langkah,
          <span class="text-blue-600 dark:text-blue-400">&lt; 5 menit</span>
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          Onboarding intuitif. Tidak perlu training, tidak perlu dokumentasi. Langsung jalan.
        </p>
      </div>

      <div class="relative grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 hidden md:block"></div>

        <div v-for="step in steps" :key="step.no" class="relative text-center">
          <div
            class="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-600/20 mb-5 animate-float"
            :style="{ animationDelay: `${parseInt(step.no) * 0.2}s` }"
          >
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="iconMap[step.icon]" />
          </div>

          <div class="text-xs font-bold text-blue-500 dark:text-blue-400 mb-1.5 tracking-widest">STEP {{ step.no }}</div>
          <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    no: '01',
    title: 'Hubungkan Toko',
    desc: 'Login ke akun marketplace Anda via OAuth resmi. Tanpa perlu input API key manual, tanpa simpan password. Aman & cepat.',
    icon: 'plug'
  },
  {
    no: '02',
    title: 'Buat Master SKU',
    desc: 'Pilih produk yang sama dari Shopee/Tokopedia/Lazada, satukan ke satu Master SKU. Satu klik, semua platform terhubung.',
    icon: 'tag'
  },
  {
    no: '03',
    title: 'Stok Otomatis Sinkron',
    desc: 'Saat ada penjualan di satu platform, stok di platform lain ikut berkurang otomatis dalam waktu <5 detik. Tanpa sentuh.',
    icon: 'sync'
  }
] as const

const iconMap = {
  plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/>',
  tag: '<path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.59-7.59a1 1 0 0 0 0-1.41z"/><path d="M7 7h.01"/>',
  sync: '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>'
} as const
</script>