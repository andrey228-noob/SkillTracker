import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout title="Reset password" description="Please enter your new password below">
      <Head title="Reset password" />

      <form className="auth-form" onSubmit={submit}>
        <div className="auth-form__grid">
          <div className="auth-form__field">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="auth-form__field">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="New password"
            />
            <InputError message={errors.password} />
          </div>

          <div className="auth-form__field">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="auth-form__submit auth-form__submit--reset" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
