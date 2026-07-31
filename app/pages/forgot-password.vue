<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Lupa Password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Masukkan email Anda untuk menerima link reset password</p>
    </div>
    <form @submit.prevent="handleSend" class="space-y-4" novalidate>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
        <input
          v-model="state.email"
          type="email"
          placeholder="nama@email.com"
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <p v-if="errors.email" class="mt-1 text-red-500 text-xs">{{ errors.email }}</p>
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        Kirim Link Reset
      </button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-6">
      Ingat password Anda?
      <NuxtLink to="/login" class="text-blue-600 font-semibold hover:underline">Masuk</NuxtLink>
    </p>
    <div v-if="error" class="mt-4 bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-xl">{{ error }}</div>
    <div v-if="success" class="mt-4 bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-xl">
      <p class="font-semibold mb-1">Link reset telah dikirim</p>
      <p>{{ success }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'] })
const { requestPasswordReset } = useAuth()
const state = reactive({ email: '' })
const loading = ref(false)
const error = ref('')
const success = ref('')
const errors = reactive({ email: '' })

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  let ok = true
  errors.email = ''
  if (!emailRegex.test(state.email.trim())) {
    errors.email = 'Format email tidak valid.'
    ok = false
  }
  return ok
}

async function handleSend() {
  error.value = ''
  success.value = ''
  if (!validate()) return
  loading.value = true
  try {
    await requestPasswordReset(state.email.trim())
    success.value = 'Jika email terdaftar, link reset password telah dikirim ke email Anda. Buka email dan klik link tersebut untuk mengatur password baru.'
  } catch (e: any) {
    error.value = e.message || 'Gagal mengirim link.'
  } finally {
    loading.value = false
  }
}
</script>