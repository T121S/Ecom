<template>
  <footer class="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-gray-900">
    <div class="container-page py-14">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div class="col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base">
              O
            </div>
            <span class="text-lg font-bold">OmniStock</span>
          </NuxtLink>
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
            Pusat kendali operasional untuk merchant e-commerce multi-platform. Sinkronisasi stok otomatis, anti overselling.
          </p>
          <NuxtLink to="/register" class="btn-primary mt-6 !py-2 !px-4 text-sm">
            Coba Gratis
          </NuxtLink>
        </div>

        <div v-for="col in columns" :key="col.title">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">{{ col.title }}</h3>
          <ul class="space-y-2.5">
            <li v-for="link in col.links" :key="link.label">
              <a
                :href="link.href"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-gray-100 dark:border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-400 dark:text-gray-500">© {{ year }} OmniStock. All rights reserved.</p>
        <div class="flex items-center gap-3 text-gray-400">
          <a href="mailto:hello@omnistock.id" aria-label="Email" class="hover:text-blue-600 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
          </a>
          <a href="https://github.com/T121S/Ecom" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-blue-600 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12c0-5.523-4.477-10-10-10Z" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const columns = [
  {
    title: 'Produk',
    links: [
      { label: 'Fitur', href: '#features' },
      { label: 'Cara Kerja', href: '#how-it-works' },
      { label: 'Harga', href: '#pricing' },
      { label: 'Integrasi', href: '#features' }
    ]
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Kontak', href: '#' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' }
    ]
  }
]
</script>