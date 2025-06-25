import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DeleteUser() {
  const passwordInput = useRef(null);
  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
  };

  return (
    <div className="delete-user">
      <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
      <div className="delete-user__warning">
        <div className="delete-user__warning-content">
          <p className="delete-user__warning-title">Warning</p>
          <p className="delete-user__warning-text">Please proceed with caution, this cannot be undone.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
              to confirm you would like to permanently delete your account.
            </DialogDescription>
            <form className="delete-user__form" onSubmit={deleteUser}>
              <div className="delete-user__input-group">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />

                <InputError message={errors.password} />
              </div>

              <DialogFooter className="delete-user__footer">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} asChild>
                  <button type="submit">Delete account</button>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
