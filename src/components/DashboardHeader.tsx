
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Society } from "@/types/emergency";
import { Users, Settings, LogOut, Edit } from "lucide-react";

export const DashboardHeader = () => {
  const [society, setSociety] = useState<Society>({
    id: "1",
    name: "Golden Heights Residency",
    logoUrl: undefined
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempSocietyName, setTempSocietyName] = useState(society.name);

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
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* CareStanctum Logo and Branding */}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
                alt="CareStanctum" 
                className="h-10 w-auto"
              />
              <div className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium">
                Emergency Response Dashboard
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Resident Directory</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{society.name}</span>
                <span className="text-sm text-gray-500">Residency</span>
                <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
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
              </div>

              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <div className="text-right">
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
