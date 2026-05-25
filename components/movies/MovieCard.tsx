import Image from 'next/image';
import Link from 'next/link';
import { getTmdbImageUrl } from '@/lib/tmdb/image';
import type { MovieSummary } from '@/lib/tmdb/types';

type MovieCardProps = {
  movie: MovieSummary;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbImageUrl(movie.posterPath);
  const year = movie.releaseDate?.slice(0, 4);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group flex min-h-[44px] min-w-[44px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
    >
      <div className="relative aspect-[2/3] w-full bg-zinc-100 dark:bg-zinc-800">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-zinc-500">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 break-words text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          {movie.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {year ? `${year} · ` : ''}
          ★ {movie.voteAverage.toFixed(1)}
        </p>
      </div>
    </Link>
  );
}
