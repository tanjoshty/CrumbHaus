import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
    </div>
  )
}
