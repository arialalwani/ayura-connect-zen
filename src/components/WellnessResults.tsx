import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Heart, Brain, Zap, Target } from "lucide-react";

interface WellnessResultsProps {
  score: number;
  onContinue: () => void;
}

const WellnessResults = ({ score, onContinue }: WellnessResultsProps) => {
  const getScoreCategory = (score: number) => {
    if (score >= 85) return { category: "Excellent", color: "text-green-600", bgColor: "bg-green-50" };
    if (score >= 70) return { category: "Good", color: "text-blue-600", bgColor: "bg-blue-50" };
    if (score >= 55) return { category: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    if (score >= 40) return { category: "Needs Improvement", color: "text-orange-600", bgColor: "bg-orange-50" };
    return { category: "Poor", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const getRecommendations = (score: number) => {
    if (score >= 85) {
      return [
        "Maintain your excellent wellness routine",
        "Consider becoming a wellness mentor for others",
        "Continue with regular check-ins to sustain your progress",
        "Focus on stress management techniques"
      ];
    }
    if (score >= 70) {
      return [
        "Establish a more consistent sleep schedule",
        "Incorporate mindfulness or meditation practices",
        "Increase physical activity gradually",
        "Focus on nutritious meal planning"
      ];
    }
    if (score >= 55) {
      return [
        "Start with small, achievable wellness goals",
        "Consider working with a wellness coach",
        "Focus on improving sleep quality first",
        "Begin a gentle exercise routine"
      ];
    }
    if (score >= 40) {
      return [
        "Schedule a comprehensive health check-up",
        "Start with basic wellness fundamentals",
        "Consider professional guidance for lifestyle changes",
        "Focus on stress reduction techniques"
      ];
    }
    return [
      "Consult with healthcare professionals immediately",
      "Start with very basic wellness practices",
      "Focus on establishing healthy sleep patterns",
      "Consider comprehensive lifestyle restructuring"
    ];
  };

  const scoreData = getScoreCategory(score);
  const recommendations = getRecommendations(score);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Your Wellness Score</h1>
          <p className="text-primary-foreground/80">
            Based on your assessment responses
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Score Display */}
        <Card className="p-8 shadow-sm border-0 bg-card text-center">
          <div className="space-y-6">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="hsl(var(--muted))" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="8" 
                  strokeDasharray={`${score * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{score}%</div>
                  <div className="text-xs text-muted-foreground">Wellness</div>
                </div>
              </div>
            </div>

            <div>
              <Badge 
                variant="secondary" 
                className={`${scoreData.bgColor} ${scoreData.color} border-0 text-sm px-4 py-2`}
              >
                {scoreData.category}
              </Badge>
            </div>

            <Progress value={score} className="h-3" />
          </div>
        </Card>

        {/* Score Breakdown */}
        <Card className="p-6 shadow-sm border-0 bg-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Wellness Areas
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-accent/20">
              <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Physical Health</div>
              <div className="text-xs text-muted-foreground">Sleep, Energy, Exercise</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-accent/20">
              <Brain className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Mental Health</div>
              <div className="text-xs text-muted-foreground">Stress, Mood, Focus</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-accent/20">
              <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Lifestyle</div>
              <div className="text-xs text-muted-foreground">Habits, Routine</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-accent/20">
              <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-medium">Goals</div>
              <div className="text-xs text-muted-foreground">Satisfaction, Progress</div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 shadow-sm border-0 bg-card">
          <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
          
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-foreground flex-1">{recommendation}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center pt-4">
          <Button onClick={onContinue} size="lg" className="px-8">
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WellnessResults;