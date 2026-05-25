import { NextResponse } from 'next/server';
import { handleRouteError } from '@/lib/tmdb/errors';
import { getMovieDetail } from '@/lib/tmdb/movies';
import { parseMovieId } from '@/lib/tmdb/routeUtils';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const movieId = parseMovieId(id);
    const data = await getMovieDetail(movieId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
