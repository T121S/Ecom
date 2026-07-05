<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Selamat Datang Kembali</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Masuk ke akun OmniStock Anda</p>
    </div>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
        <input
          v-model="state.email"
          type="email"
          placeholder="nama@email.com"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
        <input
          v-model="state.password"
          type="password"
          placeholder="******"
          required
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        Masuk
      </button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-6">
      Belum punya akun?
      <NuxtLink to="/register" class="text-blue-600 font-semibold hover:underline">Daftar</NuxtLink>
    </p>
    <div v-if="error" class="mt-4 bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-xl">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'] })
const { login } = useAuth()
const state = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
async function handleLogin() {
  loading.value = true; error.value = ''
  try { await login(state.email, state.password) }
  catch (e: any) { error.value = e.message || 'Gagal masuk' }
  finally { loading.value = false }
}
</script>