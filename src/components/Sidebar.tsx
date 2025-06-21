
import { X, Users, Archive, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Reset collapsed state on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); // Always expand on mobile
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Design tokens from design.json
  const sidebarBg = "#FFFFFF";
  const sidebarBorder = "#E0E0E0";
  const sidebarRadius = 16; // px
  const headerFont = {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '24px',
    color: '#000000',
  };
  const baseitemFont = {
    fontSize: 16,
    lineHeight: '20px',
  };
  const itemFontActive = {
    ...baseitemFont,
    fontWeight: 600,
    color: '#FFFFFF',
  }
  const itemFontInactive = {
    ...baseitemFont,
    fontWeight: 400,
    color: '#111827',
  }
  const iconColor = {
    isActive: '#FFFFFF',
    isInactive: '#111827',
  }

  const iconActive = {
    size: 20,
    color: '#FFFFFF',
    strokeWidth: 3,
  }
  const iconInactive = {
    size: 20,
    color: '#111827',
    strokeWidth: 2,
  }
  const dividerColor = '#E0E0E0';
  const spacingMd = 16;
  const spacingLg = 24;

  const isMobile = window.innerWidth < 1024;
  const sidebarWidth = isMobile ? 280 : (isCollapsed ? 64 : 320);

  return (
    <div
      className={`transition-all duration-300 h-full flex flex-col shadow-lg border-r`}
      style={{
        width: sidebarWidth,
        background: sidebarBg,
        borderColor: sidebarBorder,
        borderRadius: sidebarRadius,
      }}
    >
      {/* Header with close button and collapse toggle */}
      <div
        className="flex justify-between items-center border-b"
        style={{
          borderColor: dividerColor,
          padding: spacingMd,
          paddingLeft: isCollapsed && !isMobile ? spacingMd : spacingLg,
          paddingRight: isCollapsed && !isMobile ? spacingMd : spacingLg,
        }}
      >
        {(!isCollapsed || isMobile) && (
          <h2
            className="truncate"
            style={headerFont}
          >
            Navigation
          </h2>
        )}
        <div className="flex items-center gap-2">
          {/* Collapse toggle for desktop only */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex"
              style={{ color: iconColor.isInactive}}
            >
              {isCollapsed ? "→" : "←"}
            </Button>
          )}
          {/* Mobile close button */}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden" style={{ color: iconColor.isInactive}}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1" style={{ padding: spacingMd, paddingTop: spacingLg }}>
        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={index}
                variant="ghost"
                className={`w-full flex items-center transition-colors ${(isCollapsed && !isMobile) ? 'px-2 justify-center' : 'justify-start'} ${isActive ? 'bg-black text-white' : ''}`}
                style={{
                  borderRadius: sidebarRadius,
                  paddingTop: spacingMd,
                  paddingBottom: spacingMd,
                  paddingLeft: (isCollapsed && !isMobile) ? spacingMd : spacingLg,
                  paddingRight: (isCollapsed && !isMobile) ? spacingMd : spacingLg,
                  background: isActive ? '#9332a2' : 'transparent',
                }}
                asChild
              >
                <Link to={item.href} className="flex items-center w-full">
                  <item.icon className="shrink-0"
                    style={{
                      ...(isActive ? iconActive : iconInactive),
                      marginRight: (isCollapsed && !isMobile) ? 0 : 12
                    }} />
                  {(!isCollapsed || isMobile) && <span className="truncate" style={isActive ? itemFontActive : itemFontInactive}>{item.label}</span>}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  );
};
