import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/shared/heading-small';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings-layout';

const breadcrumbs = [
  {
    title: 'Настройки внешнего вида',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Настройки внешнего вида" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall 
            title="Настройки внешнего вида" 
            description="Обновите параметры отображения вашей учётной записи" 
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}