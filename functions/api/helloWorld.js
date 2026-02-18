/**
 * Cloudflare Pages Function - Hello World API
 * Endpoint: /api/helloWorld
 * Method: GET
 */

export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers for cross-origin requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Main response
  const response = {
    message: 'Hello World from Coderic Business!',
    timestamp: new Date().toISOString(),
    network: 'BUSINESS',
    version: '1.0.0',
    endpoint: '/api/helloWorld',
    docs: 'https://coderic.co',
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

