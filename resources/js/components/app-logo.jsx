import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
  return (
    <>
      <div className="app-logo">
        <AppLogoIcon className="app-logo__icon app-logo__icon--dark" />
      </div>
      <div className="app-logo__text">
        <span className="app-logo__title">Laravel Starter Kit</span>
      </div>
    </>
  );
}
