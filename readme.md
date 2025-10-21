# AcuTrimot Frontend (Vercel)

Two modes:
- **Proxy mode**: set `NEXT_PUBLIC_API_BASE=https://<your-backend-host>` to forward to FastAPI `/payments/square/checkout`.
- **Mock mode**: leave it unset; API returns local mock success.

## Run
```bash
npm i
npm run dev
# open http://localhost:3000/payments/demo
```

## Deploy (Vercel)
- Create project from this folder.
- Set env (optional):
  - `NEXT_PUBLIC_API_BASE=https://<fastapi-host>`
