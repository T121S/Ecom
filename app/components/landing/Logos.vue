<template>
  <section class="bg-white dark:bg-slate-950 border-y border-gray-100 dark:border-gray-900">
    <div class="container-page py-10">
      <p class="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
        Didukung integrasi resmi dengan marketplace utama di Indonesia
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div
          v-for="mp in marketplaces"
          :key="mp.name"
          :class="`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border ${mp.bg} ${mp.border} transition-all hover:scale-105`"
        >
          <div :class="`w-8 h-8 rounded-lg ${mp.bg} flex items-center justify-center ${mp.text} font-bold border ${mp.border}`">
            {{ mp.letter }}
          </div>
          <span :class="`font-bold ${mp.text}`">{{ mp.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const marketplaces = [
  {
    name: 'Shopee',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-100 dark:border-orange-900',
    letter: 'S'
  },
  {
    name: 'Tokopedia',
    bg: 'bg-green-50 dark:bg-green-950/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-100 dark:border-green-900',
    letter: 'T'
  },
  {
    name: 'Lazada',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-900',
    letter: 'L'
  }
]
</script>