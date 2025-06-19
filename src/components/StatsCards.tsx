
import { Card, CardContent } from "@/components/ui/card";
import { DashboardStats } from "@/types/emergency";

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-1 md:gap-2 lg:gap-4 grid-cols-2 md:grid-cols-4">
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-1.5 md:p-2 lg:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Yet to Attend</p>
              <p className="text-sm md:text-lg lg:text-2xl font-bold text-red-600">{stats.yetToAttend}</p>
            </div>
            <div className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 lg:h-3 lg:w-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500">
        <CardContent className="p-1.5 md:p-2 lg:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Attending</p>
              <p className="text-sm md:text-lg lg:text-2xl font-bold text-yellow-600">{stats.attending}</p>
            </div>
            <div className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 lg:h-3 lg:w-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-1.5 md:p-2 lg:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Attended</p>
              <p className="text-sm md:text-lg lg:text-2xl font-bold text-green-600">{stats.attended}</p>
            </div>
            <div className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 lg:h-3 lg:w-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-1.5 md:p-2 lg:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Today</p>
              <p className="text-sm md:text-lg lg:text-2xl font-bold text-blue-800">{stats.total}</p>
            </div>
            <div className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 lg:h-3 lg:w-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
