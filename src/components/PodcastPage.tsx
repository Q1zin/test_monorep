import { useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import type { Episode } from "./AudioPlayer";
import { PodcastEpisodeCard } from "./PodcastEpisodeCard";

const EPISODES: Episode[] = [
  {
    id: 1,
    title: "Введение в мир подкастов",
    author: "Алексей Смирнов",
    description:
      "В этом выпуске мы рассказываем о том, что такое подкасты и как они изменили медиапространство за последние 10 лет. Разбираем форматы, платформы и истории успеха.",
    duration: "42:10",
    date: "25 марта 2026",
    audioUrl: "",
    cover: "https://picsum.photos/seed/pod1/80/80",
  },
  {
    id: 2,
    title: "Технологии будущего: AI и общество",
    author: "Мария Козлова",
    description:
      "Глубокое погружение в тему искусственного интеллекта и его влияния на нашу повседневную жизнь. Что изменилось, что изменится и к чему готовиться уже сейчас.",
    duration: "58:30",
    date: "28 марта 2026",
    audioUrl: "",
    cover: "https://picsum.photos/seed/pod2/80/80",
  },
  {
    id: 3,
    title: "Стартап-культура: мифы и реальность",
    author: "Дмитрий Волков",
    description:
      "Разбираемся, как на самом деле устроена жизнь стартаперов и что скрывается за историями успеха. Честный разговор о провалах, деньгах и команде.",
    duration: "36:45",
    date: "31 марта 2026",
    audioUrl: "",
    cover: "https://picsum.photos/seed/pod3/80/80",
  },
  {
    id: 4,
    title: "Удалённая работа: новая норма",
    author: "Екатерина Новикова",
    description:
      "Обсуждаем плюсы и минусы удалённой работы, советы по продуктивности и организации пространства. Как не потерять себя, работая из дома.",
    duration: "51:20",
    date: "1 апреля 2026",
    audioUrl: "",
    cover: "https://picsum.photos/seed/pod4/80/80",
  },
  {
    id: 5,
    title: "Открытый код: сообщество против корпораций",
    author: "Игорь Белов",
    description:
      "Почему open-source движение важнее, чем кажется, и как небольшие сообщества разработчиков конкурируют с техногигантами.",
    duration: "47:05",
    date: "4 апреля 2026",
    audioUrl: "",
    cover: "https://picsum.photos/seed/pod5/80/80",
  },
];

export function PodcastPage() {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  return (
    <div className="podcast-page">
      <header className="podcast-header">
        <div className="podcast-header__badge">ПОДКАСТ</div>
        <h1 className="podcast-header__title">Tech Волна</h1>
        <p className="podcast-header__subtitle">
          Еженедельные разговоры о технологиях, стартапах и цифровом будущем
        </p>
        <div className="podcast-header__stats">
          <span className="podcast-header__stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h3V3h-6z" />
            </svg>
            {EPISODES.length} эпизодов
          </span>
          <span className="podcast-header__stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
            </svg>
            Каждую неделю
          </span>
          <span className="podcast-header__stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
            </svg>
            Тысячи слушателей
          </span>
        </div>
      </header>

      <section className="episode-list">
        <h2 className="episode-list__heading">Все эпизоды</h2>
        {EPISODES.map(ep => (
          <PodcastEpisodeCard
            key={ep.id}
            episode={ep}
            isActive={currentEpisode?.id === ep.id}
            onPlay={setCurrentEpisode}
          />
        ))}
      </section>

      <AudioPlayer
        episode={currentEpisode}
        episodes={EPISODES}
        onEpisodeChange={setCurrentEpisode}
      />
    </div>
  );
}
