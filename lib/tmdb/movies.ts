import { toMovieDetail } from './adapters/movieDetail';
import { toMovieListResponse } from './adapters/movieList';
import { fetchTrendingFromEnv, fetchTmdb } from './client';
import { REVALIDATE_DETAIL, REVALIDATE_LIST } from './config';
import type { MovieDetail, MovieListResponse } from './types';

export async function getTrendingMovies(
  page: number = 1
): Promise<MovieListResponse> {
  const raw = await fetchTrendingFromEnv(page, REVALIDATE_LIST);
  return toMovieListResponse(raw);
}

export async function getPopularMovies(
  page: number = 1
): Promise<MovieListResponse> {
  const raw = await fetchTmdb('/movie/popular', {
    searchParams: { page },
    revalidate: REVALIDATE_LIST,
  });
  return toMovieListResponse(raw);
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  const raw = await fetchTmdb(`/movie/${id}`, {
    searchParams: {
      append_to_response: 'videos,credits,watch/providers',
    },
    revalidate: REVALIDATE_DETAIL,
  });
  return toMovieDetail(raw);
}
