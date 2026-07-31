<template>
  <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-gray-100 dark:border-gray-900">
    <nav class="container-page flex items-center justify-between h-16">
      <NuxtLink to="/" class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-[10px] shadow-lg shadow-blue-600/30">
          JADEE
        </div>
        <span class="text-lg font-bold tracking-tight">Jadee</span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink
          v-if="isAuthed"
          to="/dashboard"
          class="btn-primary !py-2 !px-5 text-sm"
        >
          Buka Dashboard
        </NuxtLink>
        <template v-else>
          <NuxtLink
            to="/login"
            class="hidden sm:inline-flex text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 transition-colors"
          >
            Masuk
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="btn-primary !py-2 !px-5 text-sm"
          >
            Mulai Gratis
          </NuxtLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { user } = useAuth()
const isAuthed = computed(() => !!(user.value && user.value.email_confirmed_at))

const navLinks = [
  { label: 'Fitur', href: '#features' },
  { label: 'Cara Kerja', href: '#how-it-works' },
  { label: 'Harga', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
]
</script>