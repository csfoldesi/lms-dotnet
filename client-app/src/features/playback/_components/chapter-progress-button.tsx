import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateProgress } from "../api/use-update-progress";

interface CourseProgressButtonProps {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

export const ChapterProgressButton = ({
  courseId,
  chapterId,
  nextChapterId: nextChapter,
  isCompleted,
}: CourseProgressButtonProps) => {
  const navigate = useNavigate();
  const confetti = useConfettiStore();
  const { updateProgress, isPending } = useUpdateProgress();

  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {
    updateProgress({ courseId, chapterId, isCompleted: !isCompleted })
      .then(() => {
        // just completed the last chapter
        if (!isCompleted && !nextChapter) {
          confetti.onOpen();
        }
        if (!isCompleted && nextChapter) {
          navigate({ to: "/courses/$courseId/chapters/$chapterId", params: { courseId, chapterId: nextChapter } });
        }
        toast.success("Progress updated");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto cursor-pointer"
      onClick={onClick}
      disabled={isPending}>
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
