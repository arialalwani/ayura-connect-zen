import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Coffee, 
  Utensils, 
  Moon, 
  Clock,
  CheckCircle,
  Droplets,
  Target,
  TrendingUp,
  Calendar,
  MessageCircle
} from "lucide-react";

interface PatientDashboardProps {
  onNavigate: (screen: string) => void;
}

const PatientDashboard = ({ onNavigate }: PatientDashboardProps) => {
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false
  });

  const meals = [
    {
      id: 'breakfast',
      name: 'Morning Meal',
      time: '7:00 AM',
      icon: Coffee,
      foods: ['Oatmeal with almonds', 'Herbal tea', 'Seasonal fruits'],
      calories: 320,
      completed: completedMeals.breakfast
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '12:30 PM',
      icon: Utensils,
      foods: ['Quinoa salad', 'Steamed vegetables', 'Coconut water'],
      calories: 480,
      completed: completedMeals.lunch
    },
    {
      id: 'snack',
      name: 'Evening Snack',
      time: '4:00 PM',
      icon: Leaf,
      foods: ['Fresh cucumber', 'Mint water', 'Dates (2 pieces)'],
      calories: 150,
      completed: completedMeals.snack
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:00 PM',
      icon: Moon,
      foods: ['Kitchari with ghee', 'Warm milk', 'Light soup'],
      calories: 420,
      completed: completedMeals.dinner
    }
  ];

  const totalCompleted = Object.values(completedMeals).filter(Boolean).length;
  const progressPercentage = (totalCompleted / meals.length) * 100;

  const handleMealToggle = (mealId: string) => {
    setCompletedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Good Morning, Aria 🌿</h1>
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
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--progress-bg))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray={`${progressPercentage * 2.51} 251`}
                    className="wellness-transition"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Meals Completed</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--progress-bg))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray="188 251"
                    className="wellness-transition"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">75%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Water Intake</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--progress-bg))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="8"
                    strokeDasharray="226 251"
                    className="wellness-transition"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-success">90%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Wellness Score</p>
            </div>
          </div>
        </Card>

        {/* Today's Meals */}
        <Card className="shadow-sm border-0 bg-card">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Today's Meal Plan</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Pitta-pacifying foods to balance your constitution
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4">
              {meals.map((meal) => (
                <div 
                  key={meal.id}
                  className={`p-4 rounded-lg border-2 wellness-transition ${
                    meal.completed 
                      ? 'border-primary bg-primary-light/50' 
                      : 'border-border bg-card hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        checked={meal.completed}
                        onCheckedChange={() => handleMealToggle(meal.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                          <meal.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{meal.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {meal.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className="border-primary text-primary">
                        {meal.calories} cal
                      </Badge>
                      {meal.completed && (
                        <div className="flex items-center text-primary text-sm mt-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 ml-16">
                    <div className="flex flex-wrap gap-2">
                      {meal.foods.map((food, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md cursor-pointer"
                onClick={() => onNavigate('tracker')}>
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
          
          <Card className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md cursor-pointer"
                onClick={() => onNavigate('chat')}>
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
    </div>
  );
};

export default PatientDashboard;