// Create Render services programmatically
// Run with: node scripts/create-render-services.js

require('dotenv').config({ path: '../.env' });

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const RENDER_API = 'https://api.render.com/v1';

async function renderAPI(endpoint, method = 'GET', body = null) {
  const response = await fetch(`${RENDER_API}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${RENDER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null
  });
  return response.json();
}

async function createWebService(config) {
  return await renderAPI('/services', 'POST', {
    type: 'web_service',
    ...config
  });
}

async function main() {
  // Create Backend Service
  console.log('Creating backend service...');
  const backend = await createWebService({
    name: 'emailshare-api',
    runtime: 'python',
    repo: 'https://github.com/ars1mm/emailservice-sass',
    branch: 'main',
    rootDir: 'backend',
    buildCommand: 'pip install -r requirements.txt',
    startCommand: 'uvicorn app.main:app --host 0.0.0.0 --port $PORT',
    plan: 'free',
    region: 'oregon',
    envVars: [
      { key: 'JWT_SECRET', value: process.env.JWT_SECRET },
      { key: 'PADDLE_WEBHOOK_SECRET', value: process.env.PADDLE_WEBHOOK_SECRET },
      { key: 'PADDLE_API_KEY', value: process.env.PADDLE_API_KEY },
    ]
  });
  console.log('Backend created:', backend);

  // Create Frontend Service
  console.log('\nCreating frontend service...');
  const frontend = await createWebService({
    name: 'emailshare-frontend',
    runtime: 'node',
    repo: 'https://github.com/ars1mm/emailservice-sass',
    branch: 'main',
    rootDir: 'frontend',
    buildCommand: 'npm install && npm run build',
    startCommand: 'npm start',
    plan: 'free',
    region: 'oregon',
    envVars: [
      { key: 'NEXT_PUBLIC_API_URL', value: `https://${backend.service?.slug}.onrender.com` }
    ]
  });
  console.log('Frontend created:', frontend);

  console.log('\n✅ Services created successfully!');
  console.log(`Backend: https://${backend.service?.slug}.onrender.com`);
  console.log(`Frontend: https://${frontend.service?.slug}.onrender.com`);
}

main().catch(console.error);
