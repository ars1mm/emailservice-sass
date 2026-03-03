// Script to create Paddle products programmatically (Paddle Billing API)
// Run with: node scripts/create-paddle-products.js

require('dotenv').config({ path: '../.env' });

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;

async function createProduct(productData) {
  const response = await fetch('https://sandbox-api.paddle.com/products', {
    method: 'POST',
    headers: {
      'Paddle-Version': '1',
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  });

  const data = await response.json();
  console.log('Response status:', response.status);
  return data;
}

async function createPrice(productId, priceData) {
  const response = await fetch('https://sandbox-api.paddle.com/prices', {
    method: 'POST',
    headers: {
      'Paddle-Version': '1',
      'Authorization': `Bearer ${PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      ...priceData
    })
  });

  return response.json();
}

async function setupProducts() {
  // Create Starter Product
  const starter = await createProduct({
    name: 'EmailShare Starter',
    description: 'Perfect for small teams getting started',
    tax_category: 'standard',
  });

  console.log('Starter Product:', starter);

  if (starter.data?.id) {
    const starterPrice = await createPrice(starter.data.id, {
      description: 'Monthly subscription',
      unit_price: {
        amount: '999',
        currency_code: 'USD'
      },
      billing_cycle: {
        interval: 'month',
        frequency: 1
      },
      trial_period: {
        interval: 'day',
        frequency: 14
      }
    });
    console.log('Starter Price:', starterPrice);
  }

  // Create Pro Product
  const pro = await createProduct({
    name: 'EmailShare Pro',
    description: 'For growing teams that need more power',
    tax_category: 'standard',
  });

  console.log('Pro Product:', pro);

  if (pro.data?.id) {
    const proPrice = await createPrice(pro.data.id, {
      description: 'Monthly subscription',
      unit_price: {
        amount: '2999',
        currency_code: 'USD'
      },
      billing_cycle: {
        interval: 'month',
        frequency: 1
      },
      trial_period: {
        interval: 'day',
        frequency: 14
      }
    });
    console.log('Pro Price:', proPrice);
  }

  // Create Enterprise Product
  const enterprise = await createProduct({
    name: 'EmailShare Enterprise',
    description: 'For large organizations with advanced needs',
    tax_category: 'standard',
  });

  console.log('Enterprise Product:', enterprise);

  if (enterprise.data?.id) {
    const enterprisePrice = await createPrice(enterprise.data.id, {
      description: 'Monthly subscription',
      unit_price: {
        amount: '9999',
        currency_code: 'USD'
      },
      billing_cycle: {
        interval: 'month',
        frequency: 1
      },
      trial_period: {
        interval: 'day',
        frequency: 14
      }
    });
    console.log('Enterprise Price:', enterprisePrice);
  }
}

setupProducts().catch(console.error);
