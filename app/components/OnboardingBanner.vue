<template>
  <div class="mb-8 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-2xl shadow-lg shadow-blue-200/50 dark:shadow-blue-950 overflow-hidden relative">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
      <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
    </div>
    <div class="relative flex flex-col md:flex-row items-center gap-6 p-6">
      <div class="flex-1 text-white">
        <h2 class="text-xl font-bold mb-2">Selamat Datang di OmniStock!</h2>
        <p class="text-sm text-blue-100 mb-4 leading-relaxed">Hubungkan toko marketplace Anda untuk mulai mengelola stok secara terpusat. Kami mendukung:</p>
        <div class="flex items-center gap-6 mb-5">
          <div v-for="mp in marketplaces" :key="mp.slug" class="flex flex-col items-center gap-1.5">
            <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <UIcon :name="mp.icon" class="text-xl" />
            </div>
            <span class="text-xs font-medium text-blue-100">{{ mp.name }}</span>
          </div>
        </div>
        <NuxtLink to="/integration" class="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow">
          Hubungkan Toko Pertama
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
      <div class="hidden md:block">
        <div class="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
          <UIcon name="i-heroicons-building-storefront" class="text-5xl text-white/80" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const marketplaces = [
  { name: 'Shopee', slug: 'shopee', icon: 'simple-icons:shopee' },
  { name: 'Tokopedia', slug: 'tokopedia', icon: 'ri:shopping-bag-3-fill' },
  { name: 'Lazada', slug: 'lazada', icon: 'ri:shopping-cart-fill' }
]
</script>