"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  url?: string | null | undefined;
  courseId: string;
  chapterId?: string;
  nextChapterId?: string;
  title: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

export const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  url,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  //const [isReady, setIsReady] = useState(false);
  const confetti = useConfettiStore();
  const navigate = useNavigate();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        if (nextChapterId) {
          navigate({ to: "/courses/$courseId/chapters/$chapterId", params: { courseId, chapterId: nextChapterId } });
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!url) return null;

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <video controls key={url} className="w-full">
          <source src={url} type="video/mp4" />
          <p>
            Your browser doesn't support HTML video. Here is a <a href={url}>link to the video</a>
            instead.
          </p>
        </video>
      )}
    </div>
  );
};
