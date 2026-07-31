<template>
  <section class="section bg-slate-50 dark:bg-slate-950">
    <div class="container-page">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 px-6 py-14 sm:py-20 text-center shadow-2xl shadow-blue-600/30">
        <div class="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div class="absolute -top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div class="absolute -bottom-24 -right-16 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div class="relative max-w-2xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Mulai Kelola Stok Lebih Pintar Hari Ini
          </h2>
          <p class="mt-4 text-blue-100 text-lg leading-relaxed">
            Gabung bersama merchant yang sudah menyatukan operasional multi-platform mereka dengan OmniStock. Tanpa kartu kredit, tanpa risiko.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <NuxtLink
              to="/register"
              class="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Daftar Gratis Sekarang
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="inline-flex items-center justify-center gap-2 text-white border border-white/30 hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Sudah punya akun? Masuk
            </NuxtLink>
          </div>

          <p class="mt-6 text-sm text-blue-200 flex items-center justify-center gap-2 flex-wrap">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Setup &lt; 5 menit
            </span>
            <span class="opacity-50">•</span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Tanpa kartu kredit
            </span>
            <span class="opacity-50">•</span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Batalkan kapan saja
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>