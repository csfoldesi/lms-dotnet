import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { usePublishCourse } from "../api/use-publish-course";
import { useUnpublishCourse } from "../api/use-unpublish-course";
import { useConfirm } from "@/hooks/use-confirm";

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
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this course?",
    "You are about to delete this course. This action is irreversible."
  );

  const isLoading = isPublishing || isUnpublishing;

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    console.log("deleting course");

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
      <ConfirmDialog />
      <Button size="sm" disabled={isLoading} onClick={onDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
