export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const user = ref<any>(null)
  const profile = ref<any>(null)
  const loading = ref(true)

  const fetchProfile = async () => {
    if (!user.value) return
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()
    profile.value = data
  }

  const setUser = (newUser: any) => {
    user.value = newUser
    if (newUser) fetchProfile()
  }

  return {
    user,
    profile,
    loading,
    setUser,
    fetchProfile
  }
})
