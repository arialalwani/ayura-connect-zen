import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  User, 
  Scale, 
  Ruler, 
  Calendar,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  FileText
} from "lucide-react";

interface PatientProfileProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const PatientProfile = ({ onBack, onNavigate }: PatientProfileProps) => {
  // Prakriti analysis data
  const prakritData = {
    vata: 13,
    pitta: 15,
    kapha: 10
  };
  
  const total = prakritData.vata + prakritData.pitta + prakritData.kapha;
  const dominantDosha = Object.entries(prakritData).reduce((a, b) => prakritData[a[0]] > prakritData[b[0]] ? a : b)[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Aria Patel</h1>
              <p className="text-primary-foreground/80">Patient Profile & Prakriti Analysis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Patient Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm border-0 bg-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium">Aria Patel</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Age</span>
                <span className="font-medium">28 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Gender</span>
                <span className="font-medium">Female</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weight</span>
                <Badge variant="outline" className="border-primary text-primary">
                  <Scale className="h-3 w-3 mr-1" />
                  62 kg
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Height</span>
                <Badge variant="outline" className="border-primary text-primary">
                  <Ruler className="h-3 w-3 mr-1" />
                  165 cm
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Registration</span>
                <span className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  March 2024
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-sm border-0 bg-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Health Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Diet Compliance</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Wellness Score</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Sleep Quality</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Last vitals check:</span>
                  <span className="text-sm font-medium">2 days ago</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Prakriti Analysis */}
        <Card className="p-6 shadow-sm border-0 bg-card">
          <h3 className="text-lg font-semibold mb-6">Prakriti Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donut Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="8"
                  />
                  
                  {/* Vata segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--vata))"
                    strokeWidth="8"
                    strokeDasharray={`${(prakritData.vata / total) * 251.2} 251.2`}
                    strokeDashoffset="0"
                    className="wellness-transition"
                  />
                  
                  {/* Pitta segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--pitta))"
                    strokeWidth="8"
                    strokeDasharray={`${(prakritData.pitta / total) * 251.2} 251.2`}
                    strokeDashoffset={`${-(prakritData.vata / total) * 251.2}`}
                    className="wellness-transition"
                  />
                  
                  {/* Kapha segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--kapha))"
                    strokeWidth="8"
                    strokeDasharray={`${(prakritData.kapha / total) * 251.2} 251.2`}
                    strokeDashoffset={`${-((prakritData.vata + prakritData.pitta) / total) * 251.2}`}
                    className="wellness-transition"
                  />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary capitalize">{dominantDosha}</div>
                    <div className="text-sm text-muted-foreground">Dominant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dosha breakdown */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-dosha-vata"></div>
                    <span className="font-medium">Vata</span>
                  </div>
                  <span className="font-bold">{prakritData.vata}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-dosha-pitta"></div>
                    <span className="font-medium">Pitta</span>
                  </div>
                  <span className="font-bold text-dosha-pitta">{prakritData.pitta}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-dosha-kapha"></div>
                    <span className="font-medium">Kapha</span>
                  </div>
                  <span className="font-bold">{prakritData.kapha}</span>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="p-4 rounded-lg bg-primary-light border border-primary/20">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">AI Recommendation</h4>
                    <p className="text-sm text-foreground">
                      Focus on <strong>Pitta-pacifying diet</strong>. Include cooling foods like cucumber, 
                      coconut water, and leafy greens. Avoid spicy and fried foods.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  onClick={() => onNavigate('diet-plan-creator')}
                  className="flex-1 bg-primary hover:bg-primary-hover"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create Diet Plan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('reports')}
                  className="border-primary text-primary hover:bg-primary-light"
                >
                  View Reports
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 shadow-sm border-0 bg-card">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium">Completed morning meal plan</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">Reported increased acidity</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
              <Activity className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Updated health metrics</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;