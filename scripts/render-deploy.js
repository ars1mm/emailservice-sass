// Render API - Deploy and manage services programmatically
// Get API key from: https://dashboard.render.com/u/settings#api-keys
// Run with: node scripts/render-deploy.js

require('dotenv').config({ path: '../.env' });

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const RENDER_API = 'https://api.render.com/v1';

console.log('Using API key:', RENDER_API_KEY ? RENDER_API_KEY.substring(0, 10) + '...' : 'NOT FOUND');

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

// List all services
async function listServices() {
  const data = await renderAPI('/services');
  console.log('Services:', data);
  return data;
}

// Deploy a service
async function deployService(serviceId) {
  const data = await renderAPI(`/services/${serviceId}/deploys`, 'POST', {
    clearCache: 'do_not_clear'
  });
  console.log('Deploy triggered:', data);
  return data;
}

// Update environment variable
async function updateEnvVar(serviceId, key, value) {
  const data = await renderAPI(`/services/${serviceId}/env-vars/${key}`, 'PUT', {
    value
  });
  console.log('Env var updated:', data);
  return data;
}

// Get service details
async function getService(serviceId) {
  const data = await renderAPI(`/services/${serviceId}`);
  console.log('Service details:', data);
  return data;
}

// Example usage
async function main() {
  // List all services
  const services = await listServices();
  
  // Get first service ID
  if (services[0]?.service?.id) {
    const serviceId = services[0].service.id;
    
    // Trigger deploy
    await deployService(serviceId);
    
    // Update env var
    // await updateEnvVar(serviceId, 'PADDLE_WEBHOOK_SECRET', 'new_secret');
  }
}

main().catch(console.error);
