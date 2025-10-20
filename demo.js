import { useState } from 'react';

export default function Demo() {
  const [amount, setAmount] = useState(999);
  const [out, setOut] = useState('');

  async function pay() {
    setOut('processing...');
    const idem = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    const res = await fetch('/api/payments/square', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ amount, planName: 'Pro Plan', idempotency_key: idem })
    });
    const json = await res.json();
    setOut(JSON.stringify(json, null, 2));
  }

  return (
    <main style={{ fontFamily: 'system-ui', margin: 24 }}>
      <h1>AcuTrimot – Payments Demo</h1>
      <p>Mode: {process.env.NEXT_PUBLIC_API_BASE ? 'proxy → FastAPI' : 'mock (local)'}</p>
      <label>Amount (cents):{' '}
        <input value={amount} onChange={e=>setAmount(Number(e.target.value||0))} />
      </label>
      <div style={{ marginTop: 12 }}>
        <button onClick={pay}>Pay</button>
      </div>
      <pre style={{ whiteSpace:'pre-wrap', marginTop: 16 }}>{out}</pre>
    </main>
  );
}
