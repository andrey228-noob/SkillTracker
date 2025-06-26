import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppSidebarHeader({ breadcrumbs = [] }) {
  return (
    <header className="app-sidebar-header app-sidebar-header--collapsed">
      <div className="app-sidebar-header__content">
        <SidebarTrigger className="app-sidebar-header__trigger" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </header>
  );
}
