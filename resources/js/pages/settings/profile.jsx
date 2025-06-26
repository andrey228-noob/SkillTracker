import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs = [
  {
    title: 'Profile settings',
    href: '/settings/profile',
  },
];

export default function Profile({ mustVerifyEmail, status }) {
  const { auth } = usePage().props;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: auth.user.name,
    email: auth.user.email,
  });

  const submit = (e) => {
    e.preventDefault();

    patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div className="settings-form">
          <HeadingSmall title="Profile information" description="Update your name and email address" />

          <form onSubmit={submit} className="settings-form__form">
            <div className="settings-form__field">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                className="settings-form__input"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                autoComplete="name"
                placeholder="Full name"
              />

              <InputError className="settings-form__error" message={errors.name} />
            </div>

            <div className="settings-form__field">
              <Label htmlFor="email">Email address</Label>

              <Input
                id="email"
                type="email"
                className="settings-form__input"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoComplete="username"
                placeholder="Email address"
              />

              <InputError className="settings-form__error" message={errors.email} />
            </div>

            {mustVerifyEmail && auth.user.email_verified_at === null && (
              <div>
                <p className="settings-form__unverified-text">
                  Your email address is unverified.{' '}
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="settings-form__verification-link"
                  >
                    Click here to resend the verification email.
                  </Link>
                </p>

                {status === 'verification-link-sent' && (
                  <div className="settings-form__success-message">A new verification link has been sent to your email address.</div>
                )}
              </div>
            )}

            <div className="settings-form__actions">
              <Button disabled={processing}>Save</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="settings-form__saved-text">Saved</p>
              </Transition>
            </div>
          </form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}



// import { Transition } from '@headlessui/react';
// import { Head, Link, useForm, usePage } from '@inertiajs/react';

// import DeleteUser from '@/components/delete-user';
// import HeadingSmall from '@/components/heading-small';
// import InputError from '@/components/input-error';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AppLayout from '@/layouts/app-layout';
// import SettingsLayout from '@/layouts/settings/layout';

// const breadcrumbs = [
//   {
//     title: 'Profile settings',
//     href: '/settings/profile',
//   },
// ];

// export default function Profile({ mustVerifyEmail, status }) {
//   const { auth } = usePage().props;

//   const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
//     name: auth.user.name,
//     email: auth.user.email,
//   });

//   const submit = (e) => {
//     e.preventDefault();

//     patch(route('profile.update'), {
//       preserveScroll: true,
//     });
//   };

//   return (
//     <AuthenticatedLayout>
//       <Head title="Profile" />

//       <div className="settings-page">
//         <div className="settings-page__section">
//           <UpdateProfileInformationForm
//             mustVerifyEmail={mustVerifyEmail}
//             status={status}
//             className="settings-page__form"
//           />
//         </div>

//         <div className="settings-page__section">
//           <UpdatePasswordForm className="settings-page__form" />
//         </div>

//         <div className="settings-page__section">
//           <DeleteUserForm className="settings-page__form" />
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }
