import AppShell from '@/components/layout/AppShell';
import SearchFilters from '@/components/search/SearchFilters';
import SearchFiltersDrawer from '@/components/search/SearchFiltersDrawer';
import SearchResults from '@/components/search/SearchResults';
import {
  hasActiveFilters,
  parseSearchFilters,
  type SearchPageParams,
} from '@/lib/search/params';
import { TmdbApiError } from '@/lib/tmdb/errors';
import { getMovieGenres } from '@/lib/tmdb/genres';
import { discoverMovies } from '@/lib/tmdb/movies';

type PageProps = {
  searchParams: Promise<SearchPageParams>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const filters = parseSearchFilters(rawParams);
  const genres = await getMovieGenres();

  let data = null;
  let errorMessage: string | null = null;

  if (hasActiveFilters(filters)) {
    try {
      data = await discoverMovies({
        page: filters.page,
        genreIds: filters.genreIds,
        maxRuntime: filters.maxRuntime,
        year: filters.year,
        providerIds: filters.providerIds,
      });
    } catch (error) {
      if (error instanceof TmdbApiError) {
        errorMessage =
          error.statusCode === 404
            ? '映画が見つかりませんでした。'
            : '通信に失敗しました。しばらくしてから再試行してください。';
      } else {
        errorMessage =
          '通信に失敗しました。接続状況を確認してから再試行してください。';
      }
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            映画を検索
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            ジャンル・上映時間・公開年・配信サブスクで絞り込みます。
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-20 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                検索条件
              </h2>
              <SearchFilters genres={genres} initialFilters={filters} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <SearchFiltersDrawer genres={genres} initialFilters={filters} />
            <SearchResults
              filters={filters}
              data={data}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
