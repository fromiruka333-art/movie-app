import type { MovieSummary } from '@/lib/tmdb/types';
import MovieGrid from './MovieGrid';

type MovieSectionProps = {
  title: string;
  movies: MovieSummary[];
};

export default function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <MovieGrid movies={movies} />
    </section>
  );
}
