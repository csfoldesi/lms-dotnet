import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Link } from "@tanstack/react-router";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteCourse } from "../../api/use-delete-course";

interface ActionCellProps {
  id: string;
}

export function ActionCell({ id }: ActionCellProps) {
  const { deleteCourse, isPending: isDeleting } = useDeleteCourse();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Course",
    "Are you sure you want to delete this course? This cannot be undone."
  );

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteCourse({ id })
      .then(() => {
        toast.success("Course deleted");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center justify-end gap-x-2 w-full">
        <Link to="/teacher/courses/$courseId" params={{ courseId: id }}>
          <Hint label="Edit course">
            <Button variant="ghost" className="cursor-pointer">
              <Pencil className="h-4 w-4" />
            </Button>
          </Hint>
        </Link>
        <Hint label="Delete course">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={onDelete}
            title="Delete course"
            disabled={isDeleting}>
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        </Hint>
      </div>
    </>
  );
}
