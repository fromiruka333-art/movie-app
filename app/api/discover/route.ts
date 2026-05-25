import { NextResponse } from 'next/server';
import { parseSearchFilters, hasActiveFilters } from '@/lib/search/params';
import { handleRouteError, TmdbApiError } from '@/lib/tmdb/errors';
import { discoverMovies } from '@/lib/tmdb/movies';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = parseSearchFilters({
      genre: searchParams.get('genre') ?? undefined,
      maxRuntime: searchParams.get('maxRuntime') ?? undefined,
      year: searchParams.get('year') ?? undefined,
      providers: searchParams.get('providers') ?? undefined,
      page: searchParams.get('page') ?? undefined,
    });

    if (!hasActiveFilters(filters)) {
      throw new TmdbApiError(
        400,
        'At least one search filter is required (genre, maxRuntime, year, or providers).'
      );
    }

    const data = await discoverMovies({
      page: filters.page,
      genreIds: filters.genreIds,
      maxRuntime: filters.maxRuntime,
      year: filters.year,
      providerIds: filters.providerIds,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
