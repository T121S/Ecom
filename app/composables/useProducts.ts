export const useProducts = () => {
  const supabase = useSupabaseClient()

  const getUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id
  }

  const getProducts = async () => {
    const userId = await getUserId()
    if (!userId) return []
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, sku, stock, price, image_url, marketplace_id, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) {
      console.error('getProducts error:', error)
      return []
    }
    return data || []
  }

  const getProductsCount = async () => {
    const userId = await getUserId()
    if (!userId) return 0
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
    if (error) return 0
    return count || 0
  }

  const createProduct = async (product: {
    name: string
    description?: string
    sku?: string
    stock?: number
    price?: number
    image_url?: string
    marketplace_id?: string
  }) => {
    const userId = await getUserId()
    if (!userId) throw new Error('Not authenticated')
    const { data, error } = await supabase
      .from('products')
      .insert({ ...product, user_id: userId })
      .select()
      .single()
    if (error) throw error
    return data
  }

  const updateProduct = async (id: string, updates: Partial<{
    name: string
    description: string
    sku: string
    stock: number
    price: number
    image_url: string
    marketplace_id: string
  }>) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  return {
    getProducts,
    getProductsCount,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
