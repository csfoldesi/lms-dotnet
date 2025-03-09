import { useCourseId } from "@/hooks/use-course-id";
import { useGetCourse } from "../api/use-get-course";
import { Banner } from "@/components/banner";
import { Actions } from "./actions";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks, File } from "lucide-react";
import { TitleForm } from "./forms/title-form";
import { DescriptionForm } from "./forms/description-form";
import { ImageForm } from "./forms/image-form";
import { CategoryForm } from "./forms/category-form";
import { ChaptersForm } from "./forms/chapters-form";
import { PriceForm } from "./forms/price-form";
import { AttachmentForm } from "./forms/attachemnt-form";
import { useGetCategories } from "../api/use-get-categories";

export const CourseSetup = () => {
  const courseId = useCourseId();
  const { data: course } = useGetCourse(courseId);
  const { data: categories } = useGetCategories();

  if (!course) return null;

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    //course.chapters.some((chapter) => chapter.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && <Banner label="This course is unpublished. It will not be visible to the students." />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">Complete all field {completionText}</span>
          </div>
          <Actions disabled={!isComplete} courseId={courseId} isPublished={course.isPublished!} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course?.id} />
            <ImageForm initialData={course} courseId={course?.id} />
            <CategoryForm
              initialData={course}
              courseId={course?.id}
              options={categories?.map((category) => ({ label: category.name, value: category.id }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm courseId={course.id} initialData={course} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
