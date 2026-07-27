<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Masukkan 8 digit kode yang dikirim ke
        <span class="font-semibold text-gray-700 dark:text-gray-300">{{ email || 'email Anda' }}</span>
      </p>
    </div>
    <form @submit.prevent="handleReset" class="space-y-4" novalidate>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kode OTP</label>
        <div class="flex justify-center gap-2">
          <input
            v-for="(_, i) in 8"
            :key="i"
            :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }"
            v-model="digits[i]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            @input="onInput(i, $event)"
            @keydown="onKeydown(i, $event)"
            @paste="onPaste($event)"
          />
        </div>
      </div>
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
    <div class="mt-6 text-center text-sm text-gray-500">
      <span>Tidak menerima kode? </span>
      <button
        type="button"
        :disabled="cooldown > 0 || resending"
        @click="handleResend"
        class="font-semibold text-blue-600 hover:underline disabled:opacity-50 disabled:no-underline"
      >
        Kirim ulang<span v-if="cooldown > 0"> ({{ cooldown }}s)</span>
      </button>
    </div>
    <p class="mt-4 text-center text-sm text-gray-500">
      <NuxtLink to="/login" class="font-semibold text-gray-600 hover:underline">Kembali ke Masuk</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'] })
const route = useRoute()
const router = useRouter()
const { verifyRecoveryOtp, updatePassword, requestPasswordReset } = useAuth()

const email = computed(() => (route.query.email as string) || '')
const digits = ref(['', '', '', '', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const resending = ref(false)
const error = ref('')
const success = ref('')
const cooldown = ref(0)
const errors = reactive({ password: '', confirmPassword: '' })
let cooldownTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  setTimeout(() => inputs.value[0]?.focus(), 50)
  startCooldown()
})

onBeforeUnmount(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})

function startCooldown() {
  cooldown.value = 60
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0 && cooldownTimer) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}

function onInput(i: number, e: Event) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  digits.value[i] = val.slice(-1)
  if (val && i < 7) inputs.value[i + 1]?.focus()
}

function onKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    inputs.value[i - 1]?.focus()
  }
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const data = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 8)
  for (let i = 0; i < 8; i++) digits.value[i] = data[i] || ''
  const lastFilled = Math.min(data.length, 7)
  inputs.value[lastFilled]?.focus()
}

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
  const token = digits.value.join('')
  if (token.length !== 8) {
    error.value = 'Masukkan 8 digit kode.'
    return
  }
  if (!email.value) {
    error.value = 'Email tidak ditemukan. Silakan ulangi dari halaman lupa password.'
    return
  }
  if (!validatePasswords()) return
  loading.value = true
  try {
    await verifyRecoveryOtp(email.value, token)
    await updatePassword(password.value)
    success.value = 'Password berhasil direset! Mengarahkan ke masuk...'
    setTimeout(() => router.push('/login'), 1200)
  } catch (e: any) {
    error.value = e.message || 'Kode salah atau kedaluwarsa.'
  } finally {
    loading.value = false
  }
}

async function handleResend() {
  if (!email.value) {
    error.value = 'Email tidak ditemukan.'
    return
  }
  resending.value = true
  error.value = ''
  try {
    await requestPasswordReset(email.value)
    success.value = 'Kode baru telah dikirim.'
    startCooldown()
  } catch (e: any) {
    error.value = e.message || 'Gagal mengirim ulang kode.'
  } finally {
    resending.value = false
  }
}
</script>