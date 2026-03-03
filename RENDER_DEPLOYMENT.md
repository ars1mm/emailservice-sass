# Deploy Backend to Render for Paddle Webhooks

## 1. Create render.yaml in backend folder
```yaml
services:
  - type: web
    name: emailshare-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PADDLE_WEBHOOK_SECRET
        sync: false
```

## 2. Push to GitHub
```bash
git add .
git commit -m "Add Paddle webhook support"
git push
```

## 3. Deploy on Render
1. Go to https://render.com
2. New → Web Service
3. Connect your GitHub repo
4. Render auto-detects settings
5. Add environment variable: PADDLE_WEBHOOK_SECRET
6. Deploy

## 4. Get your Render URL
After deployment: https://emailshare-api.onrender.com

## 5. Configure Paddle
1. Paddle Dashboard → Developer Tools → Notifications
2. Webhook URL: https://emailshare-api.onrender.com/paddle/webhook
3. Select events: subscription.created, subscription.updated, subscription.canceled
4. Save

## Benefits of Render:
✅ Free tier available
✅ Automatic HTTPS
✅ Always online (no sleep like ngrok)
✅ Static URL (doesn't change)
✅ Perfect for webhooks

## Note:
Free tier may have cold starts (first request takes ~30s). Upgrade to paid for instant responses.
