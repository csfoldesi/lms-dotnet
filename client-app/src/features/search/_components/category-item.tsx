import { cn } from "@/lib/utils";
import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import qs from "query-string";
import { IconType } from "react-icons/lib";
import { z } from "zod";

interface CategoryItemProps {
  label: string;
  icon?: IconType;
  value?: string;
}

const searchSchema = z.object({
  categoryId: z.string().catch(""),
  title: z.string().catch(""),
});

export const Route = createFileRoute("/_dashboard/search")({
  validateSearch: searchSchema,
});

export const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId: currentCetegoryId, title: currentTitle }: { categoryId: string; title: string } =
    Route.useSearch();

  const isSelected = currentCetegoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    navigate({ to: url });
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}>
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
