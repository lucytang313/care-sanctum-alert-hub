
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmergencyIncident, IncidentStatus } from "@/types/emergency";
import { Phone, MapPin, Clock, AlertTriangle, User } from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const [status, setStatus] = useState<IncidentStatus>(incident.status);

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "bg-red-50 text-red-700 border-red-200";
      case "attending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "attended": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getStatusLabel = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "Pending";
      case "attending": return "In Progress";
      case "attended": return "Resolved";
    }
  };

  const getIncidentTypeInfo = (type: string) => {
    switch (type) {
      case "sos": return { 
        label: "SOS Emergency", 
        color: "bg-red-500", 
        icon: "🆘",
        borderColor: "border-red-200"
      };
      case "fire_alarm": return { 
        label: "Fire Alarm", 
        color: "bg-orange-500", 
        icon: "🔥",
        borderColor: "border-orange-200"
      };
      case "smoke_detector": return { 
        label: "Smoke Detected", 
        color: "bg-orange-400", 
        icon: "💨",
        borderColor: "border-orange-200"
      };
      case "gas_leak": return { 
        label: "Gas Leak", 
        color: "bg-yellow-500", 
        icon: "⚠️",
        borderColor: "border-yellow-200"
      };
      case "fall_detection": return { 
        label: "Fall Detected", 
        color: "bg-purple-500", 
        icon: "🚨",
        borderColor: "border-purple-200"
      };
      default: return { 
        label: "Unknown", 
        color: "bg-gray-500", 
        icon: "❓",
        borderColor: "border-gray-200"
      };
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const typeInfo = getIncidentTypeInfo(incident.incidentType);

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${typeInfo.borderColor} hover:shadow-md transition-all duration-200 overflow-hidden`}>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
              {getInitials(incident.residentName)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{incident.residentName}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{incident.flatNumber}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{incident.timestamp.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(status)} border font-medium px-3 py-1`}>
            {getStatusLabel(status)}
          </Badge>
        </div>

        {/* Incident Type Section */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-lg">{typeInfo.icon}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">{typeInfo.label}</span>
              {incident.description && (
                <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-600" />
              <span className="text-gray-600">Resident:</span>
              <span className="font-medium text-gray-900">{incident.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-600" />
              <span className="text-gray-600">Emergency Contact:</span>
              <span className="font-medium text-gray-900">{incident.nokPhone}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 min-w-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            onClick={() => window.open(`tel:${incident.phoneNumber}`, '_self')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Resident
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 min-w-0 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
            onClick={() => window.open(`tel:${incident.nokPhone}`, '_self')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Emergency Contact
          </Button>
          <Button
            size="sm"
            variant={status === "yet_to_attend" ? "default" : "outline"}
            className={`min-w-0 transition-all ${
              status === "yet_to_attend" 
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm" 
                : status === "attending"
                ? "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                : "opacity-75 cursor-not-allowed"
            }`}
            onClick={() => {
              if (status === "yet_to_attend") setStatus("attending");
              else if (status === "attending") setStatus("attended");
            }}
            disabled={status === "attended"}
          >
            {status === "yet_to_attend" 
              ? "Start Response" 
              : status === "attending" 
              ? "Mark Resolved" 
              : "Resolved ✓"}
          </Button>
        </div>
      </div>
    </div>
  );
};
