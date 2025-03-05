import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCreateCourse } from "../courses/api/use-create-course";
import { useAuth } from "@clerk/clerk-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export const CreateCourse = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const { createCourse } = useCreateCourse();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createCourse({
      userId: userId!,
      title: values.title,
    })
      .then((course) => {
        navigate({ to: "/teacher/courses/$courseId", params: { courseId: course.id } });
        toast.success("Course created");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name yout course</h1>
        <p className="text-sm">What would you like to name yout course? Don&apos;t worry, you can change it later.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. 'Advanced web development" {...field} />
                  </FormControl>
                  <FormDescription>What will you teach in this course?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link to="/teacher/courses">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
