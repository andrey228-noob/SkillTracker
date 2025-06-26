import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs = [
  {
    title: 'Password settings',
    href: '/settings/password',
  },
];

export default function Password() {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Password settings" />

      <SettingsLayout>
        <div className="settings-form">
          {/* <div className="settings-form__header">
            <h2 className="settings-form__title">Update password</h2>
            <p className="settings-form__description">Ensure your account is using a long, random password to stay secure</p>
          </div> */}
          <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

          <form onSubmit={updatePassword} className="settings-form__form">
            <div className="settings-form__field">
              <Label htmlFor="current_password">Current password</Label>

              <Input
                id="current_password"
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="Current password"
              />

              <InputError message={errors.current_password} />
            </div>

            <div className="settings-form__field">
              <Label htmlFor="password">New password</Label>

              <Input
                id="password"
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                type="password"
                className="settings-form__input"
                autoComplete="new-password"
                placeholder="New password"
              />

              <InputError message={errors.password} />
            </div>

            <div className="settings-form__field">
              <Label htmlFor="password_confirmation">Confirm password</Label>

              <Input
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                type="password"
                className="settings-form__input"
                autoComplete="new-password"
                placeholder="Confirm password"
              />

              <InputError message={errors.password_confirmation} />
            </div>

            <div className="settings-form__actions">
              {/* <Button className="settings-form__submit" disabled={processing}>Save password</Button> */}
              <Button disabled={processing}>Save password</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="settings-form__status">Saved</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
