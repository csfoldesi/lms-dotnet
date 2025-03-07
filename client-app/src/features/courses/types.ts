export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished?: boolean;
  categoryId?: string;
};

export type Category = {
  id: string;
  name: string;
};
