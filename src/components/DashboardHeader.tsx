import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Society, Resident, EmergencyIncident } from "@/types/emergency";
import {
  Users,
  LogOut,
  Edit,
  Search,
  Home,
  Phone,
  Mail,
  ShieldAlert,
  User,
  Badge,
  Building2,
  UserCog2,
  MapPin,
  Menu,
} from "lucide-react";

// --- DATA MOCKS ---

const mockResidents: Resident[] = [
  {
    id: "res-1",
    name: "Mrs. Priya Sharma",
    age: 72,
    flatNumber: "A-101",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    avatarInitials: "PS",
    emergencyContacts: [
      { name: "Rahul Sharma", relation: "Son", phone: "+91 9876543211" },
      { name: "Neha Sharma", relation: "Daughter", phone: "+91 9876543212" },
    ],
    safetyDevices: ["sos_button", "fall_detector"],
    medicalInfo: "Allergic to penicillin. History of hypertension.",
    recentAlerts: [
        { id: "1", residentName: "Mrs. Priya Sharma", phoneNumber: "+91 *****210", flatNumber: "A-101", incidentType: "sos", nokPhone: "+91 *****211", timestamp: new Date("2025-06-14T10:20:00"), status: "attended", description: "Emergency SOS button pressed" }
    ]
  },
  {
    id: "res-2",
    name: "Mr. Rajesh Kumar",
    age: 68,
    flatNumber: "B-205",
    phone: "+91 9876543213",
    email: "rajesh.kumar@example.com",
    avatarInitials: "RK",
    emergencyContacts: [
      { name: "Anita Kumar", relation: "Wife", phone: "+91 9876543214" },
    ],
    safetyDevices: ["smoke_detector", "gas_leak_detector"],
    medicalInfo: "No known allergies.",
    recentAlerts: [
        { id: "2", residentName: "Mr. Rajesh Kumar", phoneNumber: "+91 *****212", flatNumber: "B-205", incidentType: "fire_alarm", nokPhone: "+91 *****213", timestamp: new Date("2025-06-14T09:50:00"), status: "attended", description: "Fire alarm triggered in kitchen" }
    ]
  },
  {
    id: "res-3",
    name: "Mrs. Sunita Gupta",
    age: 75,
    flatNumber: "C-302",
    phone: "+91 9876543215",
    email: "sunita.gupta@example.com",
    avatarInitials: "SG",
    emergencyContacts: [
      { name: "Sanjay Gupta", relation: "Son", phone: "+91 9876543216" },
    ],
    safetyDevices: ["fall_detector"],
    medicalInfo: "Diabetic, requires insulin twice daily.",
    recentAlerts: []
  },
];

const mockStaff = [
  {
    id: "staff-1",
    name: "Mr. Ramesh Singh",
    role: "Head Security Officer",
    phone: "+91 9876543201",
    email: "ramesh.singh@goldenheights.com",
    photoInitials: "MRS",
    department: "Security",
    tagColor: "red",
    shift: "Day Shift (8 AM - 8 PM)",
    experience: "10 years",
    joined: "Feb 2016",
    certifications: ["Electrical Safety"],
  },
  {
    id: "staff-2",
    name: "Mr. Suresh Kumar",
    role: "Security Guard",
    phone: "+91 9876543202",
    email: "suresh.kumar@goldenheights.com",
    photoInitials: "MSK",
    department: "Security",
    tagColor: "red",
    shift: "Night Shift (8 PM - 8 AM)",
    experience: "5 years",
    joined: "Nov 2018",
    certifications: [],
  },
  {
    id: "staff-3",
    name: "Mrs. Priya Sharma",
    role: "Society Manager",
    phone: "+91 9876543203",
    email: "priya.sharma@goldenheights.com",
    photoInitials: "MPS",
    department: "Administration",
    tagColor: "blue",
    shift: "Day Shift (9 AM - 6 PM)",
    experience: "7 years",
    joined: "Apr 2017",
    certifications: [],
  },
  {
    id: "staff-4",
    name: "Mr. Vikram Patel",
    role: "Maintenance Supervisor",
    phone: "+91 9876543007",
    email: "vikram.patel@goldenheights.com",
    photoInitials: "MVP",
    department: "Maintenance",
    tagColor: "green",
    shift: "Day Shift (8 AM - 5 PM)",
    experience: "10 years",
    joined: "Feb 2018",
    certifications: ["Electrical Safety", "Plumbing Certification", "HVAC Maintenance"],
  },
  {
    id: "staff-5",
    name: "Mr. Anil Gupta",
    role: "Housekeeping Supervisor",
    phone: "+91 9876543008",
    email: "anil.gupta@goldenheights.com",
    photoInitials: "MAG",
    department: "Housekeeping",
    tagColor: "purple",
    shift: "Day Shift (8 AM - 5 PM)",
    experience: "6 years",
    joined: "Mar 2019",
    certifications: [],
  },
];

const departmentColors: { [key: string]: string } = {
  Security: "bg-red-100 text-red-700 border-red-200",
  Administration: "bg-blue-100 text-blue-700 border-blue-200",
  Maintenance: "bg-green-100 text-green-700 border-green-200",
  Housekeeping: "bg-purple-100 text-purple-700 border-purple-200",
};

// --- COMPONENTS ---

const SafetyDeviceBadge = ({ device }: { device: string }) => {
  const formattedDevice = device
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <Button variant="outline" size="sm" className="cursor-default">
      {formattedDevice}
    </Button>
  );
};

// STAFF DEPARTMENT BADGE
const StaffDeptBadge = ({ department }: { department: string }) => (
  <span
    className={`border px-2 py-0.5 rounded-full text-xs font-medium ${departmentColors[department] || "bg-gray-100 text-gray-600 border-gray-300"}`}
  >
    {department}
  </span>
);

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
}

export const DashboardHeader = ({ onMobileMenuToggle }: DashboardHeaderProps) => {
  const [society, setSociety] = useState<Society>({
    id: "1",
    name: "Golden Heights Residency",
    logoUrl: undefined,
  });

  // Dialog state
  const [isSocietyInfoOpen, setIsSocietyInfoOpen] = useState(false);
  const [isResidentDirectoryOpen, setIsResidentDirectoryOpen] = useState(false);

  // Resident Directory state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    mockResidents[0]
  );

  // STAFF DIRECTORY tab state
  const [staffSearch, setStaffSearch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(mockStaff[0]);
  // Tabs for society info dialog
  const [societyInfoTab, setSocietyInfoTab] = useState("overview");
  const [staffDetailTab, setStaffDetailTab] = useState("profile");

  const filteredResidents = mockResidents.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = mockStaff.filter(
    (s) =>
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.role.toLowerCase().includes(staffSearch.toLowerCase())
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSociety((prev) => ({ ...prev, logoUrl: url }));
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* BRAND */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png"
                alt="CareStanctum"
                className="h-10 sm:h-12 w-auto transition-all duration-300 rounded-xl"
              />
              <div className="hidden md:block bg-gradient-to-r from-[#3d007d] to-[#ba48b3] text-white px-4 py-1.5 rounded-lg text-lg lg:text-xl font-extrabold tracking-tight transition-all duration-300">
                Emergency Response Dashboard
              </div>
            </div>
          </div>
          
          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMobileMenuToggle}
              className="flex items-center space-x-2 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
              <span className="hidden sm:inline">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
