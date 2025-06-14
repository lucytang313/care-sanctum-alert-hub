
export type IncidentType = 
  | "sos" 
  | "fire_alarm" 
  | "smoke_detector" 
  | "gas_leak" 
  | "fall_detection";

export type IncidentStatus = 
  | "yet_to_attend" 
  | "attending" 
  | "attended";

export interface EmergencyIncident {
  id: string;
  residentName: string;
  phoneNumber: string;
  flatNumber: string;
  incidentType: IncidentType;
  nokPhone: string;
  timestamp: Date;
  status: IncidentStatus;
  description?: string;
}

export interface Society {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface DashboardStats {
  yetToAttend: number;
  attending: number;
  attended: number;
  total: number;
}
