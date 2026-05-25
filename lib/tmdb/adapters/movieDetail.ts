import { MAX_CAST_COUNT, WATCH_REGION } from '../config';
import type {
  CastMember,
  Genre,
  MovieDetail,
  Provider,
  Trailer,
  WatchProvidersJP,
} from '../types';

type TmdbVideo = {
  key?: string;
  site?: string;
  type?: string;
  name?: string;
};

type TmdbProviderRaw = {
  provider_id?: number;
  provider_name?: string;
  logo_path?: string | null;
};

type TmdbRegionProviders = {
  link?: string;
  flatrate?: TmdbProviderRaw[];
  rent?: TmdbProviderRaw[];
  buy?: TmdbProviderRaw[];
};

type TmdbMovieDetailRaw = {
  id?: number;
  title?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  runtime?: number | null;
  release_date?: string;
  vote_average?: number;
  genres?: { id?: number; name?: string }[];
  credits?: { cast?: TmdbCastRaw[] };
  videos?: { results?: TmdbVideo[] };
  'watch/providers'?: {
    results?: Record<string, TmdbRegionProviders>;
  };
};

type TmdbCastRaw = {
  id?: number;
  name?: string;
  character?: string;
  profile_path?: string | null;
};

function toProvider(item: TmdbProviderRaw): Provider | null {
  if (item.provider_id == null || !item.provider_name) {
    return null;
  }
  return {
    id: item.provider_id,
    name: item.provider_name,
    logoPath: item.logo_path ?? null,
  };
}

function mapProviders(items: TmdbProviderRaw[] | undefined): Provider[] {
  return (items ?? [])
    .map(toProvider)
    .filter((p): p is Provider => p !== null);
}

function toWatchProvidersJP(raw: TmdbMovieDetailRaw): WatchProvidersJP {
  const region =
    raw['watch/providers']?.results?.[WATCH_REGION] ?? {};

  return {
    link: region.link ?? null,
    flatrate: mapProviders(region.flatrate),
    rent: mapProviders(region.rent),
    buy: mapProviders(region.buy),
  };
}

function pickTrailer(videos: TmdbVideo[] | undefined): Trailer | null {
  if (!videos?.length) {
    return null;
  }

  const youtube = videos.filter(
    (v) => v.site?.toLowerCase() === 'youtube' && v.key
  );

  const trailer =
    youtube.find((v) => v.type === 'Trailer') ??
    youtube.find((v) => v.type === 'Teaser');

  if (!trailer?.key) {
    return null;
  }

  return {
    key: trailer.key,
    site: trailer.site ?? 'YouTube',
    type: trailer.type ?? 'Trailer',
    name: trailer.name ?? '',
  };
}

function toCastMember(member: TmdbCastRaw): CastMember | null {
  if (member.id == null || !member.name) {
    return null;
  }
  return {
    id: member.id,
    name: member.name,
    character: member.character ?? '',
    profilePath: member.profile_path ?? null,
  };
}

export function toMovieDetail(raw: unknown): MovieDetail {
  const data = raw as TmdbMovieDetailRaw;

  if (data.id == null) {
    throw new Error('Invalid TMDB movie detail: missing id');
  }

  const genres: Genre[] = (data.genres ?? [])
    .filter((g) => g.id != null && g.name)
    .map((g) => ({ id: g.id!, name: g.name! }));

  const cast = (data.credits?.cast ?? [])
    .slice(0, MAX_CAST_COUNT)
    .map(toCastMember)
    .filter((c): c is CastMember => c !== null);

  return {
    id: data.id,
    title: data.title ?? '',
    overview: data.overview ?? '',
    posterPath: data.poster_path ?? null,
    backdropPath: data.backdrop_path ?? null,
    runtime: data.runtime ?? null,
    releaseDate: data.release_date ?? null,
    voteAverage: data.vote_average ?? 0,
    genres,
    cast,
    trailer: pickTrailer(data.videos?.results),
    watchProviders: toWatchProvidersJP(data),
  };
}
