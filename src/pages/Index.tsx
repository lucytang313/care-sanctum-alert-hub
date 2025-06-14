
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCards } from "@/components/StatsCards";
import { EmergencyIncidentCard } from "@/components/EmergencyIncidentCard";
import { FilterControls } from "@/components/FilterControls";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";

// Mock data for demonstration
const mockIncidents: EmergencyIncident[] = [
  {
    id: "1",
    residentName: "Margaret Johnson",
    phoneNumber: "+1-555-0123",
    flatNumber: "A-402",
    incidentType: "fall_detection",
    nokPhone: "+1-555-0124",
    timestamp: new Date("2024-06-14T09:30:00"),
    status: "yet_to_attend",
    description: "Fall detected in living room area"
  },
  {
    id: "2",
    residentName: "Robert Chen",
    phoneNumber: "+1-555-0125",
    flatNumber: "B-305",
    incidentType: "sos",
    nokPhone: "+1-555-0126",
    timestamp: new Date("2024-06-14T10:15:00"),
    status: "attending",
    description: "SOS button pressed - urgent assistance required"
  },
  {
    id: "3",
    residentName: "Dorothy Williams",
    phoneNumber: "+1-555-0127",
    flatNumber: "C-101",
    incidentType: "smoke_detector",
    nokPhone: "+1-555-0128",
    timestamp: new Date("2024-06-14T11:45:00"),
    status: "yet_to_attend",
    description: "Smoke detected in kitchen area"
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
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards stats={getStatusCounts()} />
        
        <FilterControls
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Emergency Incidents ({filteredIncidents.length})
          </h2>
          
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredIncidents.map((incident) => (
                <EmergencyIncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
