
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmergencyIncident, IncidentStatus } from "@/types/emergency";
import { Phone, MapPin, Clock, User, AlertTriangle } from "lucide-react";

interface EmergencyIncidentCardProps {
  incident: EmergencyIncident;
}

export const EmergencyIncidentCard = ({ incident }: EmergencyIncidentCardProps) => {
  const [status, setStatus] = useState<IncidentStatus>(incident.status);

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "bg-red-100 text-red-800 border-red-200";
      case "attending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "attended": return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getStatusLabel = (status: IncidentStatus) => {
    switch (status) {
      case "yet_to_attend": return "Yet to Attend";
      case "attending": return "Attending";
      case "attended": return "Attended";
    }
  };

  const getIncidentTypeInfo = (type: string) => {
    switch (type) {
      case "sos": return { label: "SOS Alert", color: "bg-red-500", priority: "URGENT" };
      case "fire_alarm": return { label: "Fire Alarm", color: "bg-orange-500", priority: "CRITICAL" };
      case "smoke_detector": return { label: "Smoke Detector", color: "bg-orange-400", priority: "HIGH" };
      case "gas_leak": return { label: "Gas Leak", color: "bg-yellow-500", priority: "HIGH" };
      case "fall_detection": return { label: "Fall Detection", color: "bg-purple-500", priority: "URGENT" };
      default: return { label: "Unknown", color: "bg-gray-500", priority: "NORMAL" };
    }
  };

  const typeInfo = getIncidentTypeInfo(incident.incidentType);

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      status === "yet_to_attend" ? "ring-2 ring-red-200" : ""
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${typeInfo.color}`}></div>
            <span className="font-semibold text-gray-900">{typeInfo.label}</span>
            <Badge variant="secondary" className="text-xs">
              {typeInfo.priority}
            </Badge>
          </div>
          <Badge className={getStatusColor(status)}>
            {getStatusLabel(status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{incident.residentName}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>Flat {incident.flatNumber}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{incident.phoneNumber}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{incident.timestamp.toLocaleString()}</span>
          </div>
        </div>

        {incident.description && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{incident.description}</p>
            </div>
          </div>
        )}

        <div className="border-t pt-4 space-y-3">
          <div className="text-sm">
            <span className="text-gray-600">NOK Contact: </span>
            <span className="font-medium">{incident.nokPhone}</span>
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
          </div>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yet_to_attend">Yet to Attend</SelectItem>
              <SelectItem value="attending">Attending</SelectItem>
              <SelectItem value="attended">Attended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
