# Tech Волна — Podcast App

React + Bun приложение с подкаст-страницей, аудиоплеером и авторизацией.

## Требования

- [Bun](https://bun.sh) v1.0+

## Установка

```bash
bun install
```

## Запуск

**Режим разработки** (с горячей перезагрузкой):

```bash
bun dev
```

Откройте http://localhost:3000

**Продакшн-сборка:**

```bash
bun run build
```

Файлы окажутся в папке `dist/`.

**Запуск продакшн-сервера:**

```bash
bun start
```

## Страницы

| Путь | Описание |
|---|---|
| `/` | Подкаст-страница со списком эпизодов и аудиоплеером |
| `/login` | Страница входа |
| `/register` | Страница регистрации |

## Структура

```
src/
  App.tsx                      # роутинг
  frontend.tsx                 # точка входа React
  index.css                    # все стили
  components/
    PodcastPage.tsx            # главная страница подкастов
    PodcastEpisodeCard.tsx     # карточка эпизода
    AudioPlayer.tsx            # фиксированный плеер снизу
    LoginPage.tsx              # страница входа
    RegisterPage.tsx           # страница регистрации
```
