import { cn } from '@/lib/utils';

export default function InputError({ message, className = '', ...props }) {
  return message ? (
    <p {...props} className={cn('input-error', className)}>
      {message}
    </p>
  ) : null;
}
