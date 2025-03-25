import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { IconBadge } from "@/components/icon-badge";
import { Link } from "@tanstack/react-router";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
  id: string;
  chapterId: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number;
  isPurchased: boolean;
  category?: string;
}

export const CourseCard = ({
  id,
  chapterId,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress = 0,
  isPurchased,
  category,
}: CourseCardProps) => {
  return (
    <Link to="/courses/$courseId/chapters/$chapterId" params={{ courseId: id, chapterId }}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <img className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-ld md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-xs md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="small" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {isPurchased ? (
            <CourseProgress value={progress} size="sm" variant={progress === 100 ? "success" : "default"} />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">{formatPrice(price)}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
