import { AppHeader } from '@/components/app-header';

export default function AppLayout({ children, breadcrumbs }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader breadcrumbs={breadcrumbs} />
      <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl">
        {children}
      </main>
    </div>
  );
}
