export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.user && !data.user.email_confirmed_at) {
      await supabase.auth.signOut()
      const err = new Error('Email belum terverifikasi. Masukkan kode OTP yang dikirim ke email Anda.')
      err.name = 'EmailNotConfirmed'
      throw err
    }
    router.push('/dashboard')
  }

  const register = async (fullName: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) throw error
    await sendOtp(email)
  }

  const sendOtp = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }
    })
    if (error) throw error
  }

  const verifyOtp = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' })
    if (error) throw error
  }

  const resendOtp = async (email: string) => {
    await sendOtp(email)
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  }

  return {
    user,
    login,
    register,
    logout,
    sendOtp,
    verifyOtp,
    resendOtp
  }
}