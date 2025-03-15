import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive =
    (location.pathname === "/" && href === "/") ||
    location.pathname === href ||
    location.pathname.startsWith(`${href}/`);

  const onClick = () => {
    navigate({ to: href });
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 border-r-4 border-transparent cursor-pointer",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-sky-700"
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
        {label}
      </div>
    </button>
  );
};
