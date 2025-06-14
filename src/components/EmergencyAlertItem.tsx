
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmergencyIncident, IncidentStatus } from "@/types/emergency";
import { Phone, MapPin, Clock, AlertTriangle } from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const [status, setStatus] = useState<IncidentStatus>(incident.status);

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "bg-red-100 text-red-800";
      case "attending": return "bg-yellow-100 text-yellow-800";
      case "attended": return "bg-green-100 text-green-800";
    }
  };

  const getStatusLabel = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "Yet to be Attended";
      case "attending": return "Attending";
      case "attended": return "Attended";
    }
  };

  const getIncidentTypeInfo = (type: string) => {
    switch (type) {
      case "sos": return { label: "SOS Emergency", color: "bg-red-500", icon: "🆘" };
      case "fire_alarm": return { label: "Fire Alarm", color: "bg-orange-500", icon: "🔥" };
      case "smoke_detector": return { label: "Smoke Detected", color: "bg-orange-400", icon: "💨" };
      case "gas_leak": return { label: "Gas Leak", color: "bg-yellow-500", icon: "⚠️" };
      case "fall_detection": return { label: "Fall Detected", color: "bg-purple-500", icon: "🚨" };
      default: return { label: "Unknown", color: "bg-gray-500", icon: "❓" };
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const typeInfo = getIncidentTypeInfo(incident.incidentType);

  return (
    <div className="border-l-4 border-l-purple-500 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(incident.residentName)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{incident.residentName}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{incident.flatNumber}</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{incident.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
        <Badge className={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Badge>
      </div>

      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{typeInfo.icon}</span>
          <span className="font-medium text-gray-900">{typeInfo.label}</span>
        </div>
        {incident.description && (
          <p className="text-sm text-gray-600">{incident.description}</p>
        )}
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <div className="flex items-center space-x-4">
          <span>Resident: 📞 {incident.phoneNumber}</span>
          <span>NOK: 📞 {incident.nokPhone}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => window.open(`tel:${incident.phoneNumber}`, '_self')}
        >
          <Phone className="h-4 w-4 mr-1" />
          Call Resident
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => window.open(`tel:${incident.nokPhone}`, '_self')}
        >
          <Phone className="h-4 w-4 mr-1" />
          Call NOK
        </Button>
        <Button
          size="sm"
          variant={status === "yet_to_attend" ? "default" : "outline"}
          onClick={() => {
            if (status === "yet_to_attend") setStatus("attending");
            else if (status === "attending") setStatus("attended");
          }}
        >
          {status === "yet_to_attend" ? "Attend" : status === "attending" ? "Mark Complete" : "Completed"}
        </Button>
      </div>
    </div>
  );
};
