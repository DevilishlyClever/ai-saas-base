import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-600">AI SaaS</span>
          <span className="text-sm text-gray-600">{user.email}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="bg-white rounded-xl border p-8 text-center text-gray-500">
          <p className="text-lg mb-2">Welcome, {user.email}!</p>
          <p className="text-sm">Your AI SaaS platform is ready. Start building.</p>
        </div>
      </div>
    </main>
  )
}
