import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { EmergencyAlertItem } from "@/components/EmergencyAlertItem";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, AlertTriangle, Clock, CheckCircle, Users } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock data for demonstration - using today's date
const mockIncidents: EmergencyIncident[] = [{
  id: "1",
  residentName: "Mrs. Priya Sharma",
  phoneNumber: "+91 *****210",
  flatNumber: "A-101",
  incidentType: "sos",
  nokPhone: "+91 *****211",
  timestamp: new Date("2025-06-14T10:20:00"),
  status: "yet_to_attend",
  description: "Emergency SOS button pressed"
}, {
  id: "2",
  residentName: "Mr. Rajesh Kumar",
  phoneNumber: "+91 *****212",
  flatNumber: "B-205",
  incidentType: "fire_alarm",
  nokPhone: "+91 *****213",
  timestamp: new Date("2025-06-14T09:50:00"),
  status: "attending",
  description: "Fire alarm triggered in kitchen"
}, {
  id: "3",
  residentName: "Mrs. Sunita Gupta",
  phoneNumber: "+91 *****214",
  flatNumber: "C-302",
  incidentType: "fall_detection",
  nokPhone: "+91 *****215",
  timestamp: new Date("2025-06-14T09:20:00"),
  status: "attended",
  description: "Fall detected in bedroom"
}, {
  id: "4",
  residentName: "Mr. Amit Patel",
  phoneNumber: "+91 *****216",
  flatNumber: "D-401",
  incidentType: "gas_leak",
  nokPhone: "+91 *****217",
  timestamp: new Date("2025-06-14T11:15:00"),
  status: "yet_to_attend",
  description: "Gas leak detected in kitchen area"
}, {
  id: "5",
  residentName: "Mrs. Kavita Singh",
  phoneNumber: "+91 *****218",
  flatNumber: "E-103",
  incidentType: "smoke_detector",
  nokPhone: "+91 *****219",
  timestamp: new Date("2025-06-14T08:30:00"),
  status: "attended",
  description: "Smoke detected in living room"
}, {
  id: "6",
  residentName: "Mr. Deepak Joshi",
  phoneNumber: "+91 *****220",
  flatNumber: "F-506",
  incidentType: "sos",
  nokPhone: "+91 *****221",
  timestamp: new Date("2025-06-14T12:45:00"),
  status: "attending",
  description: "Medical emergency - SOS activated"
}, {
  id: "7",
  residentName: "Mrs. Rekha Mehta",
  phoneNumber: "+91 *****222",
  flatNumber: "G-208",
  incidentType: "fall_detection",
  nokPhone: "+91 *****223",
  timestamp: new Date("2025-06-14T07:10:00"),
  status: "attended",
  description: "Fall detected in bathroom"
}, {
  id: "8",
  residentName: "Mr. Suresh Agarwal",
  phoneNumber: "+91 *****224",
  flatNumber: "H-304",
  incidentType: "fire_alarm",
  nokPhone: "+91 *****225",
  timestamp: new Date("2025-06-14T13:20:00"),
  status: "yet_to_attend",
  description: "Fire alarm activated in bedroom"
}];

const Index = () => {
  const [incidents] = useState<EmergencyIncident[]>(mockIncidents);
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<IncidentType | "all">("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesType = typeFilter === "all" || incident.incidentType === typeFilter;
    const matchesDate = incident.timestamp.toDateString() === selectedDate.toDateString();
    return matchesStatus && matchesType && matchesDate;
  });
  
  const todayIncidents = incidents.filter(incident => incident.timestamp.toDateString() === new Date().toDateString());
  
  const stats = {
    yetToAttend: todayIncidents.filter(i => i.status === "yet_to_attend").length,
    attending: todayIncidents.filter(i => i.status === "attending").length,
    attended: todayIncidents.filter(i => i.status === "attended").length,
    total: todayIncidents.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader onMobileMenuToggle={() => setIsSidebarOpen(true)} />
      
      <div className="flex h-[calc(100vh-73px)] relative">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:relative z-50 lg:z-auto
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
          h-full
          right-0 lg:right-auto lg:left-0
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            {/* Today's Overview - Redesigned */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg lg:text-xl font-semibold text-slate-800">Today's Overview</h2>
                <span className="text-sm text-slate-500">{format(new Date(), "MMM dd, yyyy")}</span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-slate-600">Urgent</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600">{stats.yetToAttend}</div>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500 opacity-70" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs font-medium text-slate-600">In Progress</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">{stats.attending}</div>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-500 opacity-70" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-slate-600">Resolved</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{stats.attended}</div>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500 opacity-70" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs font-medium text-slate-600">Total</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                      </div>
                      <Users className="h-8 w-8 text-blue-500 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Compact Filters */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-slate-800">Emergency Alerts</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-slate-600 border-slate-300"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm mb-4">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-9 text-sm border-slate-300">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="yet_to_attend">Urgent</SelectItem>
                          <SelectItem value="attending">In Progress</SelectItem>
                          <SelectItem value="attended">Resolved</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="h-9 text-sm border-slate-300">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="sos">SOS</SelectItem>
                          <SelectItem value="fire_alarm">Fire</SelectItem>
                          <SelectItem value="smoke_detector">Smoke</SelectItem>
                          <SelectItem value="gas_leak">Gas Leak</SelectItem>
                          <SelectItem value="fall_detection">Fall</SelectItem>
                        </SelectContent>
                      </Select>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="h-9 justify-start text-sm border-slate-300">
                            <Calendar className="mr-2 h-4 w-4" />
                            {format(selectedDate, "MMM dd")}
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
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Emergency Alerts List */}
            {filteredIncidents.length === 0 ? (
              <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">All Clear!</h3>
                  <p className="text-slate-500">
                    {selectedDate.toDateString() === new Date().toDateString() 
                      ? "No emergency incidents to report today." 
                      : "No incidents recorded for the selected date."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredIncidents.map(incident => (
                  <EmergencyAlertItem key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
