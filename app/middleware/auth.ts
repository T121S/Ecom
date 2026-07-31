export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()

  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password']
  const isPublic = publicPaths.includes(to.path)

  if (!user.value && !isPublic) {
    return navigateTo('/login')
  }

  if (user.value) {
    if (!user.value.email_confirmed_at && to.path !== '/forgot-password' && to.path !== '/reset-password') {
      return navigateTo('/login')
    }
    if (user.value.email_confirmed_at && (to.path === '/login' || to.path === '/register')) {
      return navigateTo('/dashboard')
    }
  }
})