import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// This is a simple webhook handler for Clerk events
export async function POST(req: Request) {
  // Get the headers
  const headersList = headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

  // If there's no webhook secret, error out
  if (!webhookSecret) {
    console.error('Error: No webhook secret');
    return NextResponse.json(
      { success: false, message: 'Webhook secret not provided' },
      { status: 400 }
    );
  }

  // Verify the webhook
  try {
    const wh = new Webhook(webhookSecret);
    wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', {
      status: 400,
    });
  }

  // Get the type
  const event = payload as WebhookEvent;
  const eventType = event.type;

  console.log(`Webhook received: ${eventType}`);

  // Handle the event
  switch (eventType) {
    case 'user.created':
      // Handle user created
      break;
    case 'user.updated':
      // Handle user updated
      break;
    default:
      // Handle other events
      break;
  }

  return NextResponse.json({ success: true, message: `Webhook received: ${eventType}` });
} 