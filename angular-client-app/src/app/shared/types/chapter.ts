import { UserProgress } from '.';

export type Chapter = {
  id: string;
  title: string;
  position: number;
  description?: string;
  videoUrl?: string;
  videoContentType?: string;
  isPublished: boolean;
  isFree: boolean;
  userProgress: UserProgress[];
  isCompleted?: boolean;
  nextChapterId?: string;
};
