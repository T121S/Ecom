<template>
  <div class="min-h-screen antialiased font-sans bg-slate-50 text-slate-900 selection:bg-blue-600/20">
    <slot />
  </div>
</template>

<script setup lang="ts">
const title = 'Jadee — Kelola Stok Lintas Marketplace Tanpa Ribet'
const description = 'Jadee menyatukan Shopee, Tokopedia, dan Lazada dalam satu dasbor. Stok tersinkronisasi otomatis di seluruh platform — kurangi overselling, hemat waktu.'
const keywords = 'jadee, sinkronisasi stok, shopee, tokopedia, lazada, omnichannel, inventory management, saas, e-commerce indonesia'

const siteUrl = useRuntimeConfig().public.siteUrl || 'https://jadee.app'
const route = useRoute()
const canonicalURL = computed(() => new URL(route.path, siteUrl).toString())
const ogImage = computed(() => new URL('/og-image.svg', siteUrl).toString())

useHead({
  htmlAttrs: { lang: 'id', class: 'scroll-smooth' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: canonicalURL }
  ]
})

useSeoMeta({
  title,
  description,
  keywords,
  ogType: 'website',
  ogUrl: canonicalURL,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogLocale: 'id_ID',
  ogSiteName: 'Jadee',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  robots: 'index, follow',
  author: 'Jadee'
})
</script>