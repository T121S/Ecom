<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Selamat Datang Kembali</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Masuk ke akun Jadee Anda</p>
    </div>
    <form @submit.prevent="handleLogin" class="space-y-4" novalidate>
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
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
        <input
          v-model="state.password"
          type="password"
          placeholder="******"
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <p v-if="errors.password" class="mt-1 text-red-500 text-xs">{{ errors.password }}</p>
      </div>
      <div class="flex justify-end">
        <NuxtLink to="/forgot-password" class="text-sm text-blue-600 font-medium hover:underline">Lupa Password?</NuxtLink>
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
    <div v-if="needVerify" class="mt-4 bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-xl space-y-1">
      <p class="font-semibold">Email belum terverifikasi</p>
      <p>Buka email Anda dan klik link verifikasi yang kami kirim untuk mengaktifkan akun.</p>
      <p class="pt-1 text-amber-700/80">Tidak menemukan email? Cek folder Spam/Junk Anda.</p>
      <button
        type="button"
        :disabled="resending"
        @click="handleResend"
        class="font-semibold underline disabled:opacity-50 mt-1"
      >
        Kirim ulang link verifikasi<span v-if="resending">...</span>
      </button>
      <p v-if="resendSuccess" class="text-green-700 mt-1">{{ resendSuccess }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'] })
const { login, resendConfirmation } = useAuth()
const state = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const errors = reactive({ email: '', password: '' })
const needVerify = ref(false)
const resending = ref(false)
const resendSuccess = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  let ok = true
  errors.email = ''
  errors.password = ''
  if (!emailRegex.test(state.email.trim())) {
    errors.email = 'Format email tidak valid.'
    ok = false
  }
  if (state.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
    ok = false
  }
  return ok
}

async function handleLogin() {
  error.value = ''
  needVerify.value = false
  resendSuccess.value = ''
  if (!validate()) return
  loading.value = true
  try {
    await login(state.email.trim(), state.password)
  } catch (e: any) {
    const msg = e.message || 'Gagal masuk'
    if (e.name === 'EmailNotConfirmed' || /not confirmed|belum terverifikasi/i.test(msg)) {
      needVerify.value = true
    }
    error.value = msg
  } finally {
    loading.value = false
  }
}

async function handleResend() {
  resending.value = true
  error.value = ''
  resendSuccess.value = ''
  try {
    await resendConfirmation(state.email.trim())
    resendSuccess.value = 'Link verifikasi telah dikirim ke email Anda.'
  } catch (e: any) {
    error.value = e.message || 'Gagal mengirim ulang link.'
  } finally {
    resending.value = false
  }
}
</script>