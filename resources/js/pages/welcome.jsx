import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Skilltracker - Управление задачами и развитие навыков">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#FDFDFC] to-[#F8F8F7] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-[#0a0a0a] dark:to-[#111111]">
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f53003] text-white font-semibold text-sm">
                ST
              </div>
              <span className="font-semibold text-lg text-black dark:text-white">Skilltracker</span>
            </div>
            <div className="flex items-center gap-4">
              {auth.user ? (
                <Link
                  href={route('dashboard')}
                  className="inline-block rounded-lg border border-[#19140035] bg-white px-5 py-2 text-sm leading-normal text-[#1b1b18] shadow-sm hover:border-[#1915014a] hover:shadow-md transition-all dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                  Панель управления
                </Link>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="inline-block rounded-lg border border-transparent px-5 py-2 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] hover:bg-white/50 transition-all dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] dark:hover:bg-[#161615]/50"
                  >
                    Войти
                  </Link>
                  <Link
                    href={route('register')}
                    className="inline-block rounded-lg border border-[#19140035] bg-white px-5 py-2 text-sm leading-normal text-[#1b1b18] shadow-sm hover:border-[#1915014a] hover:shadow-md transition-all dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        
        <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
          <main className="flex w-full max-w-[335px] flex-col lg:max-w-5xl lg:flex-row lg:gap-8">
            {/* Основной контент */}
            <div className="flex-1 rounded-xl bg-white p-8 shadow-xl border border-[#e3e3e0] lg:p-12 dark:bg-[#161615] dark:border-[#3E3E3A] dark:shadow-2xl">
              <div className="mb-8">
                <h1 className="mb-4 text-3xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                  Управляйте задачами и развивайте навыки эффективно
                </h1>
                <p className="text-lg text-[#706f6c] dark:text-[#A1A09A] leading-relaxed">
                  Skilltracker поможет вам организовать рабочий процесс, назначать задачи команде и отслеживать прогресс развития навыков.
                </p>
              </div>

              <div className="grid gap-6 mb-8 lg:grid-cols-2">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f8f8f7] border border-[#e3e3e0] dark:bg-[#1a1a19] dark:border-[#3E3E3A]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f53003] text-white shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2">Назначение задач</h3>
                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                      Создавайте, назначайте и отслеживайте задачи с детальным описанием и сроками выполнения.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f8f8f7] border border-[#e3e3e0] dark:bg-[#1a1a19] dark:border-[#3E3E3A]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22c55e] text-white shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2">Развитие навыков</h3>
                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                      Отслеживайте прогресс в развитии навыков и компетенций каждого члена команды.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f8f8f7] border border-[#e3e3e0] dark:bg-[#1a1a19] dark:border-[#3E3E3A]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6] text-white shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2">Аналитика</h3>
                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                      Получайте детальные отчеты о выполнении задач и прогрессе развития навыков.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f8f8f7] border border-[#e3e3e0] dark:bg-[#1a1a19] dark:border-[#3E3E3A]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8b5cf6] text-white shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2">Командная работа</h3>
                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                      Управляйте командами, распределяйте роли и координируйте совместную работу.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={route('register')}
                  className="inline-block rounded-lg bg-[#f53003] px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#e02a00] hover:shadow-xl transition-all text-center dark:bg-[#FF4433] dark:hover:bg-[#ff3319]"
                >
                  Начать использовать
                </Link>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-6 lg:mt-0 lg:w-80">
              <div className="rounded-xl bg-white p-6 shadow-xl border border-[#e3e3e0] dark:bg-[#161615] dark:border-[#3E3E3A] dark:shadow-2xl">
                <h2 className="mb-4 font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                  Почему выбирают Skilltracker?
                </h2>
                <ul className="space-y-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#22c55e] shrink-0"></span>
                    <span>Простой и интуитивный интерфейс</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#22c55e] shrink-0"></span>
                    <span>Гибкая система управления задачами</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#22c55e] shrink-0"></span>
                    <span>Детальная аналитика и отчеты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#22c55e] shrink-0"></span>
                    <span>Отслеживание развития навыков</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#22c55e] shrink-0"></span>
                    <span>Безопасность и конфиденциальность</span>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}