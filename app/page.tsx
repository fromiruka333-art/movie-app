import AppShell from '@/components/layout/AppShell';
import MovieSection from '@/components/movies/MovieSection';
import { getPopularMovies, getTrendingMovies } from '@/lib/tmdb/movies';

export default async function Home() {
  const [trending, popular] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
  ]);

  return (
    <AppShell>
      <div className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            映画を探す
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            トレンドと人気作品から、今夜観る一本を選びましょう。
          </p>
        </header>

        <MovieSection title="今週のトレンド" movies={trending.results} />
        <MovieSection title="人気の映画" movies={popular.results} />
      </div>
    </AppShell>
  );
}
