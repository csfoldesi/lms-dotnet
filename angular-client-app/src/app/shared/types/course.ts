import { Attachment, Chapter } from '.';

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
  isPurchased?: boolean;
  userProgress: number;
};
