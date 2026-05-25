import { NextResponse } from 'next/server';

export class TmdbApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'TmdbApiError';
  }
}

export function jsonError(
  error: string,
  status: number,
  details?: unknown
): NextResponse {
  return NextResponse.json({ error, details: details ?? null }, { status });
}

export function handleRouteError(error: unknown): NextResponse {
  if (error instanceof TmdbApiError) {
    return jsonError(error.message, error.statusCode, error.details);
  }

  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.';

  return jsonError(
    'An unexpected error occurred while fetching TMDB data.',
    502,
    message
  );
}
