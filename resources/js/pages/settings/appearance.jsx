import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs = [
  {
    title: 'Appearance settings',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance settings" />

      <SettingsLayout>
        <div className="settings-form">
          {/* <div className="settings-form__header">
            <h2 className="settings-form__title">Appearance settings</h2>
            <p className="settings-form__description">Update your account's appearance settings</p>
          </div> */}
          <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
