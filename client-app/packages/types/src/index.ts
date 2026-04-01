export interface Episode {
  id: number;
  title: string;
  author: string;
  description: string;
  duration: string;
  date: string;
  audioUrl: string;
  cover: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  author: string;
  cover: string;
  episodes: Episode[];
}
