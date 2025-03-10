export type Chapter = {
  id: string;
  title: string;
  position: number;
  description?: string;
  videoUrl?: string;
  isPublished: boolean;
  isFree: boolean;
  muxData?: MuxData;
};

export type MuxData = {
  assetId: string;
  playbackId?: string;
};

export type UserProgress = {
  userId: string;
  chapterId: string;
  isCompleted: boolean;
};
