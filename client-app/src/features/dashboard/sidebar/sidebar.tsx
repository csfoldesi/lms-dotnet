import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export type SidebarType = "default" | "teacher";

type SidebarProps = {
  type?: SidebarType;
};

export const Sidebar = ({ type = "default" }: SidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes type={type} />
      </div>
    </div>
  );
};
