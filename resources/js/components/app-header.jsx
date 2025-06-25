import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
];

const rightNavItems = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

export function AppHeader({ breadcrumbs = [] }) {
  const page = usePage();
  const { auth } = page.props;
  const getInitials = useInitials();
  return (
    <>
      <div className="app-header">
        <div className="app-header__container">
          {/* Mobile Menu */}
          <div className="app-header__mobile-menu">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="app-header__mobile-menu-button">
                  <Menu className="app-header__mobile-menu-icon" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="app-header__mobile-sheet">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetHeader className="app-header__mobile-sheet-header">
                  <AppLogoIcon className="app-header__mobile-sheet-logo app-header__mobile-sheet-logo--dark" />
                </SheetHeader>
                <div className="app-header__mobile-sheet-content">
                  <div className="app-header__mobile-nav">
                    <div className="app-header__mobile-nav-main">
                      {mainNavItems.map((item) => (
                        <Link key={item.title} href={item.href} className="app-header__mobile-nav-item">
                          {item.icon && <Icon iconNode={item.icon} className="app-header__mobile-nav-icon" />}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="app-header__mobile-nav-secondary">
                      {rightNavItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app-header__mobile-nav-item"
                        >
                          {item.icon && <Icon iconNode={item.icon} className="app-header__mobile-nav-icon" />}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/dashboard" prefetch className="app-header__logo-link">
            <AppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="app-header__desktop-nav">
            <NavigationMenu className="app-header__nav-menu">
              <NavigationMenuList className="app-header__nav-list">
                {mainNavItems.map((item, index) => (
                  <NavigationMenuItem key={index} className="app-header__nav-item">
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        page.url === item.href && 'app-header__nav-link--active',
                        'app-header__nav-link',
                      )}
                    >
                      {item.icon && <Icon iconNode={item.icon} className="app-header__nav-link-icon" />}
                      {item.title}
                    </Link>
                    {page.url === item.href && (
                      <div className="app-header__nav-indicator app-header__nav-indicator--dark"></div>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="app-header__actions">
            <div className="app-header__actions-group">
              <Button variant="ghost" size="icon" className="app-header__search-button group">
                <Search className="app-header__search-icon" />
              </Button>
              <div className="app-header__desktop-actions">
                {rightNavItems.map((item) => (
                  <TooltipProvider key={item.title} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app-header__action-link group"
                        >
                          <span className="sr-only">{item.title}</span>
                          {item.icon && <Icon iconNode={item.icon} className="app-header__action-icon" />}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="app-header__user-menu">
                  <Avatar className="app-header__user-avatar">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback className="app-header__user-avatar-fallback app-header__user-avatar-fallback--dark">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        <div className="app-header__breadcrumbs">
          <div className="app-header__breadcrumbs-container">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}
