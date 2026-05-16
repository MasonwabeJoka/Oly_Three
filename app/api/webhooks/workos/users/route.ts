import { WorkOS } from '@workos-inc/node'
import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/server/db/db' 
import { users } from '@/server/db/schemas/users/users' 
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
const workos = new WorkOS(process.env.WORKOS_API_KEY!)

export async function POST(req: NextRequest) {
  const sigHeader = req.headers.get('workos-signature')

  const secrets = (
    process.env.WORKOS_SIGNING_SECRET ||
    process.env.WORKOS_WEBHOOK_SECRET ||
    ''
  )
    .split(/[,\n;]/)
    .map(secret => secret.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)

  if (!sigHeader || secrets.length === 0) {
    return NextResponse.json(
      {
        error: 'Missing signature or secret'
      },
      {
        status: 400
      }
    )
  }

  try {
    const payload = await req.json()
    console.log('workos-webhook-debug', {
      hasSignature: Boolean(sigHeader),
      signaturePrefix: sigHeader?.slice(0, 12),
      payloadLength: payload.length,
      secretCount: secrets.length,
      secretPrefixes: secrets.map((s) => s.slice(0, 8)),
    })

    let event: any
    let verificationError: unknown

    for (const secret of secrets) {
      try {
        event = await workos.webhooks.constructEvent({
          payload,
          sigHeader,
          secret
        })

        if (event) {
          break
        }

      } catch (error) {
        verificationError = error
      }
    }

    if (!event) {
      throw verificationError
    }

    switch (event.event) {
      case 'user.created':

        await drizzleDb
        .insert(users)
        .values({
            id: randomUUID(),
            workosId: event.data.id,
            firstName: event.data.firstName ?? '',
            lastName: event.data.lastName ?? '',
            email: event.data.email
        })
        .onConflictDoUpdate({
        target: users.workosId,
        set: {
          firstName: event.data.firstName ?? '',
          lastName: event.data.lastName ?? '',
          email: event.data.email
        }
      })
        break

      case 'user.updated':

       await drizzleDb
      .update(users)
      .set({
        firstName: event.data.firstName ?? '',
        lastName: event.data.lastName ?? '',
        email: event.data.email
      })
      .where(eq(users.workosId, event.data.id))
        break

      case 'user.deleted':

       await drizzleDb
      .delete(users)
      .where(eq(users.workosId, event.data.id))
        break
    }

    return NextResponse.json(
      {
        processed: true
      },
      {
        status: 200
      }
    )

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Signature verification failed'
      },
      {
        status: 401
      }
    )
  }
}
