
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmergencyIncident, IncidentStatus, IncidentType } from "@/types/emergency";
import {
  Phone,
  MapPin,
  Clock,
  User,
  Siren,
  archive,
  bell,
  bell-off,
  call-outgoing,
} from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const [status, setStatus] = useState<IncidentStatus>(incident.status);

  // Add background color classes for status
  const statusColors = {
    yet_to_attend: "bg-red-600 text-white border-red-500",
    attending: "bg-amber-500 text-white border-amber-400",
    attended: "bg-emerald-500 text-white border-emerald-500",
  };

  const getStatusLabel = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "Pending";
      case "attending": return "In Progress";
      case "attended": return "Resolved";
    }
  };

  // Define alert-type colored stripes & icon coloring
  const alertTypeColors: Record<IncidentType, string> = {
    sos: "bg-red-600",
    fire_alarm: "bg-orange-500",
    smoke_detector: "bg-orange-400",
    gas_leak: "bg-yellow-500",
    fall_detection: "bg-purple-600",
  };

  const getIncidentTypeInfo = (type: IncidentType) => {
    switch (type) {
      case "sos": return { 
        label: "SOS Emergency", 
        Icon: Siren,
        borderColor: "border-red-200",
        iconColor: "text-red-500",
        accent: alertTypeColors.sos,
        badgeColor: "bg-red-100 text-red-800 border-red-300",
      };
      case "fire_alarm": return { 
        label: "Fire Alarm", 
        Icon: archive,
        borderColor: "border-orange-200",
        iconColor: "text-orange-500",
        accent: alertTypeColors.fire_alarm,
        badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
      };
      case "smoke_detector": return { 
        label: "Smoke Detected", 
        Icon: bell,
        borderColor: "border-orange-200",
        iconColor: "text-orange-400",
        accent: alertTypeColors.smoke_detector,
        badgeColor: "bg-orange-100 text-orange-700 border-orange-300",
      };
      case "gas_leak": return { 
        label: "Gas Leak", 
        Icon: bell-off,
        borderColor: "border-yellow-200",
        iconColor: "text-yellow-500",
        accent: alertTypeColors.gas_leak,
        badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
      };
      case "fall_detection": return { 
        label: "Fall Detected", 
        Icon: users,
        borderColor: "border-purple-200",
        iconColor: "text-purple-600",
        accent: alertTypeColors.fall_detection,
        badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      };
      default: return { 
        label: "Unknown", 
        Icon: user,
        borderColor: "border-gray-200",
        iconColor: "text-gray-500",
        accent: "bg-gray-400",
        badgeColor: "bg-gray-100 text-gray-800 border-gray-300",
      };
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const typeInfo = getIncidentTypeInfo(incident.incidentType);

  return (
    <div className="relative group">
      {/* Vertical accent stripe for incident type */}
      <div 
        className={`absolute top-0 left-0 h-full w-1.5 rounded-bl-xl rounded-tl-xl ${typeInfo.accent} group-hover:w-2 transition-all duration-300`}
        aria-hidden="true"
      ></div>
      <div
        className={`
          bg-white rounded-xl shadow-sm border border-gray-100 pl-4
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden
          relative
          lg:pl-6
        `}
        style={{ marginLeft: '0.5rem' }}
      >
        <div className="p-3 lg:p-4">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0 mb-3">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0 text-xs lg:text-sm">
                {getInitials(incident.residentName)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{incident.residentName}</h3>
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-1 lg:space-y-0 text-xs lg:text-sm text-gray-600 mt-1">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                    <span className="font-medium">{incident.flatNumber}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                    <span>{incident.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Badges Section */}
            <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
              {/* Alert Type Badge - Larger */}
              <Badge className={`border font-bold text-xs lg:text-sm px-3 py-1.5 lg:px-4 lg:py-2 ${typeInfo.badgeColor} flex items-center gap-1.5 w-full lg:w-auto justify-center lg:justify-start`}>
                <typeInfo.Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="truncate">{typeInfo.label}</span>
              </Badge>
              
              {/* Status Badge */}
              <Badge className={`border-none px-2 py-1 shadow-xs font-bold rounded-full text-xs lg:text-sm w-full lg:w-auto text-center ${statusColors[status]}`}>
                {getStatusLabel(status)}
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-3 p-2 lg:p-3 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs lg:text-sm">
              <div className="flex items-center space-x-2 min-w-0">
                <User className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 flex-shrink-0">Resident:</span>
                <span className="font-medium text-gray-900 truncate">{incident.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Action Button - Single Call Resident Button */}
          <div className="mt-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors text-xs lg:text-sm h-8 lg:h-9"
              onClick={() => window.open(`tel:${incident.phoneNumber}`, '_self')}
            >
              <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              Call Resident
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
