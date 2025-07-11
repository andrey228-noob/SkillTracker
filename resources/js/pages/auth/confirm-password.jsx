// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/shared/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout
      title="Подтвердите ваш пароль"
      description="Это защищенная зона приложения. Пожалуйста, подтвердите ваш пароль перед продолжением."
    >
      <Head title="Подтверждение пароля" />

      <form onSubmit={submit}>
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Пароль"
              autoComplete="current-password"
              value={data.password}
              autoFocus
              onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} />
          </div>

          <div className="flex items-center">
            <Button className="w-full" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Подтвердить пароль
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}