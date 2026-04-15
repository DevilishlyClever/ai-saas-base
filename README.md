# AI SaaS Base

Reusable foundation for AI-powered SaaS products.

## Stack

- **Next.js 16** (App Router, Turbopack, `proxy.ts`)
- **Supabase** — Postgres + Auth + Row Level Security
- **Stripe** — Subscription billing with webhooks
- **Vercel AI Gateway** — `anthropic/claude-sonnet-4.6` via unified API
- **Vercel** — Hosting, CI/CD, Analytics, Speed Insights

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/DevilishlyClever/ai-saas-base
cd ai-saas-base
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your values — see .env.example for required keys
```

Or pull from Vercel (after linking):

```bash
vercel link
vercel env pull .env.local
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration: paste `supabase/migrations/001_initial.sql` in the SQL Editor
3. Copy your project URL and keys to `.env.local`

### 4. Set up Stripe

1. Create an account at [stripe.com](https://stripe.com) (use test mode)
2. Create a product with a monthly price ($19/mo = 1900 cents)
3. Add the price ID to `.env.local` as `STRIPE_PRO_PRICE_ID`
4. Set up a webhook endpoint at `/api/webhooks/stripe` and copy the signing secret

### 5. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
  page.tsx              # Landing page
  pricing/page.tsx      # Pricing page
  dashboard/page.tsx    # Authenticated dashboard
  api/
    chat/route.ts       # AI streaming endpoint
    webhooks/stripe/    # Stripe lifecycle events
lib/
  supabase/
    server.ts           # SSR-safe server client
    client.ts           # Browser client
    admin.ts            # Service role client
  stripe/index.ts       # Stripe helpers + checkout/portal
proxy.ts                # Next.js 16 auth proxy (replaces middleware.ts)
supabase/
  migrations/           # SQL migrations
.env.example            # Required environment variable keys
```

## API

### Chat — `POST /api/chat`

Authenticated streaming chat via Vercel AI Gateway.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:** Server-sent events (UI message stream format)

**JavaScript:**
```javascript
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

const { messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({ api: '/api/chat' }),
})
```

**curl:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'
```

**Python:**
```python
import httpx

response = httpx.post(
    "http://localhost:3000/api/chat",
    json={"messages": [{"role": "user", "content": "Hello!"}]},
    headers={"Cookie": "your-session-cookie"},
)
print(response.text)
```

## Deployment

```bash
# Deploy to Vercel
vercel deploy --prod

# Set environment variables
vercel env add STRIPE_SECRET_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... etc
```

## Environment Variables

See [`.env.example`](.env.example) for all required keys with descriptions.
