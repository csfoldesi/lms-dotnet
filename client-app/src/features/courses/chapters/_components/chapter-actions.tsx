import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { usePublishChapter } from "../api/use-publish-chapter";
import { useUnpublishChapter } from "../api/use-unpublish-chapter";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteChapter } from "../api/use-delete-chapter";

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
  const { deleteChapter, isPending: isDeleting } = useDeleteChapter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this chapter?",
    "You are about to delete this chapter. This action is irreversible."
  );

  const isLoading = isPublishing || isUnpublishing || isDeleting;

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteChapter({ chapterId, courseId })
      .then(() => {
        toast.success("Chapter deleted");
        navigate({ to: "/teacher/courses/$courseId", params: { courseId } });
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
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
      <ConfirmDialog />
      <Button size="sm" disabled={isLoading} onClick={onDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
