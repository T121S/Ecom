<template>
  <NuxtLayout name="landing">
    <LandingHeader />
    <main>
      <LandingHero />
      <LandingLogos />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPricing />
      <LandingFAQ />
      <LandingCTA />
    </main>
    <LandingFooter />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'OmniStock — Kelola Stok Lintas Marketplace Tanpa Ribet' })
</script>