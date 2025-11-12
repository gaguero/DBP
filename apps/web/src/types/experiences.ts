export interface Activity {
  slug: string;
  name: string;
  summary: string;
  duration: string;
  difficulty?: string;
  suitability: string;
  image: string;
  highlights: string[];
  included?: string[];
  wildlife?: string[];
  whatToBring?: string[];
  seasonal?: boolean;
  seasonNote?: string;
}


