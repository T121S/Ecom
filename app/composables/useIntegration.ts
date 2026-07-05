export const useIntegration = () => {
  const supabase = useSupabaseClient()

  const getUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id
  }

  const getMarketplaces = async () => {
    const { data, error } = await supabase
      .from('marketplaces')
      .select('id, name, slug, icon_name')
      .order('name')
    if (error) {
      console.error('getMarketplaces error:', error)
      return []
    }
    return data || []
  }

  const getConnections = async () => {
    const userId = await getUserId()
    if (!userId) return []
    const { data, error } = await supabase
      .from('store_connections')
      .select('id, marketplace_id, store_name, status')
      .eq('user_id', userId)
    if (error) {
      console.error('getConnections error:', error)
      return []
    }
    return data || []
  }

  const connect = async (marketplaceId: string, storeName: string) => {
    const userId = await getUserId()
    if (!userId) throw new Error('Not authenticated')
    if (!marketplaceId) throw new Error('Marketplace ID diperlukan')
    const token = `mock_token_${Date.now()}`
    const { data, error } = await supabase
      .from('store_connections')
      .upsert({
        user_id: userId,
        marketplace_id: marketplaceId,
        store_name: storeName,
        access_token: token,
        status: 'connected'
      })
      .select()
      .single()
    if (error) throw error
    return data
  }

  const disconnect = async (connectionId: string) => {
    if (!connectionId) return
    const { error } = await supabase
      .from('store_connections')
      .update({ status: 'disconnected', access_token: null })
      .eq('id', connectionId)
    if (error) console.error('disconnect error:', error)
  }

  return {
    getMarketplaces,
    getConnections,
    connect,
    disconnect
  }
}
