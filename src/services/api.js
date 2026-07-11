import { MENU_ITEMS } from '../data/menuData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.roastedbean.in/v1';

const securityHeaders = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function sanitizeInput(data) {
  if (typeof data === 'string') {
    return data.replace(/<[^>]*>/g, '').trim();
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeInput);
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return data;
}

export async function fetchMenu() {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'GET',
      headers: securityHeaders,
    });

    if (!response.ok) {
      throw new Error(`Menu fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: MENU_ITEMS });
      }, 500);
    });
  }
}

export async function submitOrder(orderData) {
  try {
    const sanitized = sanitizeInput(orderData);

    const payload = {
      ...sanitized,
      order_id: sanitized.order_id || `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'pending_payment',
      created_at: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: securityHeaders,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Order submission failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        resolve({
          success: true,
          data: {
            ...orderData,
            order_id: orderId,
            status: 'pending_payment',
            created_at: new Date().toISOString(),
          },
        });
      }, 1000);
    });
  }
}
