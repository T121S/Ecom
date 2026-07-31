export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()
  const { public: { siteUrl } } = useRuntimeConfig()

  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.user && !data.user.email_confirmed_at) {
      await supabase.auth.signOut()
      const err = new Error('Email belum terverifikasi. Buka link verifikasi di email Anda untuk mengaktifkan akun.')
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
        emailRedirectTo: `${siteUrl || window.location.origin}/auth/callback`
      }
    })
    if (error) throw error
  }

  const resendConfirmation = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${siteUrl || window.location.origin}/auth/callback`
      }
    })
    if (error) throw error
  }

  const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl || window.location.origin}/reset-password`
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    await supabase.auth.signOut()
    router.push('/login')
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
    resendConfirmation,
    requestPasswordReset,
    updatePassword
  }
}