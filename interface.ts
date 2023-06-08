export interface Plan {
  key: number;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
  content: ContentItem[];
  duration: number;
}

export interface ContentItem {
  title: string;
  description: string;
  message: string;
}
export interface Book {
  key: number;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
  chapters: ContentItem[];
  author: string;
  publisher: string;
}
export interface bookChapter {
  title: string;
  prologue: string;
  message: string;


}
