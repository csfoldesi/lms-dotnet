import { Course } from "@/features/courses/types";
import { CourseCard } from "./course-card";

interface CoursesListProps {
  items?: Course[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items?.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            chapterId={item.chapters[0]?.id || ""}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={0}
            category={item.category}
          />
        ))}
      </div>
      {(!items || items.length === 0) && (
        <div className="text-center text-sm text-muted-foreground mt-10">No courses found</div>
      )}
    </div>
  );
};
