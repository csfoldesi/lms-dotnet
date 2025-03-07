import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { Course } from "../../types";
import { useUpdateCourse } from "../../api/use-update-course";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options?: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Category is required" }),
});

export const CategoryForm = ({ initialData, courseId, options = [] }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateCourse } = useUpdateCourse();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: initialData?.categoryId || "" },
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

  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button variant="outline" onClick={toggleEdit} className="cursor-pointer">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "mt-2",
            initialData.categoryId && "font-semibold",
            !initialData.categoryId && "text-slate-500 italic"
          )}>
          {selectedOption?.label || "No category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Combobox options={options} {...field} />
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
