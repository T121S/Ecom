<template>
  <section class="bg-white dark:bg-slate-950 border-y border-gray-100 dark:border-gray-900">
    <div class="container-page py-10">
      <p class="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
        Didukung integrasi resmi dengan marketplace utama di Indonesia
      </p>
      <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        <div
          v-for="mp in marketplaces"
          :key="mp.name"
          :class="`flex items-center px-5 py-3 rounded-xl border ${mp.bg} ${mp.border} transition-all hover:scale-105`"
        >
          <img
            :src="mp.logo"
            :alt="mp.name"
            class="h-8 w-auto object-contain rounded"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const marketplaces = [
  {
    name: 'Shopee',
    logo: '/logos/shopee.svg',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-100 dark:border-orange-900'
  },
  {
    name: 'Tokopedia',
    logo: '/logos/tokopedia.svg',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-100 dark:border-green-900'
  },
  {
    name: 'Lazada',
    logo: '/logos/lazada.svg',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-100 dark:border-blue-900'
  }
]
</script>