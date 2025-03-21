import { Course } from "@/features/courses/types";
import { CourseProgress } from "./course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
//import { CourseSidebarItem } from "./course-sidebar-item";
//import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  course?: Course;
  progressCount: number;
}

export const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const purchase = false;

  if (!course) return null;

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="flex flex-col p-8 border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
