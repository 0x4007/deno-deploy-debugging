// Simple HTTP server that returns "Hello World"
Deno.serve((_req) => {
  return new Response("Hello World");
});