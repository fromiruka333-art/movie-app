/** アプリ API が返す一覧用型 */
export type MovieSummary = {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
};

export type MovieListResponse = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: MovieSummary[];
};

export type Genre = {
  id: number;
  name: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
};

export type Trailer = {
  key: string;
  site: string;
  type: string;
  name: string;
};

export type Provider = {
  id: number;
  name: string;
  logoPath: string | null;
};

export type WatchProvidersJP = {
  link: string | null;
  flatrate: Provider[];
  rent: Provider[];
  buy: Provider[];
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  runtime: number | null;
  releaseDate: string | null;
  voteAverage: number;
  genres: Genre[];
  cast: CastMember[];
  trailer: Trailer | null;
  watchProviders: WatchProvidersJP;
};
