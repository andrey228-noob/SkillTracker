import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';

export default function AppearanceToggleDropdown({ className = '', ...props }) {
  const { appearance, updateAppearance } = useAppearance();

  const getCurrentIcon = () => {
    switch (appearance) {
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'light':
        return <Sun className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="appearance-dropdown__button">
            {getCurrentIcon()}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => updateAppearance('light')}>
            <span className="appearance-dropdown__item">
              <Sun className="appearance-dropdown__icon" />
              Light
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('dark')}>
            <span className="appearance-dropdown__item">
              <Moon className="appearance-dropdown__icon" />
              Dark
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('system')}>
            <span className="appearance-dropdown__item">
              <Monitor className="appearance-dropdown__icon" />
              System
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
