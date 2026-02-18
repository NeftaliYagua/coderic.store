/**
 * Cloudflare Pages Function - Catch-all API Router
 * Routes all /api/* requests
 */

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // API Index - List available endpoints
  if (path === '/api' || path === '/api/') {
    const response = {
      name: 'Coderic Business API',
      version: '1.0.0',
      network: 'BUSINESS',
      endpoints: {
        'GET /api/helloWorld': 'Hello World test endpoint',
        'GET /api': 'This API index'
      },
      documentation: 'https://coderic.co',
      status: 'operational'
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  // 404 for unknown endpoints
  const errorResponse = {
    error: 'Endpoint not found',
    path: path,
    message: 'The requested API endpoint does not exist',
    availableEndpoints: [
      '/api',
      '/api/helloWorld'
    ],
    documentation: 'https://coderic.co'
  };

  return new Response(JSON.stringify(errorResponse, null, 2), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

