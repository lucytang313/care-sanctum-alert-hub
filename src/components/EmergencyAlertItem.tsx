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
  FireExtinguisher,
  AlarmSmoke,
  ShieldAlert,
  Accessibility,
  HelpCircle,
} from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const [status, setStatus] = useState<IncidentStatus>(incident.status);

  // INCORPORATE LOGO COLORS IN TYPE STRIPES
  const alertTypeColors: Record<IncidentType, string> = {
    sos: "bg-ca-purple",            // CARESANCTUM PURPLE
    fire_alarm: "bg-ca-navy",       // NAVY
    smoke_detector: "bg-ca-pink",   // PINK
    gas_leak: "bg-yellow-400",      // Lemon, to complement above
    fall_detection: "bg-ca-purple-light", // Light purple for soft contrast
  };

  // HEADER LEFT INITIALS AVATAR USES LOGO PURPLE
  // Card border & hover use navy (minimal, subtle)
  // Status Badges use accent colors and white text
  const statusColors = {
    yet_to_attend: "bg-ca-pink text-white border-ca-pink",
    attending: "bg-ca-purple text-white border-ca-purple",
    attended: "bg-ca-navy text-white border-ca-navy",
  };

  const getStatusLabel = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "Pending";
      case "attending": return "In Progress";
      case "attended": return "Resolved";
    }
  };

  // Define alert-type colored stripes & icon coloring
  const getIncidentTypeInfo = (type: IncidentType) => {
    switch (type) {
      case "sos": return { 
        label: "SOS Emergency", 
        Icon: Siren,
        borderColor: "border-red-200",
        iconColor: "text-red-500",
        accent: alertTypeColors.sos,
      };
      case "fire_alarm": return { 
        label: "Fire Alarm", 
        Icon: FireExtinguisher,
        borderColor: "border-orange-200",
        iconColor: "text-orange-500",
        accent: alertTypeColors.fire_alarm,
      };
      case "smoke_detector": return { 
        label: "Smoke Detected", 
        Icon: AlarmSmoke,
        borderColor: "border-orange-200",
        iconColor: "text-orange-400",
        accent: alertTypeColors.smoke_detector,
      };
      case "gas_leak": return { 
        label: "Gas Leak", 
        Icon: ShieldAlert,
        borderColor: "border-yellow-200",
        iconColor: "text-yellow-500",
        accent: alertTypeColors.gas_leak,
      };
      case "fall_detection": return { 
        label: "Fall Detected", 
        Icon: Accessibility,
        borderColor: "border-purple-200",
        iconColor: "text-purple-600",
        accent: alertTypeColors.fall_detection,
      };
      default: return { 
        label: "Unknown", 
        Icon: HelpCircle,
        borderColor: "border-gray-200",
        iconColor: "text-gray-500",
        accent: "bg-gray-400",
      };
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const typeInfo = getIncidentTypeInfo(incident.incidentType);

  return (
    <div className="relative group">
      {/* Vertical accent stripe for incident type (logo accent color) */}
      <div 
        className={`absolute top-0 left-0 h-full w-1.5 rounded-bl-xl rounded-tl-xl ${typeInfo.accent} group-hover:w-2 transition-all duration-300`}
        aria-hidden="true"
      ></div>
      <div
        className={`
          bg-white rounded-xl shadow-sm border border-ca-navy/10 pl-4
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden
          relative
          lg:pl-6
        `}
        style={{ marginLeft: '0.5rem' }}
      >
        <div className="p-4 lg:p-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0 mb-4">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-ca-purple to-ca-navy rounded-xl flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0">
                {getInitials(incident.residentName)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold ca-navy text-base lg:text-lg truncate">{incident.residentName}</h3>
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-1 lg:space-y-0 text-xs lg:text-sm text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 ca-navy" />
                    <span className="font-medium">{incident.flatNumber}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 ca-purple" />
                    <span>{incident.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Status Badge – LOGO COLOR background */}
            <Badge className={`border-none px-2.5 py-1 shadow-xs font-bold rounded-full text-xs lg:text-sm ${statusColors[status]}`}>
              {getStatusLabel(status)}
            </Badge>
          </div>

          {/* Incident Type Section – colored icon in accent box, uses logo color */}
          <div className="mb-4 p-3 lg:p-4 bg-ca-purple-light rounded-lg flex items-center gap-3">
            <div className={`w-9 h-9 lg:w-11 lg:h-11 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${typeInfo.accent}`}>
              <typeInfo.Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold ca-navy text-sm lg:text-base">{typeInfo.label}</span>
              {incident.description && (
                <p className="text-xs lg:text-sm text-ca-navy/80 mt-1 break-words">{incident.description}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-ca-pink-light rounded-lg">
            <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-1 xl:grid-cols-2 lg:gap-3 text-xs lg:text-sm">
              <div className="flex items-center space-x-2 min-w-0">
                <User className="h-3 w-3 lg:h-4 lg:w-4 ca-purple flex-shrink-0" />
                <span className="text-gray-600 flex-shrink-0">Resident:</span>
                <span className="font-medium ca-navy truncate">{incident.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <User className="h-3 w-3 lg:h-4 lg:w-4 ca-pink flex-shrink-0" />
                <span className="text-gray-600 flex-shrink-0">Emergency:</span>
                <span className="font-medium ca-navy truncate">{incident.nokPhone}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 min-w-0 hover:bg-ca-navy/10 hover:border-ca-navy hover:text-ca-navy transition-colors text-xs lg:text-sm h-8 lg:h-9"
              onClick={() => window.open(`tel:${incident.phoneNumber}`, '_self')}
            >
              <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ca-navy" />
              Call Resident
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 min-w-0 hover:bg-ca-pink/10 hover:border-ca-pink hover:text-ca-pink transition-colors text-xs lg:text-sm h-8 lg:h-9"
              onClick={() => window.open(`tel:${incident.nokPhone}`, '_self')}
            >
              <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ca-pink" />
              Call Emergency
            </Button>
            <Button
              size="sm"
              variant={status === "yet_to_attend" ? "default" : "outline"}
              className={`min-w-0 transition-all text-xs lg:text-sm h-8 lg:h-9 ${
                status === "yet_to_attend" 
                  ? "bg-ca-purple hover:bg-ca-pink text-white shadow-sm" 
                  : status === "attending"
                  ? "hover:bg-ca-navy/5 hover:border-ca-navy hover:text-ca-navy"
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
    </div>
  );
};
