
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmergencyIncident } from "@/types/emergency";
import { AlertTriangle, Clock, MapPin, User, ChevronRight } from "lucide-react";

interface EmergencyAlertItemProps {
  incident: EmergencyIncident;
}

export const EmergencyAlertItem = ({ incident }: EmergencyAlertItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "yet_to_attend":
        return "bg-red-100 text-red-700 border-red-200";
      case "attending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "attended":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "sos":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "fire_alarm":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "smoke_detector":
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
      case "gas_leak":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "fall_detection":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getIncidentTypeLabel = (type: string) => {
    switch (type) {
      case "sos":
        return "SOS Emergency";
      case "fire_alarm":
        return "Fire Alarm";
      case "smoke_detector":
        return "Smoke Detected";
      case "gas_leak":
        return "Gas Leak";
      case "fall_detection":
        return "Fall Detected";
      default:
        return type;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Link to={`/emergency/${incident.id}`} className="block">
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md hover:bg-white/90 transition-all duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {getIncidentIcon(incident.incidentType)}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-slate-800 truncate">{getIncidentTypeLabel(incident.incidentType)}</h3>
                  <Badge className={`px-2 py-1 text-xs font-medium border ${getStatusColor(incident.status)} flex-shrink-0`}>
                    {incident.status === "yet_to_attend" ? "Urgent" : 
                     incident.status === "attending" ? "In Progress" : "Resolved"}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{incident.residentName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{incident.flatNumber}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{formatTime(incident.timestamp)}</span>
                  </div>
                </div>
                
                {incident.description && (
                  <p className="text-sm text-slate-500 mt-2 line-clamp-1">{incident.description}</p>
                )}
              </div>
            </div>
            
            <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
