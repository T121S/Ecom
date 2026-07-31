<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/20">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute top-10 -left-20 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container-page relative py-16 lg:py-24">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="animate-fade-up">
          <div class="badge-dot mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            Sinkronisasi real-time &lt; 5 detik
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Kelola Stok Lintas<br />
            Marketplace
            <span class="bg-gradient-to-r from-blue-600 to-accent bg-clip-text text-transparent">
              Tanpa Ribet
            </span>
          </h1>
          <p class="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
            Jadee menyatukan Shopee, Tokopedia, dan Lazada dalam satu dasbor. Stok tersinkronisasi otomatis di seluruh platform — kurangi overselling, hemat waktu.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/register" class="btn-primary">
              Mulai Gratis
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </NuxtLink>
            <a href="#how-it-works" class="btn-secondary">
              Lihat Cara Kerja
            </a>
          </div>

          <p class="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <svg class="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            Tanpa kartu kredit • Trial gratis 14 hari
          </p>
        </div>

        <div class="relative animate-fade-up" style="animation-delay: 0.15s">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-accent/20 rounded-3xl blur-2xl"></div>

          <div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-600/10 border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
              <div class="ml-3 text-xs text-gray-400 dark:text-gray-500 font-medium">jadee.app/dashboard</div>
            </div>

            <div class="p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                  <div class="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div class="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900"></div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="bg-blue-50 dark:bg-blue-950/40 rounded-xl p-3 border border-blue-100 dark:border-blue-900">
                  <div class="w-6 h-6 rounded-lg bg-blue-600 mb-2 flex items-center justify-center">
                    <div class="w-3 h-3 bg-white/80 rounded-sm"></div>
                  </div>
                  <div class="text-lg font-bold text-blue-700 dark:text-blue-300">3</div>
                  <div class="text-[10px] text-gray-500">Toko Terhubung</div>
                </div>
                <div class="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-3 border border-cyan-100 dark:border-cyan-900">
                  <div class="w-6 h-6 rounded-lg bg-cyan-500 mb-2"></div>
                  <div class="text-lg font-bold text-cyan-700 dark:text-cyan-300">248</div>
                  <div class="text-[10px] text-gray-500">Total Produk</div>
                </div>
                <div class="bg-accent/10 dark:bg-accent/10 rounded-xl p-3 border border-accent/30">
                  <div class="w-6 h-6 rounded-lg bg-accent mb-2"></div>
                  <div class="text-lg font-bold text-accent-700 dark:text-accent">132</div>
                  <div class="text-[10px] text-gray-500">Master SKU</div>
                </div>
              </div>

              <div class="space-y-2 pt-2">
                <div v-for="mp in syncList" :key="mp.letter" class="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-slate-800/50">
                  <div class="flex items-center gap-2.5">
                    <div :class="`w-7 h-7 rounded-lg ${mp.bg} flex items-center justify-center text-white text-[10px] font-bold`">{{ mp.letter }}</div>
                    <div>
                      <div class="h-2 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div class="h-1.5 w-14 bg-gray-200 dark:bg-gray-800 rounded mt-1"></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 px-2 py-1 bg-green-50 dark:bg-green-950/40 rounded-full">
                    <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span class="text-[9px] font-medium text-green-700 dark:text-green-400">Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-4 -left-4 sm:-left-6 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 px-4 py-3 animate-float">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                <svg class="w-4 h-4 text-accent-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <div>
                <div class="text-xs font-bold">Stok tersinkron</div>
                <div class="text-[10px] text-gray-500">12 detik yang lalu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const syncList = [
  { letter: 'S', bg: 'bg-orange-500' },
  { letter: 'T', bg: 'bg-green-500' },
  { letter: 'L', bg: 'bg-blue-500' }
]
</script>