import AppShell from '@/components/layout/AppShell';

export default function MovieLoading() {
  return (
    <AppShell>
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="mx-auto aspect-[2/3] w-48 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-20 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="aspect-video max-w-3xl rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </AppShell>
  );
}
