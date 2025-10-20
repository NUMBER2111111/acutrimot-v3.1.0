// Auto-generated Vercel API adapter for AcuTrimot payments
// If NEXT_PUBLIC_API_BASE is provided, proxy to FastAPI backend; otherwise, return mock success.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || '';
    const body = req.body || {};
    const amount = Number(body.amount ?? body.amount_cents ?? 999);
    const planName = body.planName || 'Pro Plan';
    const sourceId = body.sourceId || body.nonce || null;
    const idem = body.idempotency_key || body.idem || null;

    if (base) {
      // Proxy to FastAPI
      const url = base.replace(/\/$/, '') + '/payments/square/checkout';
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          amount_cents: amount,
          currency: 'USD',
          nonce: sourceId,
          idempotency_key: idem
        })
      });
      const json = await r.json();
      const ok = r.ok && (json?.ok ?? json?.success ?? false);
      return res.status(ok ? 200 : 400).json(json);
    } else {
      // Mock mode (from your uploaded file semantics)
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }
      const ts = Date.now();
      return res.status(200).json({
        success: true,
        paymentId: 'pay_' + ts,
        subscriptionId: 'sub_' + ts,
        amount,
        planName,
        status: 'COMPLETED',
        mode: 'mock'
      });
    }
  } catch (e) {
    console.error('payments handler error', e);
    return res.status(500).json({ error: 'Internal error' });
  }
}
