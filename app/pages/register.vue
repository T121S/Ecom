<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Buat Akun Baru</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Mulai kelola inventaris omnichannel Anda</p>
    </div>
    <form @submit.prevent="handleRegister" class="space-y-4" novalidate>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
        <input v-model="state.fullName" type="text" placeholder="Nama Anda" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        <p v-if="errors.fullName" class="mt-1 text-red-500 text-xs">{{ errors.fullName }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
        <input v-model="state.email" type="email" placeholder="nama@email.com" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        <p v-if="errors.email" class="mt-1 text-red-500 text-xs">{{ errors.email }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
        <input v-model="state.password" type="password" placeholder="Minimal 6 karakter, huruf & angka" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        <p v-if="errors.password" class="mt-1 text-red-500 text-xs">{{ errors.password }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Konfirmasi Password</label>
        <input v-model="state.confirmPassword" type="password" placeholder="Ulangi password" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        <p v-if="errors.confirmPassword" class="mt-1 text-red-500 text-xs">{{ errors.confirmPassword }}</p>
      </div>
      <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2">
        <svg v-if="loading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        Daftar
      </button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-6">
      Sudah punya akun?
      <NuxtLink to="/login" class="text-blue-600 font-semibold hover:underline">Masuk</NuxtLink>
    </p>
    <div v-if="error" class="mt-4 bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-xl">{{ error }}</div>
    <div v-if="registered" class="mt-4 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl space-y-1">
      <p class="font-semibold">Pendaftaran berhasil!</p>
      <p>Kami telah mengirim link verifikasi ke <span class="font-semibold">{{ state.email }}</span>. Buka email Anda dan klik link tersebut untuk mengaktifkan akun.</p>
      <p class="pt-2">
        Sudah verifikasi?
        <NuxtLink to="/login" class="font-semibold underline">Masuk di sini</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'] })
const { register } = useAuth()
const state = reactive({ fullName: '', email: '', password: '', confirmPassword: '' })
const loading = ref(false)
const error = ref('')
const registered = ref(false)
const errors = reactive({ fullName: '', email: '', password: '', confirmPassword: '' })

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  let ok = true
  errors.fullName = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  if (state.fullName.trim().length < 3) {
    errors.fullName = 'Nama lengkap minimal 3 karakter.'
    ok = false
  }
  if (!emailRegex.test(state.email.trim())) {
    errors.email = 'Format email tidak valid.'
    ok = false
  }
  if (state.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
    ok = false
  } else if (!/[A-Za-z]/.test(state.password) || !/[0-9]/.test(state.password)) {
    errors.password = 'Password harus mengandung huruf dan angka.'
    ok = false
  }
  if (state.confirmPassword !== state.password) {
    errors.confirmPassword = 'Konfirmasi password tidak cocok.'
    ok = false
  }
  return ok
}

async function handleRegister() {
  error.value = ''
  registered.value = false
  if (!validate()) return
  loading.value = true
  try {
    await register(state.fullName.trim(), state.email.trim(), state.password)
    registered.value = true
  } catch (e: any) {
    error.value = e.message || 'Gagal mendaftar'
  } finally {
    loading.value = false
  }
}
</script>