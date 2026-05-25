/** MVP: 日本向け主要サブスク（TMDB provider_id） */
export type WatchProviderOption = {
  id: number;
  name: string;
};

export const MVP_WATCH_PROVIDERS: WatchProviderOption[] = [
  { id: 8, name: 'Netflix' },
  { id: 119, name: 'Amazon Prime Video' },
  { id: 84, name: 'U-NEXT' },
  { id: 337, name: 'Disney Plus' },
  { id: 55, name: 'Hulu' },
];
