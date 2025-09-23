import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, 
  Utensils, 
  Moon, 
  Leaf, 
  Clock,
  Star,
  Check
} from "lucide-react";

interface Meal {
  id: string;
  name: string;
  time: string;
  icon: any;
  foods: string[];
  calories: number;
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  primaryDosha: string;
  suitableFor: string[];
  recommended: boolean;
  meals: Meal[];
}

const mealPlans: MealPlan[] = [
  {
    id: 'pitta-cooling',
    name: 'Pitta Cooling Plan',
    description: 'Cool, sweet, and hydrating foods to balance Pitta fire',
    primaryDosha: 'Pitta',
    suitableFor: ['Pitta', 'Summer'],
    recommended: true,
    meals: [
      {
        id: 'breakfast',
        name: 'Morning Meal',
        time: '7:00 AM',
        icon: Coffee,
        foods: ['Coconut yogurt', 'Sweet fruits', 'Cooling herbs', 'Rose water'],
        calories: 320
      },
      {
        id: 'lunch',
        name: 'Lunch',
        time: '12:30 PM',
        icon: Utensils,
        foods: ['Quinoa salad', 'Cucumber', 'Mint', 'Coconut water', 'Sweet vegetables'],
        calories: 480
      },
      {
        id: 'snack',
        name: 'Evening Snack',
        time: '4:00 PM',
        icon: Leaf,
        foods: ['Fresh melon', 'Fennel tea', 'Almonds (soaked)'],
        calories: 150
      },
      {
        id: 'dinner',
        name: 'Dinner',
        time: '7:00 PM',
        icon: Moon,
        foods: ['Basmati rice', 'Ghee', 'Sweet vegetables', 'Cooling spices'],
        calories: 420
      }
    ]
  },
  {
    id: 'vata-grounding',
    name: 'Vata Grounding Plan',
    description: 'Warm, moist, and nourishing foods to calm Vata wind',
    primaryDosha: 'Vata',
    suitableFor: ['Vata', 'Winter', 'Stress'],
    recommended: false,
    meals: [
      {
        id: 'breakfast',
        name: 'Morning Meal',
        time: '7:00 AM',
        icon: Coffee,
        foods: ['Warm oatmeal', 'Stewed apples', 'Cinnamon', 'Warm almond milk'],
        calories: 380
      },
      {
        id: 'lunch',
        name: 'Lunch',
        time: '12:30 PM',
        icon: Utensils,
        foods: ['Kitchari', 'Root vegetables', 'Warming spices', 'Ghee'],
        calories: 520
      },
      {
        id: 'snack',
        name: 'Evening Snack',
        time: '4:00 PM',
        icon: Leaf,
        foods: ['Warm herbal tea', 'Dates', 'Sesame seeds'],
        calories: 180
      },
      {
        id: 'dinner',
        name: 'Dinner',
        time: '7:00 PM',
        icon: Moon,
        foods: ['Mung dal soup', 'Steamed grains', 'Cooked vegetables', 'Warm spices'],
        calories: 450
      }
    ]
  },
  {
    id: 'kapha-energizing',
    name: 'Kapha Energizing Plan',
    description: 'Light, warm, and spicy foods to stimulate Kapha earth',
    primaryDosha: 'Kapha',
    suitableFor: ['Kapha', 'Spring', 'Weight loss'],
    recommended: false,
    meals: [
      {
        id: 'breakfast',
        name: 'Morning Meal',
        time: '7:00 AM',
        icon: Coffee,
        foods: ['Spiced tea', 'Light fruits', 'Ginger', 'Honey (raw)'],
        calories: 280
      },
      {
        id: 'lunch',
        name: 'Lunch',
        time: '12:30 PM',
        icon: Utensils,
        foods: ['Quinoa', 'Leafy greens', 'Legumes', 'Warming spices', 'Minimal oil'],
        calories: 440
      },
      {
        id: 'snack',
        name: 'Evening Snack',
        time: '4:00 PM',
        icon: Leaf,
        foods: ['Green tea', 'Raw vegetables', 'Spiced nuts'],
        calories: 120
      },
      {
        id: 'dinner',
        name: 'Dinner',
        time: '7:00 PM',
        icon: Moon,
        foods: ['Light soup', 'Steamed vegetables', 'Herbs', 'Minimal grains'],
        calories: 360
      }
    ]
  }
];

const doshaColors = {
  Vata: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Pitta: 'bg-orange-100 text-orange-800 border-orange-200',
  Kapha: 'bg-blue-100 text-blue-800 border-blue-200'
};

const MealPlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState(mealPlans[0]);

  const totalCalories = selectedPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <Card className="shadow-sm border-0 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Choose Your Meal Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-lg border-2 cursor-pointer wellness-transition ${
                  selectedPlan.id === plan.id
                    ? 'border-primary bg-primary-light/50'
                    : 'border-border bg-card hover:bg-secondary/50'
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
                  </div>
                  {plan.recommended && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                  {selectedPlan.id === plan.id && (
                    <Check className="h-4 w-4 text-primary ml-2" />
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${doshaColors[plan.primaryDosha as keyof typeof doshaColors]}`}
                  >
                    {plan.primaryDosha}
                  </Badge>
                  {plan.suitableFor.slice(1).map((suitable) => (
                    <Badge key={suitable} variant="outline" className="text-xs">
                      {suitable}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {plan.meals.reduce((sum, meal) => sum + meal.calories, 0)} cal/day
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Plan Details */}
      <Card className="shadow-sm border-0 bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`${doshaColors[selectedPlan.primaryDosha as keyof typeof doshaColors]} mr-2`}
              >
                {selectedPlan.primaryDosha}
              </Badge>
              {selectedPlan.name}
            </CardTitle>
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {totalCalories} cal total
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedPlan.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {selectedPlan.meals.map((meal) => (
              <div 
                key={meal.id}
                className="p-4 rounded-lg border bg-card hover:bg-secondary/30 wellness-transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                      <meal.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{meal.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {meal.time}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="border-primary text-primary">
                    {meal.calories} cal
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {meal.foods.map((food, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary-light/30 rounded-lg">
            <div className="text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Suitable for:</span>
                <div className="flex gap-1">
                  {selectedPlan.suitableFor.map((suitable) => (
                    <Badge key={suitable} variant="outline" className="text-xs">
                      {suitable}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Daily total:</span>
                <span className="text-primary font-semibold">{totalCalories} calories</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlanSelector;