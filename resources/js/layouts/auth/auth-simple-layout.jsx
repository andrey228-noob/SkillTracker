import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AuthSimpleLayout({ children, title, description }) {
  return (
    <div className="auth-simple-layout">
      <div className="auth-simple-layout__container">
        <div className="auth-simple-layout__content">
          <div className="auth-simple-layout__header">
            <Link href={route('home')} className="auth-simple-layout__logo-link">
              <div className="auth-simple-layout__logo-container">
                <AppLogoIcon className="auth-simple-layout__logo-icon" />
              </div>
              <span className="sr-only">{title}</span>
            </Link>

            <div className="auth-simple-layout__title-section">
              <h1 className="auth-simple-layout__title">{title}</h1>
              <p className="auth-simple-layout__description">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
