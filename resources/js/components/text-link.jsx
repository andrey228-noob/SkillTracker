import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function TextLink({ className = '', children, ...props }) {
  return (
    <Link
      className={cn(
        'text-link',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
