
import { useState } from "react";
import { Calendar, X, AlertCircle, Loader2, CheckCircle2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IncidentStatus, IncidentType, DashboardStats } from "@/types/emergency";
import { format } from "date-fns";

interface SidebarProps {
  stats: DashboardStats;
  statusFilter: IncidentStatus | "all";
  setStatusFilter: (status: IncidentStatus | "all") => void;
  typeFilter: IncidentType | "all";
  setTypeFilter: (type: IncidentType | "all") => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onClose?: () => void;
}

export const Sidebar = ({
  stats,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  selectedDate,
  setSelectedDate,
  onClose,
}: SidebarProps) => {
  return (
    <div className="w-80 lg:w-80 bg-white border-r border-gray-200 h-full flex flex-col shadow-lg lg:shadow-none">
      {/* Mobile close button */}
      {onClose && (
        <div className="lg:hidden p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard Controls</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Today's Overview */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
        
        <div className="space-y-3">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Yet to be Attended</p>
                  <p className="text-xl lg:text-2xl font-bold text-red-600">{stats.yetToAttend}</p>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 lg:h-5 lg:w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Attending</p>
                  <p className="text-xl lg:text-2xl font-bold text-yellow-600">{stats.attending}</p>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Loader2 className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500 animate-spin" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Attended</p>
                  <p className="text-xl lg:text-2xl font-bold text-green-600">{stats.attended}</p>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Total Today</p>
                  <p className="text-xl lg:text-2xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <List className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 lg:p-6 flex-1 overflow-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal text-sm")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yet_to_attend">Yet to be Attended</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="attended">Attended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Issues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="sos">SOS Emergency</SelectItem>
                <SelectItem value="fire_alarm">Fire Alarm</SelectItem>
                <SelectItem value="smoke_detector">Smoke Detector</SelectItem>
                <SelectItem value="gas_leak">Gas Leak</SelectItem>
                <SelectItem value="fall_detection">Fall Detection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
