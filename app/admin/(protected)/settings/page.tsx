import { createServerClient } from '@/lib/supabase-server'
import SettingsClient from './SettingsClient'

export const dynamic = 'force-dynamic'

const DEFAULTS = {
  transfer_cbu: '',
  transfer_alias: '',
  transfer_bank: '',
  transfer_holder: '',
}

async function getSettings() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('settings').select('key, value')
    const map = Object.fromEntries((data ?? []).map(({ key, value }: { key: string; value: string }) => [key, value]))
    return { ...DEFAULTS, ...map }
  } catch {
    return DEFAULTS
  }
}

export default async function AdminSettingsPage() {
  const settings = await getSettings()
  return <SettingsClient initial={settings} />
}
