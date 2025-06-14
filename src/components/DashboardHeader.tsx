import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Society, Resident, EmergencyIncident } from "@/types/emergency";
import { Users, LogOut, Edit, Search, Home, Phone, Mail, ShieldAlert, User, Badge } from "lucide-react";

// Mock data for residents, using some names from the incident list for consistency
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

const SafetyDeviceBadge = ({ device }: { device: string }) => {
  const formattedDevice = device.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return <Button variant="outline" size="sm" className="cursor-default">{formattedDevice}</Button>;
};

export const DashboardHeader = () => {
  const [society, setSociety] = useState<Society>({
    id: "1",
    name: "Golden Heights Residency",
    logoUrl: undefined
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempSocietyName, setTempSocietyName] = useState(society.name);
  const [isResidentDirectoryOpen, setIsResidentDirectoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState<Resident | null>(mockResidents[0]);

  const filteredResidents = mockResidents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSociety(prev => ({ ...prev, logoUrl: url }));
    }
  };

  const handleSaveSettings = () => {
    setSociety(prev => ({ ...prev, name: tempSocietyName }));
    setIsSettingsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 shrink-0">
            {/* CareStanctum Logo and Branding */}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
                alt="CareStanctum" 
                className="h-8 sm:h-10 w-auto"
              />
              <div className="hidden md:block bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium">
                Emergency Response Dashboard
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 sm:space-x-3">
            {/* Navigation Items */}
            <Dialog open={isResidentDirectoryOpen} onOpenChange={setIsResidentDirectoryOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="shrink-0">
                  <Users className="h-4 w-4" />
                  <span className="hidden lg:inline">Resident Directory</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[90vw] h-[90vh] flex flex-col p-0">
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

            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Society Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="society-name">Society Name</Label>
                    <Input
                      id="society-name"
                      value={tempSocietyName}
                      onChange={(e) => setTempSocietyName(e.target.value)}
                      placeholder="Enter society name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="society-logo">Society Logo</Label>
                    <Input
                      id="society-logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <Button onClick={handleSaveSettings} className="w-full">
                    Save Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" className="shrink-0">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Sign Out</span>
            </Button>

            <div className="hidden md:block text-right shrink-0">
              <div className="text-sm font-medium text-purple-600">
                Jun 13, 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
