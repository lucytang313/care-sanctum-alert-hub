
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmergencyIncident } from "@/types/emergency";
import { AlertTriangle, Clock, MapPin, User, Phone, ChevronRight, PhoneCall } from "lucide-react";

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

  const getStatusBackground = (status: string) => {
    switch (status) {
      case "yet_to_attend":
        return "from-red-50 to-red-100 border-red-200";
      case "attending":
        return "from-yellow-50 to-yellow-100 border-yellow-200";
      case "attended":
        return "from-green-50 to-green-100 border-green-200";
      default:
        return "from-gray-50 to-gray-100 border-gray-200";
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "sos":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case "fire_alarm":
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case "smoke_detector":
        return <AlertTriangle className="h-6 w-6 text-gray-500" />;
      case "gas_leak":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "fall_detection":
        return <AlertTriangle className="h-6 w-6 text-blue-500" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-gray-500" />;
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

  const handleCallResident = (e: React.MouseEvent, phoneNumber: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleCallNOK = (e: React.MouseEvent, phoneNumber: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <Card className={`shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer bg-gradient-to-r ${getStatusBackground(incident.status)} border-l-4 ${incident.status === 'yet_to_attend' ? 'border-l-red-500' : incident.status === 'attending' ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
      <CardContent className="p-0">
        <Link to={`/emergency/${incident.id}`} className="block">
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm">
                  {getIncidentIcon(incident.incidentType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 truncate">
                        {getIncidentTypeLabel(incident.incidentType)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`px-3 py-1 text-sm font-medium border ${getStatusColor(incident.status)} flex-shrink-0`}>
                          {incident.status === "yet_to_attend" ? "URGENT" : 
                           incident.status === "attending" ? "IN PROGRESS" : "RESOLVED"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(incident.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0 mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-700">
                        <User className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="font-medium truncate">{incident.residentName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="font-medium">{incident.flatNumber}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm">{incident.phoneNumber}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-700">
                        <PhoneCall className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm">NOK: {incident.nokPhone}</span>
                      </div>
                    </div>
                  </div>
                  
                  {incident.description && (
                    <p className="text-sm text-slate-600 mb-4 bg-white/50 p-3 rounded-lg">
                      {incident.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Action Buttons */}
        <div className="px-4 pb-4 flex gap-2 border-t border-white/50 pt-3">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => handleCallResident(e, incident.phoneNumber)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Resident
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={(e) => handleCallNOK(e, incident.nokPhone)}
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Call NOK
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
