import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface DoshaAssessmentProps {
  onBack: () => void;
  onComplete?: (results: Record<string, string>) => void;
}

const questions = [
  {
    id: "bodyType",
    question: "What best describes your body type?",
    options: [
      { value: "thin", label: "Thin, light frame with prominent joints", dosha: "vata" },
      { value: "medium", label: "Medium build with good muscle development", dosha: "pitta" },
      { value: "large", label: "Large, solid frame with tendency to gain weight", dosha: "kapha" }
    ]
  },
  {
    id: "appetite",
    question: "How would you describe your appetite?",
    options: [
      { value: "irregular", label: "Irregular, sometimes forget to eat", dosha: "vata" },
      { value: "strong", label: "Strong, get irritable when hungry", dosha: "pitta" },
      { value: "steady", label: "Steady, can skip meals easily", dosha: "kapha" }
    ]
  },
  {
    id: "sleep",
    question: "What's your sleep pattern like?",
    options: [
      { value: "light", label: "Light sleeper, easily disturbed", dosha: "vata" },
      { value: "sound", label: "Sound sleeper, moderate duration", dosha: "pitta" },
      { value: "deep", label: "Deep sleeper, need 8+ hours", dosha: "kapha" }
    ]
  },
  {
    id: "stress",
    question: "How do you typically handle stress?",
    options: [
      { value: "worry", label: "Tend to worry and feel anxious", dosha: "vata" },
      { value: "irritable", label: "Become irritable and impatient", dosha: "pitta" },
      { value: "withdrawn", label: "Become withdrawn and lethargic", dosha: "kapha" }
    ]
  },
  {
    id: "energy",
    question: "How would you describe your energy levels?",
    options: [
      { value: "bursts", label: "High energy in bursts, then fatigue", dosha: "vata" },
      { value: "consistent", label: "Consistent, high energy throughout day", dosha: "pitta" },
      { value: "steady", label: "Steady, slow to start but good endurance", dosha: "kapha" }
    ]
  }
];

const DoshaAssessment = ({ onBack, onComplete }: DoshaAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canGoNext = answers[questions[currentQuestion]?.id];
  const canGoPrevious = currentQuestion > 0;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
      onComplete?.(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">
              Assessment Complete!
            </CardTitle>
            <CardDescription>
              Your Prakriti analysis has been completed. Your personalized results are being processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={onBack} className="bg-primary hover:bg-primary-hover text-primary-foreground">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">Dosha Assessment</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              {question.question}
            </CardTitle>
            <CardDescription>
              Choose the option that best describes you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {question.options.map((option) => (
                <div 
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer text-foreground"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
            {currentQuestion < questions.length - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoshaAssessment;