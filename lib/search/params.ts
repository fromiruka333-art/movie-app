export type SearchFilters = {
  genreIds: number[];
  maxRuntime?: number;
  year?: number;
  providerIds: number[];
  page: number;
};

export type SearchPageParams = {
  genre?: string;
  maxRuntime?: string;
  year?: string;
  providers?: string;
  page?: string;
};

function parseIds(value: string | undefined): number[] {
  if (!value?.trim()) {
    return [];
  }
  return value
    .split(',')
    .map((s) => Number.parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
}

function parsePositiveInt(value: string | undefined): number | undefined {
  if (!value?.trim()) {
    return undefined;
  }
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 1) {
    return undefined;
  }
  return n;
}

export function parseSearchFilters(
  params: SearchPageParams
): SearchFilters {
  return {
    genreIds: parseIds(params.genre),
    maxRuntime: parsePositiveInt(params.maxRuntime),
    year: parsePositiveInt(params.year),
    providerIds: parseIds(params.providers),
    page: parsePositiveInt(params.page) ?? 1,
  };
}

export function hasActiveFilters(filters: SearchFilters): boolean {
  return (
    filters.genreIds.length > 0 ||
    filters.maxRuntime != null ||
    filters.year != null ||
    filters.providerIds.length > 0
  );
}

export function buildSearchQuery(filters: SearchFilters): string {
  const qs = new URLSearchParams();

  if (filters.genreIds.length > 0) {
    qs.set('genre', filters.genreIds.join(','));
  }
  if (filters.maxRuntime != null) {
    qs.set('maxRuntime', String(filters.maxRuntime));
  }
  if (filters.year != null) {
    qs.set('year', String(filters.year));
  }
  if (filters.providerIds.length > 0) {
    qs.set('providers', filters.providerIds.join(','));
  }
  if (filters.page > 1) {
    qs.set('page', String(filters.page));
  }

  return qs.toString();
}
