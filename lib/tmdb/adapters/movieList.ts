import { LIST_OVERVIEW_MAX_LENGTH } from '../config';
import type { MovieListResponse, MovieSummary } from '../types';

type TmdbListMovie = {
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
};

type TmdbPagedResponse = {
  page?: number;
  total_pages?: number;
  total_results?: number;
  results?: TmdbListMovie[];
};

function truncateOverview(text: string): string {
  if (text.length <= LIST_OVERVIEW_MAX_LENGTH) {
    return text;
  }
  return `${text.slice(0, LIST_OVERVIEW_MAX_LENGTH)}…`;
}

export function toMovieSummary(item: TmdbListMovie): MovieSummary | null {
  if (item.id == null) {
    return null;
  }

  const title = item.title ?? item.name ?? '';
  const overview = item.overview ?? '';

  return {
    id: item.id,
    title,
    overview: truncateOverview(overview),
    posterPath: item.poster_path ?? null,
    releaseDate: item.release_date ?? null,
    voteAverage: item.vote_average ?? 0,
  };
}

export function toMovieListResponse(raw: unknown): MovieListResponse {
  const data = raw as TmdbPagedResponse;
  const results = (data.results ?? [])
    .map(toMovieSummary)
    .filter((m): m is MovieSummary => m !== null);

  return {
    page: data.page ?? 1,
    totalPages: data.total_pages ?? 0,
    totalResults: data.total_results ?? results.length,
    results,
  };
}
