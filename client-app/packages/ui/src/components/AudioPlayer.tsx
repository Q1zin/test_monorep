import { useRef, useState, useEffect } from "react";
import type { Episode } from "@podcast/types";

interface AudioPlayerProps {
  episode: Episode | null;
  episodes: Episode[];
  onEpisodeChange: (episode: Episode) => void;
}

export function AudioPlayer({ episode, episodes, onEpisodeChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (!audioRef.current) return;
    if (episode?.audioUrl) {
      audioRef.current.src = episode.audioUrl;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [episode?.id]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current || !episode) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (episode) {
      const idx = episodes.findIndex(ep => ep.id === episode.id);
      if (idx < episodes.length - 1) onEpisodeChange(episodes[idx + 1]!);
    }
  };

  const handlePrev = () => {
    if (!episode) return;
    const idx = episodes.findIndex(ep => ep.id === episode.id);
    if (idx > 0) onEpisodeChange(episodes[idx - 1]!);
  };

  const handleNext = () => {
    if (!episode) return;
    const idx = episodes.findIndex(ep => ep.id === episode.id);
    if (idx < episodes.length - 1) onEpisodeChange(episodes[idx + 1]!);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {episode ? (
        <>
          <div className="audio-player__info">
            <img src={episode.cover} alt={episode.title} className="audio-player__cover" />
            <div className="audio-player__meta">
              <div className="audio-player__title">{episode.title}</div>
              <div className="audio-player__author">{episode.author}</div>
            </div>
          </div>

          <div className="audio-player__center">
            <div className="audio-player__controls">
              <button className="audio-player__btn" onClick={handlePrev} title="Предыдущий">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </button>

              <button className="audio-player__btn audio-player__btn--play" onClick={togglePlay}>
                {isPlaying ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button className="audio-player__btn" onClick={handleNext} title="Следующий">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
                </svg>
              </button>
            </div>

            <div className="audio-player__progress-section">
              <span className="audio-player__time">{formatTime(currentTime)}</span>
              <div className="audio-player__progress-track">
                <div
                  className="audio-player__progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
                <input
                  type="range"
                  className="audio-player__progress"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  step={0.1}
                  onChange={handleSeek}
                />
              </div>
              <span className="audio-player__time">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="audio-player__volume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              className="audio-player__volume-slider"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
            />
          </div>
        </>
      ) : (
        <div className="audio-player__empty">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" opacity="0.4">
            <path d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h3V3h-6z" />
          </svg>
          <span>Выберите эпизод для воспроизведения</span>
        </div>
      )}
    </div>
  );
}
