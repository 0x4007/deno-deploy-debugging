export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from Deno Deploy Plugin!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
