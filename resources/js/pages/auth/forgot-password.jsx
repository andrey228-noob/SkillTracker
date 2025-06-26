// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
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
    <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
      <Head title="Forgot password" />

      {status && <div className="auth-form__status-message">{status}</div>}

      <div className="auth-form__content">
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-form__grid">
            <div className="auth-form__field">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="off"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="email@example.com"
              />
              <InputError message={errors.email} />
            </div>

            <div className="auth-form__actions">
              <Button className="auth-form__submit auth-form__submit--forgot" disabled={processing}>
                {processing && <LoaderCircle className="auth-form__spinner" />}
                Email password reset link
              </Button>
            </div>
          </div>

          <div className="auth-form__footer">
            <span>Remember your password?</span>
            <TextLink href={route('login')}>
              Back to login
            </TextLink>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
