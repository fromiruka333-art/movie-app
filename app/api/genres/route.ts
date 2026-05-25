import { NextResponse } from 'next/server';
import { handleRouteError } from '@/lib/tmdb/errors';
import { getMovieGenres } from '@/lib/tmdb/genres';

export async function GET() {
  try {
    const genres = await getMovieGenres();
    return NextResponse.json({ genres }, { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
