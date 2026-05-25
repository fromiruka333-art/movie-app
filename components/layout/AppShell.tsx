'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type AppShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: '/', label: 'ホーム' },
  { href: '/search', label: '検索' },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 lg:gap-2">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`min-h-[44px] rounded-lg px-4 py-3 text-sm font-medium transition ${
              active
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <p className="mt-4 px-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        検索画面でジャンル・上映時間・サブスクを絞り込めます。
      </p>
    </nav>
  );
}

export default function AppShell({ children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="メニューを開く"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-200 lg:hidden dark:border-zinc-700"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="text-lg" aria-hidden>
                ☰
              </span>
            </button>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Movie Pick
            </Link>
          </div>
          <p className="hidden text-sm text-zinc-500 sm:block dark:text-zinc-400">
            今夜観る一本を、すばやく。
          </p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <NavLinks />
        </aside>

        <main className="min-w-0 flex-1 break-words">{children}</main>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="メニューを閉じる"
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl dark:bg-zinc-950">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">メニュー</span>
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] rounded-lg border border-zinc-200 dark:border-zinc-700"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <NavLinks onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
