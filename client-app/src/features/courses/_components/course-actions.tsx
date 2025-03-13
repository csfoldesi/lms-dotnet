import { ConfirmModal } from "@/components/confirm-modal";
//import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { usePublishCourse } from "../api/use-publish-course";
import { useUnpublishCourse } from "../api/use-unpublish-course";

interface ActionsProps {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
}

export const CourseActions = ({ courseId, isPublished, disabled }: ActionsProps) => {
  const navigate = useNavigate();
  const confetti = useConfettiStore();
  const { publishCourse, isPending: isPublishing } = usePublishCourse();
  const { unpublishCourse, isPending: isUnpublishing } = useUnpublishCourse();

  const isLoading = isPublishing || isUnpublishing;

  const onDelete = async () => {
    /*setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      navigate({ to: "/teacher/courses" });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }*/
  };

  const onTogglePublish = async () => {
    if (isPublished) {
      unpublishCourse({ id: courseId })
        .then(() => {
          toast.success("Course unpublished");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } else {
      publishCourse({ id: courseId })
        .then(() => {
          toast.success("Course published");
          confetti.onOpen();
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
