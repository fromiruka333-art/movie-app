import { NextResponse } from 'next/server';
import { handleRouteError } from '@/lib/tmdb/errors';
import { getTrendingMovies } from '@/lib/tmdb/movies';
import { parsePageParam } from '@/lib/tmdb/routeUtils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePageParam(searchParams);
    const data = await getTrendingMovies(page);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
