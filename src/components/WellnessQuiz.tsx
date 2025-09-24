import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface WellnessQuizProps {
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

const WellnessQuiz = ({ onBack, onComplete }: WellnessQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "How would you rate your energy levels throughout the day?",
      options: [
        { text: "Very low - I feel tired most of the time", score: 1 },
        { text: "Low - I often feel sluggish", score: 2 },
        { text: "Moderate - Some ups and downs", score: 3 },
        { text: "Good - Generally energetic", score: 4 },
        { text: "Excellent - High energy all day", score: 5 }
      ]
    },
    {
      id: 2,
      question: "How well do you sleep at night?",
      options: [
        { text: "Very poorly - Frequent insomnia", score: 1 },
        { text: "Poorly - Often restless", score: 2 },
        { text: "Average - Some good, some bad nights", score: 3 },
        { text: "Well - Usually restful", score: 4 },
        { text: "Excellently - Deep, refreshing sleep", score: 5 }
      ]
    },
    {
      id: 3,
      question: "How often do you feel stressed or anxious?",
      options: [
        { text: "Almost always - Constant stress", score: 1 },
        { text: "Often - Frequently stressed", score: 2 },
        { text: "Sometimes - Manageable stress levels", score: 3 },
        { text: "Rarely - Generally calm", score: 4 },
        { text: "Never - Very peaceful and balanced", score: 5 }
      ]
    },
    {
      id: 4,
      question: "How is your digestion and appetite?",
      options: [
        { text: "Very poor - Frequent digestive issues", score: 1 },
        { text: "Poor - Often uncomfortable", score: 2 },
        { text: "Average - Some issues occasionally", score: 3 },
        { text: "Good - Generally comfortable", score: 4 },
        { text: "Excellent - No digestive problems", score: 5 }
      ]
    },
    {
      id: 5,
      question: "How would you describe your overall mood?",
      options: [
        { text: "Very low - Often sad or irritable", score: 1 },
        { text: "Low - Frequently down", score: 2 },
        { text: "Neutral - Neither happy nor sad", score: 3 },
        { text: "Good - Generally positive", score: 4 },
        { text: "Excellent - Very happy and content", score: 5 }
      ]
    },
    {
      id: 6,
      question: "How often do you exercise or engage in physical activity?",
      options: [
        { text: "Never - Completely sedentary", score: 1 },
        { text: "Rarely - Less than once a week", score: 2 },
        { text: "Sometimes - 1-2 times per week", score: 3 },
        { text: "Regularly - 3-4 times per week", score: 4 },
        { text: "Daily - Every day", score: 5 }
      ]
    },
    {
      id: 7,
      question: "How would you rate your mental clarity and focus?",
      options: [
        { text: "Very poor - Constant brain fog", score: 1 },
        { text: "Poor - Often unfocused", score: 2 },
        { text: "Average - Some good and bad days", score: 3 },
        { text: "Good - Generally clear thinking", score: 4 },
        { text: "Excellent - Sharp and focused", score: 5 }
      ]
    },
    {
      id: 8,
      question: "How satisfied are you with your current health habits?",
      options: [
        { text: "Very unsatisfied - Need major changes", score: 1 },
        { text: "Unsatisfied - Room for improvement", score: 2 },
        { text: "Neutral - Some good, some bad habits", score: 3 },
        { text: "Satisfied - Mostly healthy choices", score: 4 },
        { text: "Very satisfied - Excellent habits", score: 5 }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (score: number) => {
    setSelectedOption(score);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate final score
        const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
        const maxScore = questions.length * 5;
        const percentage = Math.round((totalScore / maxScore) * 100);
        onComplete(percentage);
      }
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Wellness Assessment</h1>
              <p className="text-primary-foreground/80">
                Answer these questions to get your personalized wellness score
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-primary-foreground/80">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8 shadow-sm border-0 bg-card">
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                Question {currentQuestion + 1}
              </Badge>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option.score)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedOption === option.score
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{option.text}</span>
                    {selectedOption === option.score && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-6">
              <Button 
                onClick={handleNext}
                disabled={selectedOption === null}
                size="lg"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WellnessQuiz;