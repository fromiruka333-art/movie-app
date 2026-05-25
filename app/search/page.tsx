import AppShell from '@/components/layout/AppShell';

export default function SearchPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-lg space-y-4 py-8">
        <h1 className="text-2xl font-bold">検索</h1>
        <p className="break-words text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          ジャンル・上映時間・公開年・配信サブスクによる絞り込みは、次のステップで実装予定です（Stage
          2 項目 4）。
        </p>
        <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
          準備中
        </p>
      </div>
    </AppShell>
  );
}
