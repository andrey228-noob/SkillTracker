import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
      <Head title="Log in" />

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
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="auth-form__field">
            <div className="auth-form__field-header">
              <Label htmlFor="password">Password</Label>
              {canResetPassword && (
                <TextLink href={route('password.request')} className="auth-form__forgot-link" tabIndex={5}>
                  Forgot password?
                </TextLink>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
            />
            <InputError message={errors.password} />
          </div>

          <div className="auth-form__checkbox-container">
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onClick={() => setData('remember', !data.remember)}
              tabIndex={3}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button type="submit" className="auth-form__submit" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Log in
          </Button>
        </div>

        <div className="auth-form__footer">
          Don't have an account?{' '}
          <TextLink href={route('register')} tabIndex={5}>
            Sign up
          </TextLink>
        </div>
      </form>

      {status && <div className="auth-form__status">{status}</div>}
    </AuthLayout>
  );
}
