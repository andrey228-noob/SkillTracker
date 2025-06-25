import { cn } from '@/lib/utils';

export function Icon({ iconNode: IconComponent, className, ...props }) {
  return <IconComponent className={cn('icon', className)} {...props} />;
}
