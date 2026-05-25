import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';

export default function MovieNotFound() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md space-y-4 py-12 text-center">
        <h1 className="text-xl font-bold">映画が見つかりません</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          指定された作品は存在しないか、取得できませんでした。
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          ホームに戻る
        </Link>
      </div>
    </AppShell>
  );
}
