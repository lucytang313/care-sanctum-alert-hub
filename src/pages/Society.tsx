
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, MapPin, Phone, Mail, Calendar } from "lucide-react";

const Society = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Society Information</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Society Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="font-medium">Sunrise Apartments</p>
                      <p className="text-sm text-gray-600">123 Main Street, City, State 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="font-medium">+91 9876543200</p>
                      <p className="text-sm text-gray-600">Main Office</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="font-medium">info@sunriseapartments.com</p>
                      <p className="text-sm text-gray-600">General Inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="font-medium">Established 2015</p>
                      <p className="text-sm text-gray-600">8 years of service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Resident Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">150</p>
                      <p className="text-sm text-gray-600">Total Units</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">142</p>
                      <p className="text-sm text-gray-600">Occupied</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">89</p>
                      <p className="text-sm text-gray-600">Senior Citizens</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">67</p>
                      <p className="text-sm text-gray-600">Safety Devices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Society;
