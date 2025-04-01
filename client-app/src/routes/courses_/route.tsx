import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/_components/user-button";
import { CourseMobileSidebar } from "@/features/playback/_components/course-mobile-sidebar";
import { CourseSidebar } from "@/features/playback/_components/course-sidebar";
import { useGetCourse } from "@/features/playback/api/use-get-course";
import { useCourseId } from "@/hooks/use-course-id";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/courses_")({
  component: RouteComponent,
});

function RouteComponent() {
  const courseId = useCourseId();
  const { data: course } = useGetCourse(courseId);

  return (
    <div className="h-fll">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <div className="flex justify-end items-center h-full pr-4 bg-background">
          <CourseMobileSidebar course={course} progressCount={course?.userProgress ?? 0} />
          <div className="flex-1" />
          <Link to="/search">
            <Button size="sm" variant="ghost" className="cursor-pointer mr-2">
              <LogOut className="h-4 w-4 mr-2" />
              Exit course
            </Button>
          </Link>
          <UserButton />
        </div>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={course?.userProgress ?? 0} />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
}
