
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Mail, MapPin, Shield, User, Users } from "lucide-react";

interface Resident {
  id: string;
  name: string;
  flat: string;
  phone: string;
  email: string;
  age: number;
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  safetyDevices: string[];
}

const mockResidents: Resident[] = [
  {
    id: "1",
    name: "Mrs. Priya Sharma",
    flat: "A-101",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    age: 72,
    emergencyContacts: [
      { name: "Rahul Sharma", relationship: "Son", phone: "+91 9876543211" },
      { name: "Neha Sharma", relationship: "Daughter", phone: "+91 9876543212" }
    ],
    safetyDevices: ["Sos Button", "Fall Detector"]
  },
  {
    id: "2",
    name: "Mr. Rajesh Kumar",
    flat: "B-205",
    phone: "+91 9876543213",
    email: "rajesh.kumar@example.com",
    age: 68,
    emergencyContacts: [
      { name: "Amit Kumar", relationship: "Son", phone: "+91 9876543214" }
    ],
    safetyDevices: ["Sos Button"]
  },
  {
    id: "3",
    name: "Mrs. Sunita Gupta",
    flat: "C-302",
    phone: "+91 9876543215",
    email: "sunita.gupta@example.com",
    age: 75,
    emergencyContacts: [
      { name: "Deepak Gupta", relationship: "Son", phone: "+91 9876543216" }
    ],
    safetyDevices: ["Fall Detector"]
  }
];

const Residents = () => {
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Profile");

  const filteredResidents = mockResidents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.flat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Resident Directory</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or flat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResidents.map((resident) => (
                  <div
                    key={resident.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedResident(resident)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {getInitials(resident.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{resident.name}</h3>
                        <p className="text-sm text-gray-600">Flat: {resident.flat}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedResident} onOpenChange={() => setSelectedResident(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resident Information</DialogTitle>
          </DialogHeader>
          
          {selectedResident && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search by name or flat..." className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {mockResidents.map((resident) => (
                    <div
                      key={resident.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedResident.id === resident.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedResident(resident)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {getInitials(resident.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{resident.name}</h4>
                          <p className="text-sm text-gray-600">Flat: {resident.flat}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {getInitials(selectedResident.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedResident.name}</h2>
                    <p className="text-gray-600">{selectedResident.age} years old</p>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex space-x-6 mb-6 border-b">
                  {["Profile", "Medical Info", "Recent Alerts"].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-2 px-1 border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                {/* Tab Content */}
                {activeTab === "Profile" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <User className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Contact Information</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Flat:</span>
                          <span className="text-sm font-medium">{selectedResident.flat}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm font-medium">{selectedResident.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="text-sm font-medium">{selectedResident.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Emergency Contacts */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Users className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Emergency Contacts</h3>
                      </div>
                      <div className="space-y-3">
                        {selectedResident.emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{contact.name}</p>
                              <p className="text-sm text-gray-600">{contact.phone}</p>
                            </div>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              {contact.relationship}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Safety Devices */}
                    <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                      <div className="flex items-center space-x-2 mb-4">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Safety Devices</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedResident.safetyDevices.map((device, index) => (
                          <Badge key={index} variant="outline" className="bg-green-100 text-green-800">
                            {device}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "Medical Info" && (
                  <div className="text-center py-8 text-gray-500">
                    Medical information will be displayed here
                  </div>
                )}
                
                {activeTab === "Recent Alerts" && (
                  <div className="text-center py-8 text-gray-500">
                    Recent alerts will be displayed here
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Residents;
