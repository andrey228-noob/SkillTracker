import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';

export function AppContent({ variant = 'header', children, ...props }) {
  if (variant === 'sidebar') {
    return <SidebarInset {...props}>{children}</SidebarInset>;
  }

  return (
    <main className="app-content" {...props}>
      {children}
    </main>
  );
}
