import AppLogoIcon from '@/components/app-logo-icon';
import { Link, usePage } from '@inertiajs/react';

export default function AuthSplitLayout({ children, title, description }) {
  const { name, quote } = usePage().props;

  return (
    <div className="auth-split-layout">
      <div className="auth-split-layout__sidebar auth-split-layout__sidebar--dark">
        <div className="auth-split-layout__sidebar-bg" />
        <Link href={route('home')} className="auth-split-layout__sidebar-logo">
          <AppLogoIcon className="auth-split-layout__sidebar-logo-icon" />
          {name}
        </Link>
        {quote && (
          <div className="auth-split-layout__sidebar-quote">
            <blockquote className="auth-split-layout__quote">
              <p className="auth-split-layout__quote-text">&ldquo;{quote.message}&rdquo;</p>
              <footer className="auth-split-layout__quote-author">{quote.author}</footer>
            </blockquote>
          </div>
        )}
      </div>
      <div className="auth-split-layout__main">
        <div className="auth-split-layout__main-content">
          <Link href={route('home')} className="auth-split-layout__mobile-logo">
            <AppLogoIcon className="auth-split-layout__mobile-logo-icon" />
          </Link>
          <div className="auth-split-layout__header">
            <h1 className="auth-split-layout__title">{title}</h1>
            <p className="auth-split-layout__description">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
