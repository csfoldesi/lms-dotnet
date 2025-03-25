import { Button } from "@/components/ui/button";
import { CourseMobileSidebar } from "@/features/playback/_components/course-mobile-sidebar";
import { CourseSidebar } from "@/features/playback/_components/course-sidebar";
import { useGetCourse } from "@/features/playback/api/use-get-course";
import { useCourseId } from "@/hooks/use-course-id";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/courses_")({
  component: RouteComponent,
});

function RouteComponent() {
  const courseId = useCourseId();
  const { data: course, isLoading } = useGetCourse(courseId);
  const navigate = useNavigate();

  /*useEffect(() => {
    if (isLoading || !course || course.chapters.length === 0) return;
    navigate({ to: "/courses/$courseId/chapters/$chapterId", params: { courseId, chapterId: course.chapters[0].id } });
  }, [isLoading, course, navigate, courseId]);*/

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
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
