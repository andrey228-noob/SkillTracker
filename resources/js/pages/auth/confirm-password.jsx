// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm < Required({
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
      title="Confirm your password"
      description="This is a secure area of the application. Please confirm your password before continuing."
    >
      <Head title="Confirm password" />

      <form className="auth-form" onSubmit={submit}>
        <div className="auth-form__grid">
          <div className="auth-form__field">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              autoFocus
              onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} />
          </div>

          <div className="auth-form__actions">
            <Button className="auth-form__submit auth-form__submit--confirm" disabled={processing}>
              {processing && <LoaderCircle className="auth-form__spinner" />}
              Confirm password
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
