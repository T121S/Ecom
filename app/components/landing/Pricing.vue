<template>
  <section id="pricing" class="section bg-slate-50 dark:bg-slate-950">
    <div class="container-page">
      <div class="max-w-2xl mx-auto text-center mb-14">
        <div class="badge-dot mb-4 mx-auto">Harga</div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Harga transparan, tanpa biaya tersembunyi
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          Mulai gratis, upgrade kapan saja. Batalkan kapan saja. Tidak ada kontrak mengikat.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        <div
          v-for="plan in plans"
          :key="plan.name"
          :class="`relative rounded-2xl p-7 flex flex-col transition-all ${plan.highlighted
            ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-2xl shadow-blue-600/20 lg:-translate-y-4'
            : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-lg'}`"
        >
          <div v-if="plan.highlighted" class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/30">
            Paling Populer
          </div>

          <h3 class="text-lg font-bold mb-1">{{ plan.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">{{ plan.desc }}</p>

          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-3xl font-bold tracking-tight">{{ plan.price }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ plan.period }}</span>
          </div>

          <ul class="space-y-3 mb-7 flex-1">
            <li v-for="f in plan.features" :key="f" class="flex items-start gap-2.5 text-sm">
              <svg class="w-4 h-4 text-accent-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              <span class="text-gray-700 dark:text-gray-300">{{ f }}</span>
            </li>
          </ul>

          <a
            v-if="plan.name === 'Business'"
            href="mailto:sales@omnistock.id"
            :class="plan.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'"
          >
            {{ plan.cta }}
          </a>
          <NuxtLink
            v-else
            to="/register"
            :class="plan.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'"
          >
            {{ plan.cta }}
          </NuxtLink>
        </div>
      </div>

      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        Butuh paket custom atau lebih dari 10 toko? <a href="mailto:sales@omnistock.id" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">Hubungi sales kami</a>.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    name: 'Free',
    desc: 'Untuk mulai mengenal OmniStock',
    price: 'Rp0',
    period: '/bulan',
    cta: 'Mulai Gratis',
    highlighted: false,
    features: [
      '1 toko marketplace',
      '50 Master SKU',
      'Sinkronisasi manual',
      'Community support',
      '14 hari trial'
    ]
  },
  {
    name: 'Pro',
    desc: 'Untuk toko yang sedang berkembang',
    price: 'Rp149rb',
    period: '/bulan',
    cta: 'Coba Pro',
    highlighted: true,
    features: [
      '3 toko marketplace',
      'Master SKU tak terbatas',
      'Sinkronisasi real-time',
      'Webhook automation',
      'Email support prioritas',
      'Export laporan'
    ]
  },
  {
    name: 'Business',
    desc: 'Untuk merchant skala besar',
    price: 'Rp499rb',
    period: '/bulan',
    cta: 'Hubungi Sales',
    highlighted: false,
    features: [
      'Toko tak terbatas',
      'Semua fitur Pro',
      'Webhook priority queue',
      'Dedicated support 24/7',
      'API access',
      'Custom integrations',
      'SLA 99.9% uptime'
    ]
  }
]
</script>