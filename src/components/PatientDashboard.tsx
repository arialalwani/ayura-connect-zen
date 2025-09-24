import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import WaterTracker from "./WaterTracker";
import MealPlanSelector from "./MealPlanSelector";
import DoshaProgressTracker from "./DoshaProgressTracker";
import { Leaf, Coffee, Utensils, Moon, Clock, CheckCircle, Droplets, Target, TrendingUp, Calendar, MessageCircle } from "lucide-react";
interface PatientDashboardProps {
  onNavigate: (screen: string) => void;
  wellnessScore?: number;
}
const PatientDashboard = ({
  onNavigate,
  wellnessScore = 90
}: PatientDashboardProps) => {
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false
  });
  const [waterIntake, setWaterIntake] = useState(1750); // in ml
  const recommendedWaterIntake = 3500; // 3.5L in ml
  const maxWaterIntake = 5000; // 5L in ml
  const meals = [{
    id: 'breakfast',
    name: 'Morning Meal',
    time: '7:00 AM',
    icon: Coffee,
    foods: ['Oatmeal with almonds', 'Herbal tea', 'Seasonal fruits'],
    calories: 320,
    completed: completedMeals.breakfast
  }, {
    id: 'lunch',
    name: 'Lunch',
    time: '12:30 PM',
    icon: Utensils,
    foods: ['Quinoa salad', 'Steamed vegetables', 'Coconut water'],
    calories: 480,
    completed: completedMeals.lunch
  }, {
    id: 'snack',
    name: 'Evening Snack',
    time: '4:00 PM',
    icon: Leaf,
    foods: ['Fresh cucumber', 'Mint water', 'Dates (2 pieces)'],
    calories: 150,
    completed: completedMeals.snack
  }, {
    id: 'dinner',
    name: 'Dinner',
    time: '7:00 PM',
    icon: Moon,
    foods: ['Kitchari with ghee', 'Warm milk', 'Light soup'],
    calories: 420,
    completed: completedMeals.dinner
  }];
  const totalCompleted = Object.values(completedMeals).filter(Boolean).length;
  const progressPercentage = totalCompleted / meals.length * 100;
  const handleMealToggle = (mealId: string) => {
    setCompletedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };
  
  const waterProgressPercentage = (waterIntake / recommendedWaterIntake) * 100;
  const formatWaterAmount = (ml: number) => {
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1)}L`;
    }
    return `${ml}ml`;
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Good Morning🌿</h1>
              <p className="text-primary-foreground/80 mt-1">
                Here's your personalized Ayurvedic plan for today
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-foreground/80">Streak</div>
              <div className="text-2xl font-bold">3 days 🎉</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Today's Progress */}
        <Card className="p-6 shadow-sm border-0 bg-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Today's Progress</h3>
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {totalCompleted} of {meals.length} completed
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--progress-bg))" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeDasharray={`${progressPercentage * 2.51} 251`} className="wellness-transition" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Meals Completed</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--progress-bg))" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(59 130 246)" strokeWidth="8" strokeDasharray={`${Math.min(waterProgressPercentage, 100) * 2.51} 251`} className="wellness-transition" style={{
                    filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))"
                  }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <Droplets className="h-3 w-3 text-blue-500 mb-0.5" />
                    <span className="text-xs font-bold text-blue-600">{Math.round(Math.min(waterProgressPercentage, 100))}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Water Intake</p>
                <p className="text-xs text-blue-600 font-medium mb-3">
                  {formatWaterAmount(waterIntake)} of {formatWaterAmount(recommendedWaterIntake)} target
                </p>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <div className="space-y-3">
                  <div className="relative">
                    <Slider
                      value={[waterIntake]}
                      onValueChange={(value) => setWaterIntake(value[0])}
                      max={maxWaterIntake}
                      min={0}
                      step={250}
                      className="w-full [&>span:first-child]:h-3 [&>span:first-child]:bg-blue-100 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&>span:first-child>span]:bg-blue-500"
                    />
                    {/* Target line indicator */}
                    <div 
                      className="absolute top-0 w-0.5 h-3 bg-green-500 z-10"
                      style={{ 
                        left: `calc(${(recommendedWaterIntake / maxWaterIntake) * 100}% - 1px)` 
                      }}
                    />
                    <div 
                      className="absolute -top-6 text-xs text-green-600 font-medium transform -translate-x-1/2"
                      style={{ 
                        left: `${(recommendedWaterIntake / maxWaterIntake) * 100}%` 
                      }}
                    >
                      Target
                    </div>
                  </div>
                  
                  {/* Interval marks */}
                  <div className="relative">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {Array.from({ length: 21 }, (_, i) => i * 250).map((ml, index) => (
                        <div key={ml} className="flex flex-col items-center">
                          {index % 4 === 0 && (
                            <>
                              <div className="w-px h-2 bg-muted-foreground/30 mb-1" />
                              <span className={ml === recommendedWaterIntake ? "text-green-600 font-medium" : ""}>
                                {formatWaterAmount(ml)}
                              </span>
                            </>
                          )}
                          {index % 4 !== 0 && index % 2 === 0 && (
                            <div className="w-px h-1 bg-muted-foreground/20" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick selection buttons */}
                  <div className="flex gap-2 justify-center pt-2">
                    {[1000, 2000, 3500, 4000].map((amount) => (
                      <Button
                        key={amount}
                        variant={waterIntake === amount ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWaterIntake(amount)}
                        className={`text-xs px-2 py-1 h-6 ${
                          amount === recommendedWaterIntake 
                            ? "border-green-500 text-green-600 hover:bg-green-50" 
                            : ""
                        }`}
                      >
                        {formatWaterAmount(amount)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--progress-bg))" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--success))" strokeWidth="8" strokeDasharray={`${wellnessScore * 2.51} 251`} className="wellness-transition" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-success">{wellnessScore}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Wellness Score</p>
              <Button 
                onClick={() => onNavigate('wellness-quiz')} 
                size="sm" 
                className="text-xs px-3 py-1 h-7"
              >
                Get Your Score
              </Button>
            </div>
          </div>
        </Card>

        {/* Dosha Progress Tracker */}
        <DoshaProgressTracker />

        {/* Alternate Meal Plans */}
        <MealPlanSelector />

        {/* Today's Meals */}
        <Card className="shadow-sm border-0 bg-card">
          
          
          
        </Card>


        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md cursor-pointer" onClick={() => onNavigate('tracker')}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">View Tracker</h4>
                <p className="text-sm text-muted-foreground">Check your progress</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md cursor-pointer" onClick={() => onNavigate('chat')}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Chat with Doctor</h4>
                <p className="text-sm text-muted-foreground">Ask questions</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Schedule Visit</h4>
                <p className="text-sm text-muted-foreground">Book consultation</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default PatientDashboard;