<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
    <aside class="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm">
      <div class="flex items-center gap-3 px-5 h-16 border-b border-gray-100 dark:border-gray-800">
        <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-[10px] shadow">JADEE</div>
        <span class="text-lg font-bold text-gray-900 dark:text-white">Jadee</span>
      </div>

      <nav class="flex-1 p-3 space-y-0.5">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="isActive(item.to)
            ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
        >
          <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="p-3 border-t border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-medium text-blue-700 dark:text-blue-300 shrink-0">
            {{ user?.email?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ user?.email }}</p>
          </div>
          <button class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" @click="logout">
            <UIcon name="i-heroicons-arrow-left-on-rectangle" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-h-screen">
      <header class="lg:hidden flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <button class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" @click="mobileOpen = true">
            <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
          </button>
          <span class="font-bold text-gray-900 dark:text-white">Jadee</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
          {{ user?.email?.charAt(0).toUpperCase() || 'U' }}
        </div>
      </header>

      <USlideover v-model="mobileOpen">
        <div class="p-4">
          <div class="flex items-center justify-between mb-6">
            <span class="font-bold text-lg text-gray-900 dark:text-white">Jadee</span>
            <button class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" @click="mobileOpen = false">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
            </button>
          </div>
          <nav class="space-y-0.5">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              :class="isActive(item.to)
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'"
              @click="mobileOpen = false"
            >
              <UIcon :name="item.icon" class="w-5 h-5" />
              {{ item.label }}
            </NuxtLink>
            <button class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 w-full mt-4" @click="logout">
              <UIcon name="i-heroicons-arrow-left-on-rectangle" class="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </USlideover>

      <main class="flex-1 p-6 lg:p-8 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { label: 'Dashboard', icon: 'i-heroicons-home', to: '/dashboard' },
  { label: 'Integrasi', icon: 'i-heroicons-link', to: '/integration' },
  { label: 'Produk', icon: 'i-heroicons-cube', to: '/products' },
  { label: 'Mapping SKU', icon: 'i-heroicons-arrows-right-left', to: '/mapping' },
  { label: 'Master SKU', icon: 'i-heroicons-tag', to: '/master-sku' }
]

function isActive(to: string) {
  return route.path === to
}
</script>
