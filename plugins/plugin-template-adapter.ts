import { runPlugin } from './plugin-template/src/index.ts';
import type { Context } from './plugin-template/src/types/context.ts';

export default {
  async fetch(request: Request, env: Record<string, unknown>): Promise<Response> {
    // Create a minimal context object for the plugin
    const context: Context = {
      eventName: 'demo',
      payload: {},
      logger: {
        info: (...args: any[]) => console.log(...args),
        error: (...args: any[]) => console.error(...args),
        debug: (...args: any[]) => console.debug(...args),
        warn: (...args: any[]) => console.warn(...args)
      },
      config: {},
      octokit: null as any, // Not used in this demo
      cache: null as any,   // Not used in this demo
      storage: null as any  // Not used in this demo
    };

    try {
      await runPlugin(context);
      return new Response('Plugin executed successfully', { status: 200 });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return new Response(`Plugin error: ${message}`, { status: 500 });
    }
  }
};
