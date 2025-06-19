import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { EmergencyAlertItem } from "@/components/EmergencyAlertItem";
import { StatsCards } from "@/components/StatsCards";
import { FilterControls } from "@/components/FilterControls";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
  
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesType = typeFilter === "all" || incident.incidentType === typeFilter;
    const matchesDate = incident.timestamp.toDateString() === selectedDate.toDateString();
    return matchesStatus && matchesType && matchesDate;
  });
  
  const todayIncidents = incidents.filter(incident => incident.timestamp.toDateString() === new Date().toDateString());
  
  const getStatusCounts = () => {
    return {
      yetToAttend: todayIncidents.filter(i => i.status === "yet_to_attend").length,
      attending: todayIncidents.filter(i => i.status === "attending").length,
      attended: todayIncidents.filter(i => i.status === "attended").length,
      total: todayIncidents.length
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fd6ed0]/5 to-[#ba48b3]/10">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-73px)] relative">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:relative z-50 lg:z-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
          h-full
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile header with menu button */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)} className="flex items-center space-x-2 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
              <span>Menu</span>
            </Button>
          </div>

          <div className="flex-1 p-2 md:p-4 lg:p-8 overflow-auto bg-slate-100">
            {/* Today's Overview Section */}
            <div className="mb-3 lg:mb-6">
              <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-4">Today's Overview</h2>
              <StatsCards stats={getStatusCounts()} />
            </div>

            {/* Filters Section */}
            <div className="mb-3 lg:mb-6">
              <FilterControls
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>

            {/* Emergency Alerts Section */}
            <div className="mb-6 lg:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Emergency Alerts
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">
                    {filteredIncidents.length} incident{filteredIncidents.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#3d007d] to-[#ba48b3] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-sm font-medium text-center lg:text-left text-sm md:text-base">
                  Jun 14, 2025
                </div>
              </div>
            </div>
            
            {filteredIncidents.length === 0 ? (
              <div className="text-center py-12 lg:py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gray-500">📋</span>
                </div>
                <div className="text-xl font-medium text-gray-700 mb-2">No incidents found</div>
                <p className="text-gray-500 max-w-md mx-auto px-4">
                  {selectedDate.toDateString() === new Date().toDateString() 
                    ? "All clear for today! No emergency incidents to report." 
                    : "No incidents recorded for the selected date."}
                </p>
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-4">
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
