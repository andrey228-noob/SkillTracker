import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function AuthCardLayout({
  children,
  title,
  description,
}) {
  return (
    <div className="auth-card-layout">
      <div className="auth-card-layout__container">
        <Link href={route('home')} className="auth-card-layout__logo-link">
          <div className="auth-card-layout__logo-container">
            <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
          </div>
        </Link>

        <div className="auth-card-layout__content">
          <Card className="rounded-xl">
            <CardHeader className="px-10 pt-8 pb-0 text-center">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-10 py-8">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
