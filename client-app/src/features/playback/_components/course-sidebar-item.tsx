"use client";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { CheckCircle, LockIcon, PlayCircle } from "lucide-react";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({ id, label, isCompleted, courseId, isLocked }: CourseSidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const Icon = isLocked ? LockIcon : isCompleted ? CheckCircle : PlayCircle;

  const isActive = location.pathname.includes(id);

  const onClick = () => {
    navigate({ to: "/courses/$courseId/chapters/$chapterId", params: { courseId, chapterId: id } });
  };

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 border-r-4 border-transparent cursor-pointer",
        isActive && "bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700 border-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700 border-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
      onClick={onClick}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-slate-700", isCompleted && "text-emerald-700")}
        />
        {label}
      </div>
    </button>
  );
};
