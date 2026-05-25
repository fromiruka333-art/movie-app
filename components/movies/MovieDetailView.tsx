import Image from 'next/image';
import Link from 'next/link';
import { YOUTUBE_EMBED_BASE } from '@/lib/tmdb/config';
import { getTmdbImageUrl } from '@/lib/tmdb/image';
import type { MovieDetail, Provider } from '@/lib/tmdb/types';

type MovieDetailViewProps = {
  movie: MovieDetail;
};

function ProviderList({
  title,
  providers,
}: {
  title: string;
  providers: Provider[];
}) {
  if (providers.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {providers.map((p) => {
          const logo = getTmdbImageUrl(p.logoPath);
          return (
            <li
              key={p.id}
              className="flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded"
                />
              ) : null}
              <span className="break-words">{p.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function MovieDetailView({ movie }: MovieDetailViewProps) {
  const posterUrl = getTmdbImageUrl(movie.posterPath);
  const backdropUrl = getTmdbImageUrl(movie.backdropPath, 'original');
  const hasProviders =
    movie.watchProviders.flatrate.length > 0 ||
    movie.watchProviders.rent.length > 0 ||
    movie.watchProviders.buy.length > 0;

  const runtimeLabel =
    movie.runtime != null ? `${movie.runtime}分` : '上映時間不明';

  return (
    <article className="space-y-8">
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← 一覧に戻る
      </Link>

      {backdropUrl ? (
        <div className="relative -mx-4 h-40 overflow-hidden rounded-xl sm:mx-0 sm:h-56">
          <Image
            src={backdropUrl}
            alt=""
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-zinc-950 dark:via-zinc-950/70" />
        </div>
      ) : null}

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="relative mx-auto aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-xl bg-zinc-100 shadow-lg sm:w-56 md:mx-0 dark:bg-zinc-800">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="224px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              No Image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <h1 className="break-words text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            {movie.title}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {movie.releaseDate ?? '公開日不明'} · {runtimeLabel} · ★{' '}
            {movie.voteAverage.toFixed(1)}
          </p>
          {movie.genres.length > 0 ? (
            <p className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {g.name}
                </span>
              ))}
            </p>
          ) : null}
          <p className="break-words text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {movie.overview || 'あらすじはありません。'}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">予告編</h2>
        {movie.trailer?.key ? (
          <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-black">
            <iframe
              title={movie.trailer.name || `${movie.title} 予告編`}
              src={`${YOUTUBE_EMBED_BASE}${movie.trailer.key}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-sm text-zinc-500">予告編はありません。</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">配信・レンタル（日本）</h2>
        {hasProviders ? (
          <div className="space-y-4">
            <ProviderList
              title="見放題"
              providers={movie.watchProviders.flatrate}
            />
            <ProviderList title="レンタル" providers={movie.watchProviders.rent} />
            <ProviderList title="購入" providers={movie.watchProviders.buy} />
            {movie.watchProviders.link ? (
              <a
                href={movie.watchProviders.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                配信情報を詳しく見る（JustWatch）
              </a>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            現在、日本向けの配信情報は見つかりませんでした。
          </p>
        )}
      </section>

      {movie.cast.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">キャスト</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {movie.cast.map((member) => (
              <li
                key={member.id}
                className="break-words rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
              >
                <span className="font-medium">{member.name}</span>
                {member.character ? (
                  <span className="text-zinc-500"> — {member.character}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
