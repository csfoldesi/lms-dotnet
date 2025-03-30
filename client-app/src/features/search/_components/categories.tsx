import { IconType } from "react-icons/lib";
import { Suspense } from "react";
import { Category } from "@/features/courses/types";
import { CategoryItem } from "./category-item";
import { Bike, Calculator, Camera, Cog, Film, MonitorSmartphone, Music2 } from "lucide-react";

interface CategoriesProps {
  items?: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: Music2,
  Photography: Camera,
  Fitness: Bike,
  Accounting: Calculator,
  "Computer Science": MonitorSmartphone,
  Filming: Film,
  Engineering: Cog,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 w-full justify-center md:justify-start">
      <Suspense>
        {items?.map((item) => (
          <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
        ))}
      </Suspense>
    </div>
  );
};
