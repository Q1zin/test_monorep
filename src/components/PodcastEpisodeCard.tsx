import type { Episode } from "./AudioPlayer";

interface PodcastEpisodeCardProps {
  episode: Episode;
  isActive: boolean;
  onPlay: (episode: Episode) => void;
}

export function PodcastEpisodeCard({ episode, isActive, onPlay }: PodcastEpisodeCardProps) {
  return (
    <div className={`episode-card${isActive ? " episode-card--active" : ""}`}>
      <img src={episode.cover} alt={episode.title} className="episode-card__cover" />

      <div className="episode-card__body">
        <div className="episode-card__meta">
          <span className="episode-card__date">{episode.date}</span>
          <span className="episode-card__duration">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            {episode.duration}
          </span>
        </div>
        <h3 className="episode-card__title">{episode.title}</h3>
        <p className="episode-card__author">{episode.author}</p>
        <p className="episode-card__description">{episode.description}</p>
      </div>

      <button
        className={`episode-card__play-btn${isActive ? " episode-card__play-btn--active" : ""}`}
        onClick={() => onPlay(episode)}
        title={isActive ? "Воспроизводится" : "Слушать"}
      >
        {isActive ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
