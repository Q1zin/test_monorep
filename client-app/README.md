# client-app monorepo

Монорепа на базе **pnpm workspaces** + **Turborepo**. Содержит React-приложение и общие пакеты.

## Структура

```
apps/
  web/          — React-приложение (@podcast/web)
packages/
  types/        — TypeScript-типы (@podcast/types)
  ui/           — React-компоненты (@podcast/ui)
  core/         — хуки, стор, API-клиент (@podcast/core)
```

## Требования

- [pnpm](https://pnpm.io) ≥ 10
- [bun](https://bun.sh) ≥ 1

## Установка зависимостей

Выполнить один раз из корня `client-app/`:

```bash
pnpm install
```

## Запуск в режиме разработки

```bash
pnpm dev
```

Запускает `turbo dev` — поднимает dev-сервер `apps/web` через Bun с горячей перезагрузкой.

Приложение доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Сборка для продакшена

```bash
pnpm build
```

Запускает `turbo build` — собирает все пакеты в правильном порядке зависимостей. Артефакты появятся в `apps/web/dist/`.

## Запуск продакшен-сборки

```bash
cd apps/web && bun start
```

## Работа с отдельным пакетом

```bash
# только web-приложение
pnpm --filter @podcast/web dev
```

## Добавление зависимости

```bash
# в конкретный пакет
pnpm --filter @podcast/web add react-query

# в корень (devDependency для всей монорепы)
pnpm add -D -w typescript
```
