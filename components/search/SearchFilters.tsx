'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  buildSearchQuery,
  type SearchFilters,
} from '@/lib/search/params';
import type { Genre } from '@/lib/tmdb/types';
import { MVP_WATCH_PROVIDERS } from '@/lib/watchProviders';

const RUNTIME_OPTIONS = [
  { value: '', label: '指定なし' },
  { value: '90', label: '90分以内' },
  { value: '120', label: '120分以内' },
  { value: '150', label: '150分以内' },
  { value: '180', label: '180分以内' },
];

type SearchFiltersProps = {
  genres: Genre[];
  initialFilters: SearchFilters;
  onApplied?: () => void;
};

function buildYearOptions(): { value: string; label: string }[] {
  const current = new Date().getFullYear();
  const years: { value: string; label: string }[] = [
    { value: '', label: '指定なし' },
  ];
  for (let y = current; y >= current - 40; y--) {
    years.push({ value: String(y), label: `${y}年` });
  }
  return years;
}

const YEAR_OPTIONS = buildYearOptions();

export default function SearchFilters({
  genres,
  initialFilters,
  onApplied,
}: SearchFiltersProps) {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    initialFilters.genreIds
  );
  const [maxRuntime, setMaxRuntime] = useState(
    initialFilters.maxRuntime != null ? String(initialFilters.maxRuntime) : ''
  );
  const [year, setYear] = useState(
    initialFilters.year != null ? String(initialFilters.year) : ''
  );
  const [selectedProviders, setSelectedProviders] = useState<number[]>(
    initialFilters.providerIds
  );

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleProvider = (id: number) => {
    setSelectedProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const apply = useCallback(() => {
    const filters: SearchFilters = {
      genreIds: selectedGenres,
      maxRuntime: maxRuntime ? Number.parseInt(maxRuntime, 10) : undefined,
      year: year ? Number.parseInt(year, 10) : undefined,
      providerIds: selectedProviders,
      page: 1,
    };

    const query = buildSearchQuery(filters);
    router.push(query ? `/search?${query}` : '/search');
    onApplied?.();
  }, [
    maxRuntime,
    onApplied,
    router,
    selectedGenres,
    selectedProviders,
    year,
  ]);

  const reset = useCallback(() => {
    setSelectedGenres([]);
    setMaxRuntime('');
    setYear('');
    setSelectedProviders([]);
    router.push('/search');
    onApplied?.();
  }, [onApplied, router]);

  const checkboxClass =
    'h-5 w-5 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500';
  const labelClass =
    'flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900';

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          ジャンル
        </legend>
        <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-zinc-200 p-2 dark:border-zinc-800">
          {genres.map((g) => (
            <label key={g.id} className={labelClass}>
              <input
                type="checkbox"
                className={checkboxClass}
                checked={selectedGenres.includes(g.id)}
                onChange={() => toggleGenre(g.id)}
              />
              <span className="break-words text-sm">{g.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <label
          htmlFor="maxRuntime"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          上映時間（上限）
        </label>
        <select
          id="maxRuntime"
          value={maxRuntime}
          onChange={(e) => setMaxRuntime(e.target.value)}
          className="min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {RUNTIME_OPTIONS.map((opt) => (
            <option key={opt.value || 'none'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="space-y-2">
        <label
          htmlFor="year"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          公開年
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {YEAR_OPTIONS.map((opt) => (
            <option key={opt.value || 'none'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          配信サブスク（日本）
        </legend>
        <div className="space-y-1">
          {MVP_WATCH_PROVIDERS.map((p) => (
            <label key={p.id} className={labelClass}>
              <input
                type="checkbox"
                className={checkboxClass}
                checked={selectedProviders.includes(p.id)}
                onChange={() => toggleProvider(p.id)}
              />
              <span className="text-sm">{p.name}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-zinc-500">
          契約中のサービスだけ ON にすると、今すぐ観られる作品に絞れます。
        </p>
      </fieldset>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="min-h-[44px] rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          検索する
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          条件をリセット
        </button>
      </div>
    </form>
  );
}
