import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "./dashboard-sidebar";

type SidebarType = "default" | "teacher";

type DashboarMobileSidebarProps = {
  type?: SidebarType;
};

export const DashboarMobileSidebar = ({ type = "default" }: DashboarMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ml-2 cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetDescription />
      <SheetTitle />
      <SheetContent side="left" className="p-0">
        <DashboardSidebar type={type} />
      </SheetContent>
    </Sheet>
  );
};
