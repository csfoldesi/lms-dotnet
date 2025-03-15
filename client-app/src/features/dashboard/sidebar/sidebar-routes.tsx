import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarType } from "./sidebar";
import { SidebarItem } from "./sidebar-item";

const defaultRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

type SidebarRoutesType = {
  type: SidebarType;
};

export const SidebarRoutes = ({ type }: SidebarRoutesType) => {
  const routes = type === "default" ? defaultRoutes : teacherRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
