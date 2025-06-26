import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

export function UserMenuContent({ user }) {
  const cleanup = useMobileNavigation();

  const handleLogout = () => {
    cleanup();
    router.flushAll();
  };

  return (
    <>
      <DropdownMenuLabel className="user-menu-content__label">
        <div className="user-menu-content__user-info">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link className="user-menu-content__link" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
            <Settings className="user-menu-content__icon" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link className="user-menu-content__link" method="post" href={route('logout')} as="button" onClick={handleLogout}>
          <LogOut className="user-menu-content__icon" />
          Log out
        </Link>
      </DropdownMenuItem>
    </>
  );
}
