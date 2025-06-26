import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="dashboard">
        <div className="dashboard__grid">
          <div className="dashboard__card">
            <PlaceholderPattern className="dashboard__card-pattern" />
          </div>
          <div className="dashboard__card">
            <PlaceholderPattern className="dashboard__card-pattern" />
          </div>
          <div className="dashboard__card">
            <PlaceholderPattern className="dashboard__card-pattern" />
          </div>
        </div>
        <div className="dashboard__main-content">
          <PlaceholderPattern className="dashboard__main-pattern" />
        </div>
      </div>
    </AppLayout>
  );
}
