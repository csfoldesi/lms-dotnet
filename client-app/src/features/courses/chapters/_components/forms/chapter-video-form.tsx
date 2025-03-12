import { Button } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Chapter } from "../../types";
import { Dropzone } from "@/components/dropzone";
import { useUploadVideo } from "../../api/use-upload-video";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterid: string;
}

/*const formSchema = z.object({
  videoUrl: z.string().min(1),
});*/

export const ChapterVideoForm = ({ initialData, courseId, chapterid }: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { uploadVideo, isPending } = useUploadVideo();

  const toggleEdit = () => setIsEditing((current) => !current);

  /*const onSubmit = async (values: { videoUrl: string }) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterid}`, values);
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };*/

  const onSubmit = async (files: FileList) => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    uploadVideo({ id: chapterid, formData })
      .then(() => {
        toast.success("Chapter updated");
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
        Chapter video
        <Button variant="outline" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <video controls key={initialData.videoUrl} className="w-full">
              <source src={initialData.videoUrl} type="video/mp4" />
              <p>
                Your browser doesn't support HTML video. Here is a <a href={initialData.videoUrl}>link to the video</a>{" "}
                instead.
              </p>
            </video>
          </div>
        ))}
      {isEditing && (
        <div>
          <Dropzone onSubmit={onSubmit} />
          <div className="text-xs text-muted-foreground mt-4">Upload this chapter&apos;s video</div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video does not appear.
        </div>
      )}
    </div>
  );
};
