/** @format */

export interface Plan {
  id: string | number;
  thumbnail: string;
  author?: Author;
  title: string;
  description: string;
  image?: string;
  price: string;
  tags?: string[];
  category: string;
  content: ContentItem[];
}
export interface Author {
  name: string;
  id: string;
  email: string;
}

export interface ContentItem {
  title: string;
  message: string;
  chapterQuize: quiz[];
}
export interface quiz {
  id: string;
  question: string;
  options: answer[];
  correctAnswer: answer;
}
export interface answer {
  id: string;
  body: "";
}
export interface bookChapter {
  key: string;
  title: string;
  content: chapterContent[];
}
export interface chapterContent {
  title: string;
  body: string;
}
export interface Book {
  id: any;
  title: string;
  prologue: string;
  image: string;
  price: string;
  category: string;
  chapters: bookChapter[];
  author: string;
  publisher: string;
}
