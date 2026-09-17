import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const priceId = process.env.STRIPE_DISKSPACEMATRIX_PRICE_ID || 'price_1UGehIGB875OoyvB9SrELSpg';
const siteOrigin = process.env.PUBLIC_SITE_URL || 'https://www.jimwashkau.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured yet.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      custom_fields: [
        {
          key: 'github_username',
          label: { type: 'custom', custom: 'GitHub username' },
          type: 'text',
          optional: false,
        },
      ],
      billing_address_collection: 'auto',
      customer_creation: 'always',
      success_url: `${siteOrigin}/apps?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/apps?purchase=cancelled`,
      metadata: {
        app_slug: 'diskspacematrix',
        github_repository: 'JimWas/DiskSpaceMatrix',
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout error', error);
    return res.status(500).json({ error: 'Unable to start checkout.' });
  }
}
