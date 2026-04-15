import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for experimenting',
    features: [
      '100 AI requests/month',
      '1 project',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Get started free',
    href: '/dashboard',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For serious builders',
    features: [
      'Unlimited AI requests',
      'Unlimited projects',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
    ],
    cta: 'Start Pro',
    href: '/dashboard',
    highlight: true,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-600">
            AI SaaS
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlight
                  ? 'bg-brand-600 text-white shadow-xl ring-2 ring-brand-600'
                  : 'bg-white text-gray-900 shadow-sm border'
              }`}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <p
                  className={`text-sm ${
                    plan.highlight ? 'text-brand-100' : 'text-gray-500'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span
                  className={`text-sm ml-1 ${
                    plan.highlight ? 'text-brand-100' : 'text-gray-500'
                  }`}
                >
                  /month
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${
                        plan.highlight ? 'text-brand-100' : 'text-brand-600'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.highlight
                    ? 'bg-white text-brand-600 hover:bg-brand-50'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
