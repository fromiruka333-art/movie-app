import AppShell from '@/components/layout/AppShell';
import MovieGridSkeleton from '@/components/movies/MovieGridSkeleton';

export default function Loading() {
  return (
    <AppShell>
      <div className="space-y-10">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-72 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <section className="space-y-4">
          <div className="h-6 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <MovieGridSkeleton />
        </section>
        <section className="space-y-4">
          <div className="h-6 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <MovieGridSkeleton />
        </section>
      </div>
    </AppShell>
  );
}
