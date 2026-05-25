import Link from 'next/link';
import MovieGrid from '@/components/movies/MovieGrid';
import {
  buildSearchQuery,
  type SearchFilters,
} from '@/lib/search/params';
import type { MovieListResponse } from '@/lib/tmdb/types';

type SearchResultsProps = {
  filters: SearchFilters;
  data: MovieListResponse | null;
  errorMessage?: string | null;
};

export default function SearchResults({
  filters,
  data,
  errorMessage,
}: SearchResultsProps) {
  if (errorMessage) {
    return (
      <div className="space-y-4 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/40">
        <p className="text-sm font-medium text-red-800 dark:text-red-200">
          {errorMessage}
        </p>
        <Link
          href="/search"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          条件をリセット
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 px-6 py-12 text-center text-sm text-zinc-500 dark:border-zinc-700">
        ジャンル・上映時間・公開年・配信サブスクのいずれかを選び、「検索する」を押してください。
      </p>
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="space-y-4 rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          条件に合う映画が見つかりませんでした。
        </p>
        <Link
          href="/search"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          条件をリセット
        </Link>
      </div>
    );
  }

  const prevPage = filters.page > 1 ? filters.page - 1 : null;
  const nextPage =
    filters.page < data.totalPages ? filters.page + 1 : null;

  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {data.totalResults} 件中 {data.results.length} 件を表示（
        {filters.page} / {data.totalPages} ページ）
      </p>
      <MovieGrid movies={data.results} />
      {data.totalPages > 1 ? (
        <div className="flex justify-center gap-4">
          {prevPage ? (
            <Link
              href={`/search?${buildSearchQuery({ ...filters, page: prevPage })}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium dark:border-zinc-700"
            >
              前へ
            </Link>
          ) : null}
          {nextPage ? (
            <Link
              href={`/search?${buildSearchQuery({ ...filters, page: nextPage })}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium dark:border-zinc-700"
            >
              次へ
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
