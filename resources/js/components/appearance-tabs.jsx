import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';

export default function AppearanceToggleTab({ className = '', ...props }) {
  const { appearance, updateAppearance } = useAppearance();

  const tabs = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className={cn('appearance-tabs', className)} {...props}>
      {tabs.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => updateAppearance(value)}
          className={cn(
            'appearance-tabs__button',
            appearance === value
              ? 'appearance-tabs__button--active'
              : 'appearance-tabs__button--inactive',
          )}
        >
          <Icon className="appearance-tabs__icon" />
          <span className="appearance-tabs__label">{label}</span>
        </button>
      ))}
    </div>
  );
}
