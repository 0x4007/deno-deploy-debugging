export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello World from Deno Deploy App!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
