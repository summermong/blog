export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  thumbnail?: string;
  tags?: string[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}