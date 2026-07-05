export const useMasterSku = () => {
  const supabase = useSupabaseClient()

  const getUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id
  }

  const getMasterSkus = async () => {
    const userId = await getUserId()
    if (!userId) return []
    const { data, error } = await supabase
      .from('master_skus')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) {
      console.error('getMasterSkus error:', error)
      return []
    }
    return data || []
  }

  const getMasterSkuCount = async () => {
    const userId = await getUserId()
    if (!userId) return 0
    const { count, error } = await supabase
      .from('master_skus')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
    if (error) return 0
    return count || 0
  }

  const getMasterSkuItems = async (masterSkuId: string) => {
    const { data, error } = await supabase
      .from('master_sku_items')
      .select('id, product_id, marketplace_id')
      .eq('master_sku_id', masterSkuId)
    if (error) {
      console.error('getMasterSkuItems error:', error)
      return []
    }
    return data || []
  }

  const getAllMasterSkuItems = async () => {
    const userId = await getUserId()
    if (!userId) return []
    const { data, error } = await supabase
      .from('master_sku_items')
      .select('*, master_sku:master_sku_id(*)')
      .in('master_sku_id', (await supabase
        .from('master_skus')
        .select('id')
        .eq('user_id', userId)
      ).data?.map(s => s.id) || [])
    if (error) {
      console.error('getAllMasterSkuItems error:', error)
      return []
    }
    return data || []
  }

  const createMasterSku = async (sku: {
    sku_code: string
    name: string
    description?: string
    current_stock?: number
  }) => {
    const userId = await getUserId()
    if (!userId) throw new Error('Not authenticated')
    const { data, error } = await supabase
      .from('master_skus')
      .insert({ ...sku, user_id: userId })
      .select()
      .single()
    if (error) throw error
    return data
  }

  const updateMasterSku = async (id: string, updates: Partial<{
    name: string
    description: string
    sku_code: string
    current_stock: number
  }>) => {
    const { data, error } = await supabase
      .from('master_skus')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const deleteMasterSku = async (id: string) => {
    const { error } = await supabase
      .from('master_skus')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const linkProduct = async (masterSkuId: string, productId: string, marketplaceId?: string) => {
    const { data, error } = await supabase
      .from('master_sku_items')
      .insert({
        master_sku_id: masterSkuId,
        product_id: productId,
        marketplace_id: marketplaceId || null
      })
      .select()
      .single()
    if (error) throw error
    return data
  }

  const unlinkProduct = async (itemId: string) => {
    const { error } = await supabase
      .from('master_sku_items')
      .delete()
      .eq('id', itemId)
    if (error) throw error
  }

  return {
    getMasterSkus,
    getMasterSkuCount,
    getMasterSkuItems,
    getAllMasterSkuItems,
    createMasterSku,
    updateMasterSku,
    deleteMasterSku,
    linkProduct,
    unlinkProduct
  }
}
