import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Course } from "../../types";
import { Dropzone } from "@/components/dropzone";
import { useUploadAttachment } from "../../api/use-upload-attachment";

interface AttachmentFormProps {
  initialData: Course;
  courseId: string;
}

/*const formSchema = z.object({
  url: z.string().min(1, { message: "File is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});*/

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { uploadAttachment, isPending } = useUploadAttachment();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (files: FileList) => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    uploadAttachment({ id: courseId, formData })
      .then(() => {
        toast.success("Course updated");
        toggleEdit();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      //await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isPending && (
        <div className="absolute h-full w-full bg-background/50 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 " />
        </div>
      )}
      <div className="font-medium flex items-center justify-between mb-2">
        Course attachments
        <Button variant="outline" onClick={toggleEdit} className="cursor-pointer">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">No attachemnt set</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                  <File className="h-4 w-4 mr-2 flex-shrinl-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button className="ml-auto hover:opacity-75 transition" onClick={() => onDelete(attachment.id)}>
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <Dropzone onSubmit={onSubmit} />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};
