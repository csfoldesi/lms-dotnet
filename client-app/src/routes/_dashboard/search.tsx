import { useGetCategories } from "@/features/courses/api/use-get-categories";
import { useGetCourseList } from "@/features/courses/api/use-get-course-list";
import { Categories } from "@/features/search/_components/categories";
import { CoursesList } from "@/features/search/_components/courses-list";
import { SearchInput } from "@/features/search/_components/search-input";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  categoryId: z.string().catch(""),
  title: z.string().catch(""),
});

export const Route = createFileRoute("/_dashboard/search")({
  component: SearchPage,
  validateSearch: searchSchema,
});

function SearchPage() {
  const { categoryId, title } = Route.useSearch();
  const { data: categories } = useGetCategories();
  const { data: courses } = useGetCourseList({ categoryId, title });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
