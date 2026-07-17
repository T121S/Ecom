import { createClient } from '@supabase/supabase-js'

const sessionStorageAdapter = {
  getItem: (key: string): string | null => {
    try { return window.sessionStorage.getItem(key) } catch { return null }
  },
  setItem: (key: string, value: string): void => {
    try { window.sessionStorage.setItem(key, value) } catch {}
  },
  removeItem: (key: string): void => {
    try { window.sessionStorage.removeItem(key) } catch {}
  }
}

export default defineNuxtPlugin({
  name: 'supabase-session-storage',
  enforce: 'post',
  setup(nuxtApp: any) {
    const config = useRuntimeConfig()
    const url = config.public.supabase?.url
    const key = config.public.supabase?.key
    if (!url || !key) return

    const client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: sessionStorageAdapter,
        storageKey: 'sb-omnistock-auth-token'
      }
    })

    nuxtApp.$supabase.client = client

    const session = useSupabaseSession()
    const user = useSupabaseUser()

    const refresh = async () => {
      try {
        const { data } = await client.auth.getSession()
        session.value = data.session
        if (data.session?.user) {
          const { data: userData } = await client.auth.getUser()
          user.value = userData?.user ?? data.session.user
        } else {
          user.value = null
        }
      } catch {
        user.value = null
      }
    }

    refresh()

    client.auth.onAuthStateChange((_event: string, sess: any) => {
      session.value = sess
      if (sess?.user) {
        client.auth.getUser().then(({ data }: any) => {
          user.value = data?.user ?? sess.user
        })
      } else {
        user.value = null
      }
    })

    nuxtApp.hook('page:start', refresh)
  }
})