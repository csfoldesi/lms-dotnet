import { useGetCourseList } from "../courses/api/use-get-course-list";
import { DataTable } from "../courses/_components/course-list/data-table";
import { columns } from "../courses/_components/course-list/columns";

export const CourseList = () => {
  const { data: courseList } = useGetCourseList({});

  if (!courseList) return null;

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courseList} />
    </div>
  );
};
