export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished?: boolean;
  categoryId?: string;
};
