import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";

export const Courses = () => {
  return (
    <div>
      <Link to="/teacher/courses/create">
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New course
        </Button>
      </Link>
    </div>
  );
};
