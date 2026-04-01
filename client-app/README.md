# client-app monorepo

Монорепа на базе **pnpm workspaces** + **Turborepo**. Содержит веб-приложение, десктоп-приложение на Tauri и общие пакеты. Оба приложения рендерят один и тот же UI из `@podcast/ui`.

## Структура

```
apps/
  web/          — веб-приложение (@podcast/web, Bun + React)
  desktop/      — десктопное приложение (@podcast/desktop, Tauri + Vite + React)
packages/
  ui/           — React-компоненты, App, стили (@podcast/ui)
  types/        — TypeScript-типы (@podcast/types)
  core/         — хуки, стор, API-клиент (@podcast/core)
```

## Требования

| Инструмент | Версия  | Зачем |
|------------|---------|-------|
| [pnpm](https://pnpm.io) | ≥ 10 | управление монорепой |
| [bun](https://bun.sh) | ≥ 1 | сборка и dev-сервер `apps/web` |
| [Rust + cargo](https://rustup.rs) | stable | компиляция Tauri |
| [Node.js](https://nodejs.org) | ≥ 20 | Vite для `apps/desktop` |

> Rust устанавливается через `rustup`: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

## Установка зависимостей

Выполнить один раз из корня `client-app/`:

```bash
pnpm install
```

## Веб-приложение (`apps/web`)

### Dev-сервер

```bash
pnpm dev
# или только web:
pnpm --filter @podcast/web dev
```

Приложение доступно по адресу: http://localhost:3000

### Продакшен-сборка

```bash
pnpm build
# артефакты → apps/web/dist/
```

### Запуск продакшена

```bash
cd apps/web && bun start
```

## Десктоп-приложение (`apps/desktop`, Tauri)

### Dev-режим (Vite + окно Tauri)

```bash
pnpm --filter @podcast/desktop tauri dev
```

Запускает Vite на порту `1420` и открывает нативное окно Tauri с горячей перезагрузкой.

### Сборка десктопного приложения

```bash
pnpm --filter @podcast/desktop tauri build
```

Создаёт нативный инсталлятор в `apps/desktop/src-tauri/target/release/bundle/`.

### Только Vite-сборка фронтенда (без Tauri)

```bash
pnpm --filter @podcast/desktop build
# артефакты → apps/desktop/dist/
```

## Полная сборка всего монорепа

```bash
pnpm build
```

Turborepo собирает пакеты в правильном порядке: `types` → `ui` → `web` + `desktop` параллельно.

## Как устроен общий UI

```
packages/ui/
  src/
    App.tsx          ← роутинг BrowserRouter (используется и web, и desktop)
    index.css        ← все стили
    index.ts         ← barrel-экспорт
    components/
      PodcastPage.tsx
      AudioPlayer.tsx
      PodcastEpisodeCard.tsx
      LoginPage.tsx
      RegisterPage.tsx
```

`apps/web/src/App.tsx` и `apps/desktop/src/App.tsx` оба просто реэкспортируют `App` из `@podcast/ui`. CSS подключается в точке входа каждого приложения.

## Добавление зависимости

```bash
# в конкретный пакет
pnpm --filter @podcast/web add react-query
pnpm --filter @podcast/desktop add some-tauri-plugin

# в корень (devDependency для всей монорепы)
pnpm add -D -w typescript
```

