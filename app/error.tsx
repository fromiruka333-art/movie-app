'use client';

import AppShell from '@/components/layout/AppShell';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppShell>
      <div className="mx-auto max-w-md space-y-4 py-12 text-center">
        <h1 className="text-xl font-bold">データの取得に失敗しました</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          通信エラーが発生しました。接続を確認してから再試行してください。
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          再試行
        </button>
      </div>
    </AppShell>
  );
}
