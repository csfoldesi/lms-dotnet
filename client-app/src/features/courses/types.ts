import { Chapter } from "./chapters/types";

export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished?: boolean;
  categoryId?: string;
  category?: string;
  chapters: Chapter[];
  attachments: Attachment[];
};

export type Category = {
  id: string;
  name: string;
};

export type Attachment = {
  id: string;
  url: string;
  name: string;
};
