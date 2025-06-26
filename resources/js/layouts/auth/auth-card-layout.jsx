import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

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
            <AppLogoIcon className="auth-card-layout__logo-icon" />
          </div>
        </Link>

        <div className="auth-card-layout__content">
          <Card className="auth-card-layout__card">
            <CardHeader className="auth-card-layout__card-header">
              <CardTitle className="auth-card-layout__card-title">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="auth-card-layout__card-content">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
