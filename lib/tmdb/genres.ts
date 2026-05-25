import { fetchTmdb } from './client';
import type { Genre } from './types';

type TmdbGenreListResponse = {
  genres?: { id?: number; name?: string }[];
};

export async function getMovieGenres(): Promise<Genre[]> {
  const raw = (await fetchTmdb('/genre/movie/list', {
    revalidate: 86400,
  })) as TmdbGenreListResponse;

  return (raw.genres ?? [])
    .filter((g) => g.id != null && g.name)
    .map((g) => ({ id: g.id!, name: g.name! }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'));
}
