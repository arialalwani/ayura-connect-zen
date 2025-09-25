import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Flame, Dumbbell, X } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  category: string;
  defaultCaloriesPerMin: number;
}

interface ExerciseEntry {
  id: string;
  exercise: Exercise;
  duration: number; // in minutes
  calories: number;
  date: Date;
}

interface ExerciseTrackerProps {
  onExerciseAdd: (entry: ExerciseEntry) => void;
  todayEntries: ExerciseEntry[];
}

const exercises: Exercise[] = [
  // Cardio
  { id: 'running', name: 'Running', category: 'Cardio', defaultCaloriesPerMin: 12 },
  { id: 'walking', name: 'Walking', category: 'Cardio', defaultCaloriesPerMin: 4 },
  { id: 'cycling', name: 'Cycling', category: 'Cardio', defaultCaloriesPerMin: 8 },
  { id: 'swimming', name: 'Swimming', category: 'Cardio', defaultCaloriesPerMin: 10 },
  { id: 'jogging', name: 'Jogging', category: 'Cardio', defaultCaloriesPerMin: 8 },
  { id: 'hiit', name: 'HIIT Training', category: 'Cardio', defaultCaloriesPerMin: 15 },
  
  // Strength Training
  { id: 'weightlifting', name: 'Weight Lifting', category: 'Strength', defaultCaloriesPerMin: 6 },
  { id: 'bodyweight', name: 'Bodyweight Exercises', category: 'Strength', defaultCaloriesPerMin: 5 },
  { id: 'resistance', name: 'Resistance Training', category: 'Strength', defaultCaloriesPerMin: 6 },
  { id: 'crossfit', name: 'CrossFit', category: 'Strength', defaultCaloriesPerMin: 12 },
  
  // Sports
  { id: 'tennis', name: 'Tennis', category: 'Sports', defaultCaloriesPerMin: 8 },
  { id: 'basketball', name: 'Basketball', category: 'Sports', defaultCaloriesPerMin: 9 },
  { id: 'football', name: 'Football', category: 'Sports', defaultCaloriesPerMin: 8 },
  { id: 'badminton', name: 'Badminton', category: 'Sports', defaultCaloriesPerMin: 7 },
  { id: 'cricket', name: 'Cricket', category: 'Sports', defaultCaloriesPerMin: 5 },
  { id: 'golf', name: 'Golf', category: 'Sports', defaultCaloriesPerMin: 4 },
  { id: 'volleyball', name: 'Volleyball', category: 'Sports', defaultCaloriesPerMin: 6 },
  
  // Flexibility & Mind-Body
  { id: 'yoga', name: 'Yoga', category: 'Flexibility', defaultCaloriesPerMin: 3 },
  { id: 'pilates', name: 'Pilates', category: 'Flexibility', defaultCaloriesPerMin: 4 },
  { id: 'stretching', name: 'Stretching', category: 'Flexibility', defaultCaloriesPerMin: 2 },
  { id: 'meditation', name: 'Meditation', category: 'Mind-Body', defaultCaloriesPerMin: 1 },
  
  // Dance & Recreation
  { id: 'dancing', name: 'Dancing', category: 'Recreation', defaultCaloriesPerMin: 6 },
  { id: 'hiking', name: 'Hiking', category: 'Recreation', defaultCaloriesPerMin: 7 },
  { id: 'gardening', name: 'Gardening', category: 'Recreation', defaultCaloriesPerMin: 4 },
  { id: 'climbing', name: 'Rock Climbing', category: 'Recreation', defaultCaloriesPerMin: 11 }
];

const ExerciseTracker = ({ onExerciseAdd, todayEntries }: ExerciseTrackerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [duration, setDuration] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(exercises.map(e => e.category)))];
  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(e => e.category === selectedCategory);

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCalories(''); // Reset calories when exercise changes
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    if (selectedExercise && value) {
      const estimatedCalories = selectedExercise.defaultCaloriesPerMin * parseInt(value);
      setCalories(estimatedCalories.toString());
    }
  };

  const handleSubmit = () => {
    if (!selectedExercise || !duration || !calories) return;

    const entry: ExerciseEntry = {
      id: Date.now().toString(),
      exercise: selectedExercise,
      duration: parseInt(duration),
      calories: parseInt(calories),
      date: new Date()
    };

    onExerciseAdd(entry);
    
    // Reset form
    setSelectedExercise(null);
    setDuration('');
    setCalories('');
    setIsOpen(false);
  };

  const removeEntry = (entryId: string) => {
    // This would typically call a prop function to remove the entry
    console.log('Remove entry:', entryId);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="p-6 shadow-sm border-0 bg-card wellness-transition hover:shadow-md cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Record Exercise</h4>
                <p className="text-sm text-muted-foreground">Track your workouts</p>
              </div>
            </div>
          </Card>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Record Exercise
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <Label htmlFor="category">Exercise Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exercise Selection */}
            <div>
              <Label>Select Exercise</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-60 overflow-y-auto">
                {filteredExercises.map(exercise => (
                  <Button
                    key={exercise.id}
                    variant={selectedExercise?.id === exercise.id ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col items-start text-left"
                    onClick={() => handleExerciseSelect(exercise)}
                  >
                    <span className="font-medium text-sm">{exercise.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      ~{exercise.defaultCaloriesPerMin} cal/min
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {selectedExercise && (
              <>
                {/* Duration Input */}
                <div>
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    placeholder="e.g., 30"
                    min="1"
                    max="300"
                  />
                </div>

                {/* Calories Input */}
                <div>
                  <Label htmlFor="calories" className="flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    Calories Burned
                  </Label>
                  <Input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="e.g., 300"
                    min="1"
                  />
                  {duration && selectedExercise && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimated: {selectedExercise.defaultCaloriesPerMin * parseInt(duration || '0')} calories
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit}
                  disabled={!duration || !calories}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Today's Exercises */}
      {todayEntries.length > 0 && (
        <Card className="p-4 shadow-sm border-0 bg-card mt-4">
          <h4 className="font-medium mb-3">Today's Exercises</h4>
          <div className="space-y-2">
            {todayEntries.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {entry.exercise.category}
                  </Badge>
                  <span className="font-medium text-sm">{entry.exercise.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {entry.duration}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {entry.calories} cal
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(entry.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default ExerciseTracker;