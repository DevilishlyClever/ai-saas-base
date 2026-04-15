import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-600">AI SaaS</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Build AI-powered apps
          <br />
          <span className="text-brand-600">in minutes, not months</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          The all-in-one platform for AI application development. Authentication,
          billing, and AI inference — all wired up and ready to go.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-brand-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Start building free
          </Link>
          <Link
            href="/pricing"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:border-gray-400 transition-colors"
          >
            View pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Authentication',
              desc: 'Supabase-powered auth out of the box. Email, OAuth, magic links.',
              icon: '🔐',
            },
            {
              title: 'AI Integration',
              desc: 'Anthropic Claude connected via Vercel AI SDK. Streaming responses.',
              icon: '🤖',
            },
            {
              title: 'Billing',
              desc: 'Stripe subscriptions with webhooks. Start free, upgrade when ready.',
              icon: '💳',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl border p-6 shadow-sm">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="bg-brand-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to build?</h2>
          <p className="text-brand-50 mb-8 text-lg">
            Get started in minutes. No credit card required.
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-brand-50 transition-colors inline-block"
          >
            Create your account
          </Link>
        </div>
      </section>
    </main>
  )
}
