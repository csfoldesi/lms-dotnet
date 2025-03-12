import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { usePublishChapter } from "../api/use-publish-chapter";
import { useUnpublishChapter } from "../api/use-unpublish-chapter";

interface ChapterActionsProps {
  courseId: string;
  chapterId: string;
  isPublished: boolean;
  disabled: boolean;
}

export const ChapterActions = ({ courseId, chapterId, isPublished, disabled }: ChapterActionsProps) => {
  const navigate = useNavigate();
  const { publishChapter, isPending: isPublishing } = usePublishChapter();
  const { unpublishChapter, isPending: isUnpublishing } = useUnpublishChapter();

  const isLoading = isPublishing || isUnpublishing;

  const onDelete = async () => {
    /*setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }*/
  };

  const onTogglePublish = async () => {
    if (isPublished) {
      unpublishChapter({ chapterId, courseId })
        .then(() => {
          toast.success("Chapter unpublished");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } else {
      publishChapter({ chapterId, courseId })
        .then(() => {
          toast.success("Chapter published");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onTogglePublish}
        disabled={disabled || isLoading}
        variant={isPublished ? "destructive" : "outline"}
        size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
