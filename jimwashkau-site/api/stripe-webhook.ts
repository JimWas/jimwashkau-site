import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const repository = 'JimWas/DiskSpaceMatrix';

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.GITHUB_TOKEN) {
    return res.status(500).send('Webhook is not configured yet.');
  }

  try {
    const rawBody = await readBody(req);
    const signature = req.headers['stripe-signature'];
    if (typeof signature !== 'string') {
      return res.status(400).send('Missing Stripe signature.');
    }

    const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== 'paid' || session.metadata?.app_slug !== 'diskspacematrix') {
        return res.status(200).json({ received: true });
      }

      const githubUsername = session.custom_fields?.find((field) => field.key === 'github_username')?.text?.value?.trim();
      if (!githubUsername) {
        console.error('Paid session missing GitHub username', session.id);
        return res.status(200).json({ received: true, fulfillment: 'missing_github_username' });
      }

      const githubResponse = await fetch(`https://api.github.com/repos/${repository}/collaborators/${encodeURIComponent(githubUsername)}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permission: 'pull' }),
      });

      if (!githubResponse.ok) {
        console.error('GitHub repository invitation failed', githubResponse.status, await githubResponse.text());
        return res.status(502).json({ received: true, fulfillment: 'github_invitation_failed' });
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error', error);
    return res.status(400).send('Webhook signature or payload invalid.');
  }
}

function readBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
