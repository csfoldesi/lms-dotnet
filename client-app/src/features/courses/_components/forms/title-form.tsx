import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useUpdateCourse } from "../../api/use-update-course";

interface TitleFormProps {
  initialData: { title: string };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateCourse } = useUpdateCourse();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateCourse({ id: courseId, ...values })
      .then(() => {
        toast.success("Course updated");
        toggleEdit();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button variant="outline" onClick={toggleEdit} className="cursor-pointer">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 font-semibold">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Input disabled={isSubmitting} placeholder="e.g. 'Advanced web development'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="felx items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
