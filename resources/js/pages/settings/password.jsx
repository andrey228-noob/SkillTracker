import InputError from '@/components/shared/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings-layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';

import HeadingSmall from '@/components/shared/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs = [
  {
    title: 'Настройки пароля',
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
      <Head title="Настройки пароля" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall 
            title="Обновление пароля" 
            description="Для обеспечения безопасности используйте длинный случайный пароль" 
          />

          <form onSubmit={updatePassword} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="current_password">Текущий пароль</Label>

              <Input
                id="current_password"
                ref={currentPasswordInput}
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                type="password"
                className="mt-1 block w-full"
                autoComplete="current-password"
                placeholder="Текущий пароль"
              />

              <InputError message={errors.current_password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Новый пароль</Label>

              <Input
                id="password"
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Новый пароль"
              />

              <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Подтвердите пароль</Label>

              <Input
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Подтвердите пароль"
              />

              <InputError message={errors.password_confirmation} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Сохранить пароль</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Сохранено</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}