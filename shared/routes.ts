import { z } from 'zod';
import { generateBotSchema } from './schema';

export const api = {
  generate: {
    method: 'POST' as const,
    path: '/api/generate',
    input: generateBotSchema,
    responses: {
      200: z.any(), // File download (blob)
      400: z.object({ message: z.string() }),
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
