import { TmdbApiError } from './errors';

export function parsePageParam(
  searchParams: URLSearchParams,
  defaultPage = 1
): number {
  const raw = searchParams.get('page');
  if (raw === null || raw === '') {
    return defaultPage;
  }

  const page = Number.parseInt(raw, 10);
  if (!Number.isFinite(page) || page < 1) {
    throw new TmdbApiError(400, 'Invalid page parameter.');
  }

  return page;
}

export function parseMovieId(id: string): number {
  const movieId = Number.parseInt(id, 10);
  if (!Number.isFinite(movieId) || movieId < 1) {
    throw new TmdbApiError(400, 'Invalid movie id.');
  }
  return movieId;
}
