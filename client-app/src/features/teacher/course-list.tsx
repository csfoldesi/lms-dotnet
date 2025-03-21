import { DataTable } from "../courses/_components/course-list/data-table";
import { columns } from "../courses/_components/course-list/columns";
import { useGetTeacherCourseList } from "../courses/api/use-get-teacher-course-list";

export const CourseList = () => {
  const { data: courseList } = useGetTeacherCourseList({});

  if (!courseList) return null;

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courseList} />
    </div>
  );
};
