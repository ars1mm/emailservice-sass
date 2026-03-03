// Add webhook to Paddle via API
// Run with: node scripts/setup-paddle-webhook.js

require('dotenv').config({ path: '../.env' });

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://your-app.onrender.com/paddle/webhook';

async function createNotificationSetting() {
  const response = await fetch('https://sandbox-api.paddle.com/notification-settings', {
    method: 'POST',
    headers: {
      'Paddle-Version': '1',
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: 'EmailShare Webhook',
      destination: WEBHOOK_URL,
      active: true,
      subscribed_events: [
        { name: 'subscription.created', enabled: true },
        { name: 'subscription.updated', enabled: true },
        { name: 'subscription.canceled', enabled: true },
        { name: 'subscription.activated', enabled: true },
        { name: 'subscription.past_due', enabled: true },
      ],
      type: 'url',
      api_version: 1,
    })
  });

  const data = await response.json();
  console.log('Response status:', response.status);
  console.log('Webhook created:', data);
  
  if (data.data?.endpoint_secret_key) {
    console.log('\n⚠️  IMPORTANT: Save this secret key:');
    console.log(data.data.endpoint_secret_key);
    console.log('\nAdd it to your backend: PADDLE_WEBHOOK_SECRET=' + data.data.endpoint_secret_key);
  }
  
  return data;
}

createNotificationSetting().catch(console.error);
