/** @format */

export interface Plan {
	id: string;
	key: any;
	thumbnail: string;
	author: Author;
	title: string;
	description: string;
	image: string;
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
