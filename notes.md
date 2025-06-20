## Структура шаблона Laravel + React

### 1. Основные файлы и конфигурация Laravel
*   `.editorconfig`: Конфигурация редактора для единообразия кода.
*   `.env`, `.env.example`: Переменные окружения.
*   `.gitattributes`, `.gitignore`: Конфигурация Git.
*   `README.md`: Описание проекта.
*   `artisan`: Исполняемый файл Artisan CLI.
*   `composer.json`, `composer.lock`: Управление зависимостями PHP.
*   `phpunit.xml`: Конфигурация PHPUnit для тестирования.
*   `config/`: Каталог с файлами конфигурации Laravel (app, auth, database, mail и т.д.).
*   `bootstrap/`: Файлы для начальной загрузки фреймворка.
*   `public/`: Общедоступная корневая директория веб-сервера (index.php, .htaccess, ассеты).
*   `storage/`: Хранилище для файлов, кэша, сессий, логов.
*   `vendor/`: Сторонние зависимости PHP, установленные через Composer.

### 2. Компоненты Laravel (Backend)
*   `app/`: Основной код приложения.
    *   `Http/`: Контроллеры, Middleware, Запросы.
    *   `Models/`: Модели Eloquent (например, User.php).
    *   `Providers/`: Поставщики услуг.
*   `database/`: Миграции, сиды, фабрики, база данных SQLite.
    *   `migrations/`: Схемы таблиц базы данных.
    *   `factories/`: Фабрики для создания тестовых данных.
    *   `seeders/`: Сиды для заполнения базы данных начальными данными.
*   `routes/`: Определение маршрутов приложения (web.php, auth.php, console.php, settings.php).
*   `tests/`: Тесты приложения (Feature, Unit).

### 3. Компоненты React (Frontend)
*   `package.json`, `package-lock.json`: Управление зависимостями Node.js.
*   `tsconfig.json`: Конфигурация TypeScript.
*   `eslint.config.js`: Конфигурация ESLint для JavaScript/TypeScript.
*   `vite.config.ts`: Конфигурация Vite для сборки фронтенда.
*   `resources/`: Ресурсы фронтенда.
    *   `css/`: CSS-файлы (например, app.css).
    *   `js/`: JavaScript/TypeScript файлы (подробный список см. в разделе "Подробный список файлов resources/js").
    *   `views/`: Blade-шаблоны Laravel (например, app.blade.php, используемый Inertia.js).

### 3.1 Подробный список файлов resources/js (за исключением components/ui)
*   `app.tsx`: Основной файл приложения React.
*   `components/`:
    *   `app-content.tsx`
    *   `app-header.tsx`
    *   `app-logo-icon.tsx`
    *   `app-logo.tsx`
    *   `app-shell.tsx`
    *   `app-sidebar-header.tsx`
    *   `app-sidebar.tsx`
    *   `appearance-dropdown.tsx`
    *   `appearance-tabs.tsx`
    *   `breadcrumbs.tsx`
    *   `delete-user.tsx`
    *   `heading-small.tsx`
    *   `heading.tsx`
    *   `icon.tsx`
    *   `input-error.tsx`
    *   `nav-footer.tsx`
    *   `nav-main.tsx`
    *   `nav-user.tsx`
    *   `text-link.tsx`
    *   `user-info.tsx`
    *   `user-menu-content.tsx`
*   `hooks/`:
    *   `use-appearance.tsx`
    *   `use-initials.tsx`
    *   `use-mobile-navigation.ts`
    *   `use-mobile.tsx`
*   `layouts/`:
    *   `app/`:
        *   `app-header-layout.tsx`
        *   `app-sidebar-layout.tsx`
    *   `app-layout.tsx`
    *   `auth/`:
        *   `auth-card-layout.tsx`
        *   `auth-simple-layout.tsx`
        *   `auth-split-layout.tsx`
    *   `auth-layout.tsx`
    *   `settings/`:
        *   `layout.tsx`
*   `lib/`:
    *   `utils.ts`
*   `pages/`:
    *   `auth/`:
        *   `confirm-password.tsx`
        *   `forgot-password.tsx`
        *   `login.tsx`
        *   `register.tsx`
        *   `reset-password.tsx`
        *   `verify-email.tsx`
    *   `dashboard.tsx`
    *   `settings/`:
        *   `appearance.tsx`
        *   `password.tsx`
        *   `profile.tsx`
    *   `welcome.tsx`
*   `types/`:
    *   `global.d.ts`
    *   `index.d.ts`
    *   `vite-env.d.ts`
*   `ssr.tsx`: Файл для Server-Side Rendering (SSR).

### 5. Файлы, которые можно удалить для базовой регистрации/авторизации

Следующие файлы и директории, перечисленные в разделе "Подробный список файлов resources/js", не являются строго необходимыми для минимальной реализации регистрации и авторизации. Их удаление упростит проект, оставив только базовый функционал:

*   `components/` (все файлы, кроме потенциально `input-error.tsx` если он используется для отображения ошибок форм):
    *   `app-content.tsx`
    *   `app-header.tsx`
    *   `app-logo-icon.tsx`
    *   `app-logo.tsx`
    *   `app-shell.tsx`
    *   `app-sidebar-header.tsx`
    *   `app-sidebar.tsx`
    *   `appearance-dropdown.tsx`
    *   `appearance-tabs.tsx`
    *   `breadcrumbs.tsx`
    *   `delete-user.tsx`
    *   `heading-small.tsx`
    *   `heading.tsx`
    *   `icon.tsx`
    *   `nav-footer.tsx`
    *   `nav-main.tsx`
    *   `nav-user.tsx`
    *   `text-link.tsx`
    *   `user-info.tsx`
    *   `user-menu-content.tsx`
*   `hooks/` (все файлы):
    *   `use-appearance.tsx`
    *   `use-initials.tsx`
    *   `use-mobile-navigation.ts`
    *   `use-mobile.tsx`
*   `layouts/` (файлы, не относящиеся к аутентификации):
    *   `app/` (все файлы)
    *   `app-layout.tsx`
    *   `settings/` (все файлы)
*   `pages/` (файлы, не относящиеся к аутентификации):
    *   `dashboard.tsx`
    *   `settings/` (все файлы)
    *   `welcome.tsx`
*   `ssr.tsx` (если не требуется Server-Side Rendering для аутентификации)
*   `types/` (все файлы, если их содержимое не критично для базовой аутентификации):
    *   `global.d.ts`
    *   `index.d.ts`
    *   `vite-env.d.ts`

**Примечание:** Файлы, связанные с `auth/` в `pages/` и `layouts/`, а также `app.tsx` и `lib/utils.ts` (если в нем нет специфических для аутентификации функций, которые можно перенести) должны быть сохранены.

### 4. Интеграция и прочее
*   `.github/workflows/`: Конфигурации GitHub Actions (lint.yml, tests.yml).
*   `components.json`: Возможно, конфигурация для UI-компонентов (например, Shadcn UI).
*   `.prettierignore`, `.prettierrc`: Конфигурация Prettier для форматирования кода.

]