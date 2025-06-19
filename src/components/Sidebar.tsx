
import { X, User, Users, Archive, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "/",
    },
    { 
      icon: Users, 
      label: "Resident Directory", 
      href: "/residents",
    },
    { 
      icon: Archive, 
      label: "Society Info", 
      href: "/society",
    },
    { 
      icon: LogOut, 
      label: "Sign Out", 
      href: "/login",
    }
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80'} lg:w-80 bg-white border-r border-gray-200 h-full flex flex-col shadow-lg lg:shadow-none transition-all duration-300`}>
      {/* Mobile close button and collapse toggle */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-900 lg:block hidden">Navigation</h2>
        )}
        <div className="flex items-center gap-2">
          {/* Collapse toggle for desktop */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex"
          >
            {isCollapsed ? "→" : "←"}
          </Button>
          {/* Mobile close button */}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={index}
                variant="ghost"
                className={`w-full ${isCollapsed ? 'px-2' : 'justify-start'} hover:bg-gray-100 transition-colors ${
                  isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : ''
                }`}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  );
};
