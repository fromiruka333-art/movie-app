import AppShell from '@/components/layout/AppShell';
import MovieGridSkeleton from '@/components/movies/MovieGridSkeleton';

export default function SearchLoading() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <MovieGridSkeleton count={8} />
      </div>
    </AppShell>
  );
}
