import { TMDB_IMAGE_BASE } from './config';

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: 'w500' | 'original' = 'w500'
): string | null {
  if (!path) {
    return null;
  }
  const base =
    size === 'original'
      ? 'https://image.tmdb.org/t/p/original'
      : TMDB_IMAGE_BASE;
  return `${base}${path}`;
}
