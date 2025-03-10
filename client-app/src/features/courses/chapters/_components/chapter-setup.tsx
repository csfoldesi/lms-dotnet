import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { Banner } from "@/components/banner";
import { useCourseId } from "@/hooks/use-course-id";
import { useChapterId } from "@/hooks/use-chapter-id";
import { useGetChapter } from "../api/use-get-chapter";
import { Link } from "@tanstack/react-router";
import { ChapterActions } from "./chapter-actions";
import { ChapterTitleForm } from "./chapter-title-form";
import { ChapterDescriptionForm } from "./chapter-description-form";
import { ChapterAccessForm } from "./chapter-access-form";

export const ChapterSetup = () => {
  const courseId = useCourseId();
  const chapterId = useChapterId();
  const { data: chapter } = useGetChapter(chapterId);

  if (!chapter) {
    return null;
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner variant="warning" label="This chapter is unpublished. It will not be visible in this course." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              to="/teacher/courses/$courseId"
              params={{ courseId }}
              className="flex items-center text-sm hover:opacity-75 transition mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter creation</h1>
                <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            <ChapterDescriptionForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            ChapterVideoForm
          </div>
        </div>
      </div>
    </>
  );
};
