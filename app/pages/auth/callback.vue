<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Memproses autentikasi...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })
const supabase = useSupabaseClient()
const router = useRouter()

const { data: listener } = supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
    router.push('/dashboard')
  }
})

onBeforeUnmount(() => {
  listener?.subscription?.unsubscribe()
})
</script>