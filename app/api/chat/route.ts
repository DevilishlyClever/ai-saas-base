import { streamText, convertToCoreMessages, gateway } from 'ai'
import { createServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: Request) {
  const start = Date.now()
  const requestId = req.headers.get('x-vercel-id') ?? 'local'

  console.log(JSON.stringify({ level: 'info', msg: 'chat start', requestId }))

  // Authenticate the request
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log(JSON.stringify({ level: 'warn', msg: 'unauthorized', requestId }))
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { messages } = await req.json()

  try {
    const result = streamText({
      model: gateway('anthropic/claude-sonnet-4.6'),
      messages: convertToCoreMessages(messages),
      system: 'You are a helpful AI assistant.',
    })

    console.log(JSON.stringify({ level: 'info', msg: 'chat stream started', ms: Date.now() - start, requestId }))

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error(JSON.stringify({
      level: 'error',
      msg: 'chat failed',
      error: error instanceof Error ? error.message : String(error),
      ms: Date.now() - start,
      requestId,
    }))
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
