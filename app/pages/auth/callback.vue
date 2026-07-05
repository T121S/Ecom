<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Memproses autentikasi...</p>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    router.push('/dashboard')
  }
})
</script>
