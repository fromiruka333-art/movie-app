import AppShell from '@/components/layout/AppShell';
import MovieDetailView from '@/components/movies/MovieDetailView';
import { TmdbApiError } from '@/lib/tmdb/errors';
import { getMovieDetail } from '@/lib/tmdb/movies';
import { parseMovieId } from '@/lib/tmdb/routeUtils';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;

  let movieId: number;
  try {
    movieId = parseMovieId(id);
  } catch {
    notFound();
  }

  try {
    const movie = await getMovieDetail(movieId);
    return (
      <AppShell>
        <MovieDetailView movie={movie} />
      </AppShell>
    );
  } catch (error) {
    if (error instanceof TmdbApiError && error.statusCode === 404) {
      notFound();
    }
    throw error;
  }
}
