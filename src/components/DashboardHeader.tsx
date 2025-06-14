
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Society } from "@/types/emergency";

export const DashboardHeader = () => {
  const [society, setSociety] = useState<Society>({
    id: "1",
    name: "Sunrise Gardens Society",
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
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* CareStanctum Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
                alt="CareStanctum" 
                className="h-12 w-auto"
              />
            </div>
            
            <div className="h-8 w-px bg-gray-300"></div>
            
            {/* Society Info */}
            <div className="flex items-center space-x-3">
              {society.logoUrl && (
                <img 
                  src={society.logoUrl} 
                  alt="Society Logo" 
                  className="h-10 w-10 object-contain rounded-lg border"
                />
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  {society.name}
                </h1>
                <p className="text-sm text-slate-600">Safety Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-800">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-sm text-slate-600">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Society Settings
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
        </div>
      </div>
    </header>
  );
};
