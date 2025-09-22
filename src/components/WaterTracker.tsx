import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Droplets, Plus } from "lucide-react";

interface WaterTrackerProps {
  className?: string;
}

const WaterTracker = ({ className }: WaterTrackerProps) => {
  const [glassesConsumed, setGlassesConsumed] = useState(6);
  const dailyGoal = 8; // 8 glasses per day
  const progressPercentage = (glassesConsumed / dailyGoal) * 100;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = `${(progressPercentage / 100) * circumference} ${circumference}`;

  const addGlass = () => {
    if (glassesConsumed < dailyGoal) {
      setGlassesConsumed(prev => prev + 1);
    }
  };

  return (
    <Card className={`p-6 shadow-sm border-0 bg-card ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Water Intake
        </h3>
        
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--progress-bg))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgb(59 130 246)" // Blue-500
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              className="wellness-transition"
              style={{
                filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Droplets className="h-6 w-6 text-blue-500 mb-1" />
            <span className="text-lg font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Glass count */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {glassesConsumed} / {dailyGoal}
          </div>
          <p className="text-sm text-muted-foreground">glasses today</p>
        </div>

        {/* Add Glass Button */}
        <Button 
          onClick={addGlass}
          disabled={glassesConsumed >= dailyGoal}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 wellness-transition"
          style={{
            background: glassesConsumed >= dailyGoal 
              ? "hsl(var(--muted))" 
              : "rgb(59 130 246)",
            boxShadow: glassesConsumed < dailyGoal 
              ? "0 4px 12px rgba(59, 130, 246, 0.3)" 
              : "none"
          }}
        >
          {glassesConsumed >= dailyGoal ? (
            <>
              <Droplets className="h-4 w-4 mr-2" />
              Goal Reached! 🎉
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Glass
            </>
          )}
        </Button>

        {/* Progress indicator dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {Array.from({ length: dailyGoal }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full wellness-transition ${
                i < glassesConsumed 
                  ? 'bg-blue-500 shadow-lg' 
                  : 'bg-gray-200'
              }`}
              style={{
                boxShadow: i < glassesConsumed 
                  ? "0 0 6px rgba(59, 130, 246, 0.5)" 
                  : "none"
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WaterTracker;