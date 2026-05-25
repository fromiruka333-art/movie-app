import { DEFAULT_LANGUAGE, TMDB_API_BASE } from './config';
import { TmdbApiError } from './errors';

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY?.trim();
  if (!apiKey) {
    throw new TmdbApiError(
      500,
      'TMDB API key not found in environment variables.'
    );
  }
  return apiKey;
}

type FetchTmdbOptions = {
  searchParams?: Record<string, string | number | undefined>;
  revalidate?: number;
};

async function fetchFromUrl(
  url: string,
  revalidate?: number
): Promise<unknown> {
  const init: RequestInit & { next?: { revalidate: number } } = {
    headers: { 'Content-Type': 'application/json' },
  };

  if (revalidate !== undefined && revalidate > 0) {
    init.next = { revalidate };
  } else {
    init.cache = 'no-store';
  }

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Network request failed';
    throw new TmdbApiError(502, 'Failed to reach TMDB API.', message);
  }

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    const statusMessage =
      typeof details === 'object' &&
      details !== null &&
      'status_message' in details
        ? String((details as { status_message: unknown }).status_message)
        : response.statusText;

    throw new TmdbApiError(
      response.status,
      response.status === 404
        ? 'Movie not found'
        : 'Failed to fetch data from TMDB.',
      details
    );
  }

  return response.json();
}

/**
 * TMDB v3 パス（先頭 / 付き）へ GET。api_key と language を付与する。
 */
export async function fetchTmdb(
  path: string,
  options: FetchTmdbOptions = {}
): Promise<unknown> {
  const url = new URL(
    path.startsWith('/') ? `${TMDB_API_BASE}${path}` : `${TMDB_API_BASE}/${path}`
  );

  url.searchParams.set('api_key', getApiKey());
  url.searchParams.set('language', DEFAULT_LANGUAGE);

  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return fetchFromUrl(url.toString(), options.revalidate);
}

/**
 * トレンド用。TMDB_API_URL が設定されていればその URL をベースにする。
 */
export async function fetchTrendingFromEnv(
  page: number,
  revalidate: number
): Promise<unknown> {
  const customBase = process.env.TMDB_API_URL?.trim();

  if (customBase) {
    const url = new URL(customBase);
    url.searchParams.set('api_key', getApiKey());
    url.searchParams.set('page', String(page));
    if (!url.searchParams.has('language')) {
      url.searchParams.set('language', DEFAULT_LANGUAGE);
    }
    return fetchFromUrl(url.toString(), revalidate);
  }

  return fetchTmdb('/trending/movie/week', {
    searchParams: { page },
    revalidate,
  });
}
