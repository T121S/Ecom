<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur password baru untuk akun Anda</p>
    </div>

    <template v-if="ready">
      <form @submit.prevent="handleReset" class="space-y-4" novalidate>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password Baru</label>
          <input v-model="password" type="password" placeholder="Minimal 6 karakter, huruf & angka" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          <p v-if="errors.password" class="mt-1 text-red-500 text-xs">{{ errors.password }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Konfirmasi Password Baru</label>
          <input v-model="confirmPassword" type="password" placeholder="Ulangi password baru" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          <p v-if="errors.confirmPassword" class="mt-1 text-red-500 text-xs">{{ errors.confirmPassword }}</p>
        </div>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-sm text-center">{{ success }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          Reset Password
        </button>
      </form>
    </template>

    <template v-else>
      <div class="text-center py-4 space-y-3">
        <p v-if="checking" class="text-sm text-gray-500">Memproses link verifikasi...</p>
        <template v-else>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            Link reset tidak valid atau telah kedaluwarsa.
          </p>
          <p class="text-sm text-gray-500">
            Silakan minta link reset baru dari
            <NuxtLink to="/forgot-password" class="text-blue-600 font-semibold hover:underline">halaman lupa password</NuxtLink>.
          </p>
        </template>
      </div>
    </template>

    <p class="mt-6 text-center text-sm text-gray-500">
      <NuxtLink to="/login" class="font-semibold text-gray-600 hover:underline">Kembali ke Masuk</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'] })
const { updatePassword } = useAuth()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const checking = ref(true)
const ready = ref(false)
const errors = reactive({ password: '', confirmPassword: '' })

onMounted(() => {
  // Link-based recovery: Supabase sets session via the redirect URL hash.
  // Beri waktu singkat supaya module @nuxtjs/supabase restore session dari URL.
  setTimeout(() => {
    if (user.value) {
      ready.value = true
    }
    checking.value = false
  }, 1200)
})

function validatePasswords() {
  let ok = true
  errors.password = ''
  errors.confirmPassword = ''
  if (password.value.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
    ok = false
  } else if (!/[A-Za-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
    errors.password = 'Password harus mengandung huruf dan angka.'
    ok = false
  }
  if (confirmPassword.value !== password.value) {
    errors.confirmPassword = 'Konfirmasi password tidak cocok.'
    ok = false
  }
  return ok
}

async function handleReset() {
  error.value = ''
  success.value = ''
  if (!validatePasswords()) return
  loading.value = true
  try {
    await updatePassword(password.value)
    success.value = 'Password berhasil direset! Mengarahkan ke masuk...'
  } catch (e: any) {
    error.value = e.message || 'Gagal mereset password.'
  } finally {
    loading.value = false
  }
}
</script>