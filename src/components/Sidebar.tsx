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
          <Card className="bg-red-50 shadow-none border-0">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Yet to be Attended</p>
                <p className="text-2xl font-bold text-red-600">{stats.yetToAttend}</p>
              </div>
              <AlertCircle className="h-7 w-7 text-red-500" />
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 shadow-none border-0">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Attending</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.attending}</p>
              </div>
              <Loader2 className="h-7 w-7 text-yellow-500" />
            </CardContent>
          </Card>

          <Card className="bg-green-50 shadow-none border-0">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Attended</p>
                <p className="text-2xl font-bold text-green-600">{stats.attended}</p>
              </div>
              <CheckCircle2 className="h-7 w-7 text-green-500" />
            </CardContent>
          </Card>

          <Card className="bg-blue-50 shadow-none border-0">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Today</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <List className="h-7 w-7 text-blue-500" />
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
