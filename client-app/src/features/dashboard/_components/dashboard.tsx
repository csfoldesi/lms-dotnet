import { CoursesList } from "@/features/search/_components/courses-list";
import { InfoCard } from "./info-card";
import { CheckCircle, Clock } from "lucide-react";
import { useGetPurchasedCourseList } from "../api/use-get-purchased-course-list";

export const Dashboard = () => {
  const { data: courses, isLoading } = useGetPurchasedCourseList();

  const coursesInProgress = courses?.filter((course) => course.userProgress < 100);
  const completedCourses = courses?.filter((course) => course.userProgress === 100);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress?.length} />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses?.length} variant="success" />
      </div>
      <CoursesList items={[...completedCourses ?? [], ...coursesInProgress ?? []]} />
    </div>
  );
};
