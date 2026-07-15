import { createServerClient } from '@/lib/supabase-server'
import ModelsClient from './ModelsClient'

export const dynamic = 'force-dynamic'

export default async function AdminModelsPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('models')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return <ModelsClient initialModels={data ?? []} />
}
