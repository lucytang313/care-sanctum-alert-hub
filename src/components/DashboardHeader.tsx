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
  Security: "bg-red-100 text-red-700 border-red-300",
  Administration: "bg-blue-100 text-blue-700 border-blue-300",
  Maintenance: "bg-green-100 text-green-700 border-green-300",
  Housekeeping: "bg-purple-100 text-purple-700 border-purple-300",
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

export const DashboardHeader = () => {
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
    <header className="bg-gradient-to-b from-white via-purple-50 to-white border-b border-gray-100">
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
              <div className="hidden md:block bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white px-4 py-1.5 rounded-lg text-lg lg:text-xl font-extrabold tracking-tight transition-all duration-300">
                Emergency Response Dashboard
              </div>
            </div>
          </div>
          {/* RIGHT SIDE HEADER BUTTONS */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-3">
            {/* Resident Directory */}
            <Dialog open={isResidentDirectoryOpen} onOpenChange={setIsResidentDirectoryOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="shrink-0 hover:bg-purple-100/70 rounded-lg transition-all flex items-center gap-2 text-base font-medium"
                >
                  <Users className="h-5 w-5" />
                  <span className="hidden lg:inline ml-1">Resident Directory</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[90vw] h-[90vh] flex flex-col p-0 rounded-2xl">
                <DialogHeader className="p-4 lg:p-6 border-b">
                  <DialogTitle className="text-xl">Resident Information</DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                  {/* Left pane: Resident List */}
                  <div className="w-full lg:w-[320px] lg:border-r flex flex-col shrink-0">
                    <div className="p-4 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search by name or flat..." 
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {filteredResidents.length > 0 ? filteredResidents.map(resident => (
                        <div 
                          key={resident.id}
                          onClick={() => setSelectedResident(resident)}
                          className={`p-4 flex items-center space-x-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${selectedResident?.id === resident.id ? 'bg-purple-50' : ''}`}
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0">
                            {resident.avatarInitials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{resident.name}</p>
                            <p className="text-sm text-gray-500">Flat: {resident.flatNumber}</p>
                          </div>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-gray-500">
                          <p>No residents found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right pane: Resident Details */}
                  <div className="w-full lg:flex-1 p-4 lg:p-8 overflow-y-auto">
                    {selectedResident ? (
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-2xl shrink-0">
                            {selectedResident.avatarInitials}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{selectedResident.name}</h2>
                            <p className="text-gray-500">{selectedResident.age} years old</p>
                          </div>
                        </div>

                        <Tabs defaultValue="profile">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="medical">Medical Info</TabsTrigger>
                            <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
                          </TabsList>
                          <TabsContent value="profile" className="pt-6">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center"><User className="mr-2 h-5 w-5 text-purple-600" /> Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                  <div className="flex items-center"><Home className="w-4 h-4 mr-3 text-gray-400"/> Flat: <span className="font-medium ml-2">{selectedResident.flatNumber}</span></div>
                                  <div className="flex items-center"><Phone className="w-4 h-4 mr-3 text-gray-400"/> Phone: <span className="font-medium ml-2">{selectedResident.phone}</span></div>
                                  <div className="flex items-center"><Mail className="w-4 h-4 mr-3 text-gray-400"/> Email: <span className="font-medium ml-2">{selectedResident.email}</span></div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center"><Users className="mr-2 h-5 w-5 text-purple-600" /> Emergency Contacts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  {selectedResident.emergencyContacts.map(contact => (
                                    <div key={contact.name}>
                                      <p className="font-semibold">{contact.name} <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1">{contact.relation}</span></p>
                                      <p className="text-sm text-gray-600">{contact.phone}</p>
                                    </div>
                                  ))}
                                </CardContent>
                              </Card>
                              <Card className="xl:col-span-2">
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-purple-600" /> Safety Devices</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                  {selectedResident.safetyDevices.map(device => (
                                    <SafetyDeviceBadge key={device} device={device} />
                                  ))}
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                          <TabsContent value="medical" className="pt-6">
                             <Card>
                                <CardHeader><CardTitle>Medical Information</CardTitle></CardHeader>
                                <CardContent><p>{selectedResident.medicalInfo || "No information provided."}</p></CardContent>
                             </Card>
                          </TabsContent>
                          <TabsContent value="alerts" className="pt-6">
                            <Card>
                                <CardHeader><CardTitle>Recent Emergency Alerts</CardTitle></CardHeader>
                                <CardContent>
                                    {selectedResident.recentAlerts.length > 0 ? (
                                        <ul className="space-y-2">
                                        {selectedResident.recentAlerts.map(alert => (
                                            <li key={alert.id} className="text-sm">
                                                <p><span className="font-semibold">{alert.description}</span> on {alert.timestamp.toLocaleDateString()}</p>
                                            </li>
                                        ))}
                                        </ul>
                                    ) : (
                                        <p>No recent alerts for this resident.</p>
                                    )}
                                </CardContent>
                             </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a resident to see their details.</p>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* SOCIETY INFO DIALOG */}
            <Dialog open={isSocietyInfoOpen} onOpenChange={setIsSocietyInfoOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="shrink-0 hover:bg-purple-100/80 rounded-lg transition-all flex items-center gap-2 text-base font-medium"
                >
                  <Building2 className="h-5 w-5" />
                  <span className="hidden md:inline">Society Info</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl max-w-5xl w-[96vw] p-0 border-none shadow-xl bg-white">
                <DialogHeader className="px-8 pt-8 pb-4 border-b">
                  <DialogTitle className="text-2xl font-semibold text-[#181d24]">
                    Society Information
                  </DialogTitle>
                  <DialogDescription className="hidden" />
                </DialogHeader>
                <Tabs
                  value={societyInfoTab}
                  onValueChange={(v) => setSocietyInfoTab(v)}
                  className="px-8 pt-2"
                >
                  <TabsList className="w-full bg-[#f7fafe] rounded-md mb-6 flex justify-start">
                    <TabsTrigger value="overview" className="flex-1 !rounded-md text-[17px] font-medium data-[state=active]:bg-white data-[state=active]:text-primary">
                      Society Overview
                    </TabsTrigger>
                    <TabsTrigger value="staff" className="flex-1 !rounded-md text-[17px] font-medium data-[state=active]:bg-white data-[state=active]:text-primary">
                      Staff Directory
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1 !rounded-md text-[17px] font-medium data-[state=active]:bg-white data-[state=active]:text-primary">
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  {/* SOCIETY OVERVIEW */}
                  <TabsContent value="overview">
                    <div className="grid sm:grid-cols-2 gap-6 pb-6">
                      {/* Society Details Card */}
                      <div className="rounded-xl border bg-white p-7 flex flex-col gap-3 min-w-0">
                        <h3 className="font-semibold text-xl flex items-center gap-2 mb-2">
                          <MapPin className="h-6 w-6 text-purple-600" />
                          Society Details
                        </h3>
                        <div className="space-y-2">
                          <div>
                            <div className="text-gray-600 text-[15px]">Society Name</div>
                            <div className="font-bold text-lg text-[#181d24]">Golden Heights Residency</div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-[15px]">Address</div>
                            <div className="text-[#232b38] text-base">
                              123 Park Avenue, Sector 15, Gurgaon, Haryana 122001
                            </div>
                          </div>
                        </div>
                        <hr className="my-4"/>
                        <div className="flex flex-wrap gap-x-12 gap-y-2">
                          <div>
                            <div className="text-gray-600 text-sm">Established</div>
                            <div className="font-semibold text-[17px]">2018</div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-sm">Total Flats</div>
                            <div className="font-semibold text-[17px]">120</div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-sm">Total Residents</div>
                            <div className="font-semibold text-[17px]">285</div>
                          </div>
                        </div>
                      </div>
                      {/* Contact Info Card */}
                      <div className="rounded-xl border bg-white p-7 flex flex-col gap-4 min-w-0">
                        <h3 className="font-semibold text-xl flex items-center gap-2 mb-2">
                          <Phone className="h-6 w-6 text-purple-600" />
                          Contact Information
                        </h3>
                        <div className="mb-4">
                          <div className="text-gray-600 text-[15px]">Emergency Number</div>
                          <div className="font-bold text-lg text-red-600">
                            +91 9876543000
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 text-[15px]">Management Company</div>
                          <div className="font-semibold text-base">
                            Prime Property Management
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  {/* STAFF DIRECTORY */}
                  <TabsContent value="staff">
                    <div className="flex gap-6 h-[48vh] md:h-[55vh]">
                      {/* Staff List */}
                      <div className="w-[260px] bg-[#f8fafd] border rounded-xl flex flex-col max-h-full">
                        <div className="p-3 border-b">
                          <Input
                            placeholder="Search staff..."
                            value={staffSearch}
                            onChange={(e) => setStaffSearch(e.target.value)}
                            className="rounded-lg text-[15px]"
                          />
                        </div>
                        <div className="overflow-y-auto flex-1">
                          {filteredStaff.length > 0 ? (
                            filteredStaff.map((staff) => (
                              <div
                                key={staff.id}
                                onClick={() => {
                                  setSelectedStaff(staff);
                                  setStaffDetailTab("profile");
                                }}
                                className={`flex items-center gap-4 px-4 py-3 border-b cursor-pointer hover:bg-purple-50 transition-colors ${
                                  selectedStaff?.id === staff.id
                                    ? "bg-purple-100/30"
                                    : ""
                                }`}
                              >
                                <div className="rounded-full border w-10 h-10 flex items-center justify-center bg-white font-semibold text-gray-600">
                                  {staff.photoInitials}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium text-[15px] text-[#22292f] truncate">
                                    {staff.name}
                                  </div>
                                  <div className="text-xs text-gray-500 truncate">
                                    {staff.role}
                                  </div>
                                  <StaffDeptBadge department={staff.department} />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-6 text-gray-400 text-center">
                              No staff found.
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Staff Detail Panel */}
                      <div className="flex-1 min-w-0">
                        {selectedStaff ? (
                          <Tabs
                            value={staffDetailTab}
                            onValueChange={setStaffDetailTab}
                            className="h-full flex flex-col"
                          >
                            <TabsList className="bg-[#f7fafe] mb-4 rounded-md flex w-full gap-2 max-w-lg">
                              <TabsTrigger value="profile" className="text-[15px] font-medium flex-1 !rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
                                Profile
                              </TabsTrigger>
                              <TabsTrigger value="responsibilities" className="text-[15px] font-medium flex-1 !rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
                                Responsibilities
                              </TabsTrigger>
                              <TabsTrigger value="emergency" className="text-[15px] font-medium flex-1 !rounded-md data-[state=active]:bg-white data-[state=active]:text-primary">
                                Emergency Contact
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="flex-1">
                              <div className="flex items-center gap-6 mb-5">
                                <div className="rounded-full font-bold border w-16 h-16 flex items-center justify-center bg-white text-gray-700 text-2xl">
                                  {selectedStaff.photoInitials}
                                </div>
                                <div>
                                  <div className="font-bold text-xl text-[#232b38]">{selectedStaff.name}</div>
                                  <div className="text-base text-gray-500">{selectedStaff.role}</div>
                                  <StaffDeptBadge department={selectedStaff.department} />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div className="border rounded-xl p-5 min-w-0 bg-white">
                                  <div className="font-semibold flex items-center gap-1 mb-2">
                                    <Badge className="w-4 h-4 text-purple-600" /> Work Information
                                  </div>
                                  <div className="text-[15px] mb-1">Shift</div>
                                  <div className="mb-1 font-medium">{selectedStaff.shift}</div>
                                  <div className="text-[15px] mb-1">Experience</div>
                                  <div className="mb-1 font-medium">{selectedStaff.experience}</div>
                                  <div className="flex items-center text-gray-500 text-sm gap-1 mt-2">
                                    <svg className="w-4 h-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" /><rect width="16" height="15" x="4" y="7" rx="2" /><circle cx="16" cy="11" r="1" /></svg>
                                    Joined {selectedStaff.joined}
                                  </div>
                                </div>
                                <div className="border rounded-xl p-5 min-w-0 bg-white">
                                  <div className="font-semibold flex items-center gap-1 mb-2">
                                    <Phone className="w-4 h-4 text-purple-600" /> Contact Information
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-[15px] flex items-center gap-2">
                                      <Phone className="w-4 h-4 inline-block mr-2 text-gray-400" />
                                      {selectedStaff.phone}
                                    </div>
                                    <div className="text-[15px] flex items-center gap-2">
                                      <Mail className="w-4 h-4 inline-block mr-2 text-gray-400" />
                                      <span className="truncate">{selectedStaff.email}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Certifications */}
                              {selectedStaff.certifications && selectedStaff.certifications.length > 0 && (
                                <div className="border rounded-xl p-5 bg-white">
                                  <div className="font-semibold mb-2">Certifications</div>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedStaff.certifications.map((cert) => (
                                      <span key={cert} className="bg-green-100 border border-green-300 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {cert}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </TabsContent>
                            {/* Dummy Responsibilities & Emergency Contact contents */}
                            <TabsContent value="responsibilities">
                              <div className="border rounded-xl p-6 bg-white">
                                <p className="text-gray-500">Responsibilities for this staff member to be listed here...</p>
                              </div>
                            </TabsContent>
                            <TabsContent value="emergency">
                              <div className="border rounded-xl p-6 bg-white">
                                <p className="text-gray-500">Emergency contact details for this staff member go here...</p>
                              </div>
                            </TabsContent>
                          </Tabs>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-500">
                            Select a staff member to view details.
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  {/* SETTINGS TAB (Empty for now) */}
                  <TabsContent value="settings">
                    <div className="h-[33vh] min-h-[200px] flex items-center justify-center text-gray-400 text-lg">
                      Settings tab is under development.
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            {/* Sign Out Button */}
            <Button variant="ghost" size="lg" className="shrink-0 hover:bg-purple-100/70 rounded-lg transition-all text-base font-medium">
              <LogOut className="h-5 w-5" />
              <span className="hidden lg:inline ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
