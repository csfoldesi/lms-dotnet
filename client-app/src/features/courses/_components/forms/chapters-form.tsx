import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Course } from "../../types";
import { ChapterList } from "./chapter-list";
import { useCreateChapter } from "../../chapters/api/use-create-chapter";
import { useReorderChapters } from "../../chapters/api/use-reorder-chapters";
import { useNavigate } from "@tanstack/react-router";

interface ChaptersFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { createChapter } = useCreateChapter();
  const { reorderChapters, isPending } = useReorderChapters();
  const navigate = useNavigate();

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createChapter({ courseId, title: values.title })
      .then(() => {
        toast.success("Chapter created");
        toggleCreating();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const onReorder = async (reorderedIds: string[]) => {
    reorderChapters({ courseId, chapterIdList: reorderedIds })
      .then(() => {
        toast.success("Chapters reordered");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const onEdit = (id: string) => {
    navigate({ to: `/teacher/courses/${courseId}/chapters/${id}` });
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isPending && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button variant="outline" onClick={toggleCreating} className="cursor-pointer">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Input disabled={isSubmitting} placeholder="e.g. 'Introduction to the course'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "mt-2",
            initialData.chapters.length && "font-semibold",
            !initialData.chapters.length && "text-slate-500 italic"
          )}>
          {!initialData.chapters.length && "No chapters"}
          <ChapterList onEdit={onEdit} onReorder={onReorder} items={initialData.chapters || []} />
        </div>
      )}
      {!isCreating && <p className="text-xs text-muted-foreground mt-4">Drag and drop to reorder the chapters</p>}
    </div>
  );
};
