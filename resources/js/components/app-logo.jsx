import AppLogoIcon from '@/components/shared/app-logo-icon';

export default function AppLogo() {
  return (
    <>
      {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <AppLogoIcon className="fill-current text-white dark:text-black" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">SkillTracker</span>
      </div> */}
      <div className="flex items-center gap-2">
        <AppLogoIcon />
        <span className="font-semibold text-lg text-black dark:text-white">Skilltracker</span>
      </div>
    </>
  );
}
