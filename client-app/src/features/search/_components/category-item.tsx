import { Button } from "@/components/ui/button";
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
    <Button
      variant={isSelected ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className={cn(
        "rounded-full transition-colors cursor-pointer",
        "h-9 w-9 p-0 sm:h-9 sm:w-auto sm:px-3",
        isSelected && "bg-primary text-primary-foreground"
      )}>
      {Icon && <Icon className="h-4 w-4 sm:mr-0 flex-shrink-0" />}
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
};
