'use client';

import { useState } from 'react';
import SearchFilters from './SearchFilters';
import type { SearchFilters as SearchFiltersType } from '@/lib/search/params';
import type { Genre } from '@/lib/tmdb/types';

type SearchFiltersDrawerProps = {
  genres: Genre[];
  initialFilters: SearchFiltersType;
};

export default function SearchFiltersDrawer({
  genres,
  initialFilters,
}: SearchFiltersDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 flex min-h-[44px] w-full items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-medium shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
      >
        検索条件を変更
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="閉じる"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl dark:bg-zinc-950">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">検索条件</h2>
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] rounded-lg border border-zinc-200 dark:border-zinc-700"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <SearchFilters
              genres={genres}
              initialFilters={initialFilters}
              onApplied={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
