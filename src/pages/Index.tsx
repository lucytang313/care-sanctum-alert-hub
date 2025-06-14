
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { EmergencyAlertItem } from "@/components/EmergencyAlertItem";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";

// Mock data for demonstration
const mockIncidents: EmergencyIncident[] = [
  {
    id: "1",
    residentName: "Mrs. Priya Sharma",
    phoneNumber: "+91 *****210",
    flatNumber: "A-101",
    incidentType: "sos",
    nokPhone: "+91 *****211",
    timestamp: new Date("2024-06-13T10:20:00"),
    status: "yet_to_attend",
    description: "Emergency SOS button pressed"
  },
  {
    id: "2",
    residentName: "Mr. Rajesh Kumar",
    phoneNumber: "+91 *****212",
    flatNumber: "B-205",
    incidentType: "fire_alarm",
    nokPhone: "+91 *****213",
    timestamp: new Date("2024-06-13T09:50:00"),
    status: "attending",
    description: "Fire alarm triggered in kitchen"
  },
  {
    id: "3",
    residentName: "Mrs. Sunita Gupta",
    phoneNumber: "+91 *****214",
    flatNumber: "C-302",
    incidentType: "fall_detection",
    nokPhone: "+91 *****215",
    timestamp: new Date("2024-06-13T09:20:00"),
    status: "attended",
    description: "Fall detected in bedroom"
  }
];

const Index = () => {
  const [incidents] = useState<EmergencyIncident[]>(mockIncidents);
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<IncidentType | "all">("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesType = typeFilter === "all" || incident.incidentType === typeFilter;
    const matchesDate = incident.timestamp.toDateString() === selectedDate.toDateString();
    
    return matchesStatus && matchesType && matchesDate;
  });

  const todayIncidents = incidents.filter(
    incident => incident.timestamp.toDateString() === new Date().toDateString()
  );

  const getStatusCounts = () => {
    return {
      yetToAttend: todayIncidents.filter(i => i.status === "yet_to_attend").length,
      attending: todayIncidents.filter(i => i.status === "attending").length,
      attended: todayIncidents.filter(i => i.status === "attended").length,
      total: todayIncidents.length
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar
          stats={getStatusCounts()}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Emergency Alerts ({filteredIncidents.length})
              </h1>
              <div className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium">
                Jun 13, 2025
              </div>
            </div>
          </div>
          
          {filteredIncidents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No incidents found</div>
              <p className="text-gray-500 mt-2">
                {selectedDate.toDateString() === new Date().toDateString() 
                  ? "All clear for today!" 
                  : "No incidents for the selected date."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <EmergencyAlertItem key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
