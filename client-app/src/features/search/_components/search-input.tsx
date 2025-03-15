import { Search } from "lucide-react";
import { useEffect, useState } from "react";
//import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  categoryId: z.string().catch(""),
  title: z.string().catch(""),
});

export const Route = createFileRoute("/_dashboard/search")({
  validateSearch: searchSchema,
});

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const { categoryId }: { categoryId: string } = Route.useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query: { categoryId: categoryId, title: debouncedValue },
      },
      { skipEmptyString: true, skipNull: true }
    );
    navigate({ to: url });
  }, [categoryId, debouncedValue, location.pathname, navigate]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
