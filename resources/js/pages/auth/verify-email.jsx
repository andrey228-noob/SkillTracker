import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
      <Head title="Email verification" />

      <div className="auth-form__description">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
        link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' && (
        <div className="auth-form__status auth-form__status--success">
          A new verification link has been sent to the email address you provided during registration.
        </div>
      )}

      <form className="auth-form" onSubmit={submit}>
        <div className="auth-form__actions">
          <Button className="auth-form__submit auth-form__submit--verify" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Resend Verification Email
          </Button>

          <TextLink
            href={route('logout')}
            method="post"
            as="button"
            className="auth-form__link auth-form__link--logout"
          >
            Log Out
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}
