import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error(JSON.stringify({ level: 'error', msg: 'stripe webhook signature failed', error: String(err) }))
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const status = subscription.status

      // Find user by stripe customer id and update subscription
      await supabase
        .from('subscriptions')
        .upsert({
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          status,
          price_id: subscription.items.data[0]?.price.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'stripe_customer_id' })

      console.log(JSON.stringify({ level: 'info', msg: 'subscription upserted', customerId, status }))
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await supabase
        .from('subscriptions')
        .update({ status: 'canceled', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId)

      console.log(JSON.stringify({ level: 'info', msg: 'subscription canceled', customerId }))
      break
    }

    default:
      console.log(JSON.stringify({ level: 'info', msg: 'unhandled stripe event', type: event.type }))
  }

  return Response.json({ received: true })
}
