import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Calendar, 
  Bell, 
  Plus, 
  Search,
  MoreVertical,
  TrendingUp,
  Clock
} from "lucide-react";
import { format } from 'date-fns';

interface DoctorDashboardProps {
  onNavigate: (screen: string) => void;
}

const DoctorDashboard = ({ onNavigate }: DoctorDashboardProps) => {
  // Get appointments from localStorage
  const getAppointments = () => {
    try {
      return JSON.parse(localStorage.getItem('appointments') || '[]');
    } catch {
      return [];
    }
  };
  
  const appointments = getAppointments();
  const patients = [
    { id: 1, name: "Aria Patel", age: 28, lastVisit: "Today", status: "active", prakriti: "Pitta" },
    { id: 2, name: "Raj Kumar", age: 45, lastVisit: "2 days ago", status: "pending", prakriti: "Vata" },
    { id: 3, name: "Priya Singh", age: 32, lastVisit: "1 week ago", status: "active", prakriti: "Kapha" },
    { id: 4, name: "Amit Sharma", age: 38, lastVisit: "3 days ago", status: "active", prakriti: "Pitta-Kapha" },
  ];

  const stats = [
    { title: "Patients Today", value: "8", icon: Users, trend: "+2", color: "text-primary" },
    { title: "Diet Plans Created", value: "24", icon: FileText, trend: "+5", color: "text-primary" },
    { title: "Consultations", value: "12", icon: Calendar, trend: "+3", color: "text-primary" },
    { title: "Response Rate", value: "94%", icon: TrendingUp, trend: "+1%", color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Good Morning, Dr. Sharma 🌿</h1>
              <p className="text-primary-foreground/80 mt-1">
                Ready to heal with ancient wisdom
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Bell className="h-4 w-4 mr-2" />
                3 new
              </Button>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                DS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <Badge variant="secondary" className="text-xs bg-primary-light text-primary">
                      {stat.trend}
                    </Badge>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patients List */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-0 bg-card">
              <div className="p-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Patients</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-border">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate('patient-profile')}
                      className="bg-primary hover:bg-primary-hover"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Patient
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div 
                      key={patient.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 wellness-transition hover:bg-secondary cursor-pointer"
                      onClick={() => onNavigate('patient-profile')}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Age {patient.age} • {patient.prakriti} dominant
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge 
                            variant={patient.status === 'active' ? 'default' : 'secondary'}
                            className={patient.status === 'active' ? 'bg-primary text-primary-foreground' : ''}
                          >
                            {patient.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {patient.lastVisit}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6 shadow-sm border-0 bg-card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-secondary"
                  onClick={() => onNavigate('diet-plan-creator')}
                >
                  <FileText className="h-4 w-4 mr-3" />
                  Create Diet Plan
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-secondary"
                  onClick={() => onNavigate('reports')}
                >
                  <TrendingUp className="h-4 w-4 mr-3" />
                  View Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-secondary"
                  onClick={() => onNavigate('chat')}
                >
                  <Bell className="h-4 w-4 mr-3" />
                  Patient Messages
                </Button>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6 shadow-sm border-0 bg-card">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-accent/50">
                  <p className="text-sm font-medium">Aria needs diet adjustment</p>
                  <p className="text-xs text-muted-foreground">Reported increased Pitta symptoms</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50">
                  <p className="text-sm font-medium">Weekly report ready</p>
                  <p className="text-xs text-muted-foreground">12 patients completed plans</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50">
                  <p className="text-sm font-medium">New consultation request</p>
                  <p className="text-xs text-muted-foreground">Raj Kumar scheduled for tomorrow</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {appointments.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <Card className="p-6 shadow-sm border-0 bg-card">
              <h3 className="text-lg font-semibold mb-4">Today's Appointments</h3>
              <div className="space-y-3">
                {appointments.map((appointment: any) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{appointment.patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <Badge variant="outline" className="text-xs bg-primary-light/10 text-primary border-primary-light">
                        {appointment.duration} min
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;