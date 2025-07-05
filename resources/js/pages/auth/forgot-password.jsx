// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/shared/input-error';
import TextLink from '@/components/shared/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <AuthLayout 
      title="Восстановление пароля" 
      description="Введите ваш email для получения ссылки сброса пароля"
    >
      <Head title="Восстановление пароля" />

      {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

      <div className="space-y-6">
        <form onSubmit={submit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email адрес</Label>
            <Input
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              value={data.email}
              autoFocus
              onChange={(e) => setData('email', e.target.value)}
              placeholder="email@example.com"
            />

            <InputError message={errors.email} />
          </div>

          <div className="my-6 flex items-center justify-start">
            <Button className="w-full" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Отправить ссылку для сброса
            </Button>
          </div>
        </form>

        <div className="space-x-1 text-center text-sm text-muted-foreground">
          <span>Или вернитесь к</span>
          <TextLink href={route('login')}>авторизации</TextLink>
        </div>
      </div>
    </AuthLayout>
  );
}