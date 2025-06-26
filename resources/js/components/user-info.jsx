import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

export function UserInfo({ user, showEmail = false }) {
  const getInitials = useInitials();

  return (
    <>
      <Avatar className="user-info__avatar">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="user-info__fallback">{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="user-info__content">
        <span className="user-info__name">{user.name}</span>
        {showEmail && <span className="user-info__email">{user.email}</span>}
      </div>
    </>
  );
}
