
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
            alt="Logo" 
            className="h-8 w-8 rounded"
          />
          <div>
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#3d007d] to-[#ba48b3] bg-clip-text text-transparent">
              Emergency Dashboard
            </h1>
            <p className="text-sm text-gray-600 hidden lg:block">Real-time incident monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};
