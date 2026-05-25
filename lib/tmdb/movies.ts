import { toMovieDetail } from './adapters/movieDetail';
import { toMovieListResponse } from './adapters/movieList';
import { fetchTrendingFromEnv, fetchTmdb } from './client';
import { REVALIDATE_DETAIL, REVALIDATE_LIST, WATCH_REGION } from './config';
import type { MovieDetail, MovieListResponse } from './types';

export type DiscoverOptions = {
  page?: number;
  genreIds?: number[];
  maxRuntime?: number;
  year?: number;
  providerIds?: number[];
};

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

export async function discoverMovies(
  options: DiscoverOptions = {}
): Promise<MovieListResponse> {
  const searchParams: Record<string, string | number> = {
    page: options.page ?? 1,
    region: WATCH_REGION,
    watch_region: WATCH_REGION,
    sort_by: 'popularity.desc',
    include_adult: 'false',
  };

  if (options.genreIds?.length) {
    searchParams.with_genres = options.genreIds.join(',');
  }
  if (options.maxRuntime != null) {
    searchParams['with_runtime.lte'] = options.maxRuntime;
  }
  if (options.year != null) {
    searchParams.primary_release_year = options.year;
  }
  if (options.providerIds?.length) {
    searchParams.with_watch_providers = options.providerIds.join('|');
  }

  const raw = await fetchTmdb('/discover/movie', {
    searchParams,
    revalidate: 600,
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
