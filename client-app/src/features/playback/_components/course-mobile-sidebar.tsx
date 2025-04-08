import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";
import { Course } from "@/features/courses/types";

interface CourseMobileSidebarProps {
  course?: Course;
  progressCount: number;
}

export const CourseMobileSidebar = ({ course, progressCount }: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ml-2 cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0 w-72">
        <SheetTitle />
        <SheetDescription />
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};
