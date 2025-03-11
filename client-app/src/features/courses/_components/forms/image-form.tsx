import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Course } from "../../types";
import { Dropzone } from "@/components/dropzone";
import { useUploadCourseImage } from "../../api/use-upload-course-image";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { uploadCourseImage, isPending } = useUploadCourseImage();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (files: FileList) => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    uploadCourseImage({ id: courseId, formData })
      .then(() => {
        toast.success("Course updated");
        toggleEdit();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isPending && (
        <div className="absolute h-full w-full bg-background/50 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 " />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button variant="outline" onClick={toggleEdit} className="cursor-pointer">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-5">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img alt="Upload" className="object-cover rounded-md" src={initialData.imageUrl!} />
          </div>
        ))}
      {isEditing && (
        <div>
          <Dropzone onSubmit={onSubmit} />
          <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  );
};
