import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

import InputError from '@/components/shared/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/shared/heading-small';

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
    <div className="space-y-6">
      <HeadingSmall 
        title="Удаление аккаунта" 
        description="Удалите ваш аккаунт и все связанные с ним данные" 
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Внимание</p>
          <p className="text-sm">Пожалуйста, действуйте осторожно, это действие необратимо.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Удалить аккаунт</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Вы уверены, что хотите удалить свой аккаунт?</DialogTitle>
            <DialogDescription>
              После удаления аккаунта все связанные с ним данные будут безвозвратно удалены. 
              Пожалуйста, введите ваш пароль для подтверждения.
            </DialogDescription>
            <form className="space-y-6" onSubmit={deleteUser}>
              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Пароль
                </Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Пароль"
                  autoComplete="current-password"
                />

                <InputError message={errors.password} />
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeModal}>
                    Отмена
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} asChild>
                  <button type="submit">Удалить аккаунт</button>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}