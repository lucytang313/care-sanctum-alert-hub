
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IncidentStatus, IncidentType } from "@/types/emergency";

interface FilterControlsProps {
  statusFilter: IncidentStatus | "all";
  setStatusFilter: (status: IncidentStatus | "all") => void;
  typeFilter: IncidentType | "all";
  setTypeFilter: (type: IncidentType | "all") => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const FilterControls = ({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  selectedDate,
  setSelectedDate,
}: FilterControlsProps) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "yet_to_attend": return "Yet to Attend";
      case "attending": return "Attending";
      case "attended": return "Attended";
      default: return "All Statuses";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sos": return "SOS Alert";
      case "fire_alarm": return "Fire Alarm";
      case "smoke_detector": return "Smoke Detector";
      case "gas_leak": return "Gas Leak";
      case "fall_detection": return "Fall Detection";
      default: return "All Types";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="yet_to_attend">Yet to Attend</SelectItem>
            <SelectItem value="attending">Attending</SelectItem>
            <SelectItem value="attended">Attended</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Incident Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sos">SOS Alert</SelectItem>
            <SelectItem value="fire_alarm">Fire Alarm</SelectItem>
            <SelectItem value="smoke_detector">Smoke Detector</SelectItem>
            <SelectItem value="gas_leak">Gas Leak</SelectItem>
            <SelectItem value="fall_detection">Fall Detection</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-64 justify-start text-left font-normal")}
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
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {(statusFilter !== "all" || typeFilter !== "all" || 
          selectedDate.toDateString() !== new Date().toDateString()) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("all");
              setTypeFilter("all");
              setSelectedDate(new Date());
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
