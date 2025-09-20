import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Leaf, Heart, Droplets, ArrowRight } from "lucide-react";

interface DoshaResultsProps {
  onContinue: () => void;
  assessmentResults?: Record<string, string>;
}

const DoshaResults = ({ onContinue, assessmentResults }: DoshaResultsProps) => {
  // Calculate dosha scores based on assessment results
  const calculateDoshaScores = () => {
    if (!assessmentResults) {
      // Default results for demo
      return { vata: 40, pitta: 35, kapha: 25 };
    }

    const doshaCount = { vata: 0, pitta: 0, kapha: 0 };
    const questions = [
      {
        id: "bodyType",
        options: [
          { value: "thin", dosha: "vata" },
          { value: "medium", dosha: "pitta" },
          { value: "large", dosha: "kapha" }
        ]
      },
      {
        id: "appetite",
        options: [
          { value: "irregular", dosha: "vata" },
          { value: "strong", dosha: "pitta" },
          { value: "steady", dosha: "kapha" }
        ]
      },
      {
        id: "sleep",
        options: [
          { value: "light", dosha: "vata" },
          { value: "sound", dosha: "pitta" },
          { value: "deep", dosha: "kapha" }
        ]
      },
      {
        id: "stress",
        options: [
          { value: "worry", dosha: "vata" },
          { value: "irritable", dosha: "pitta" },
          { value: "withdrawn", dosha: "kapha" }
        ]
      },
      {
        id: "energy",
        options: [
          { value: "bursts", dosha: "vata" },
          { value: "consistent", dosha: "pitta" },
          { value: "steady", dosha: "kapha" }
        ]
      }
    ];

    questions.forEach(question => {
      const answer = assessmentResults[question.id];
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        doshaCount[option.dosha as keyof typeof doshaCount]++;
      }
    });

    const total = doshaCount.vata + doshaCount.pitta + doshaCount.kapha;
    return {
      vata: Math.round((doshaCount.vata / total) * 100),
      pitta: Math.round((doshaCount.pitta / total) * 100),
      kapha: Math.round((doshaCount.kapha / total) * 100)
    };
  };

  const scores = calculateDoshaScores();
  const dominantDosha = Object.entries(scores).reduce((a, b) => scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b)[0];

  const chartData = [
    { name: 'Vata', percentage: scores.vata, color: 'hsl(var(--vata))' },
    { name: 'Pitta', percentage: scores.pitta, color: 'hsl(var(--pitta))' },
    { name: 'Kapha', percentage: scores.kapha, color: 'hsl(var(--kapha))' }
  ];

  const doshaInfo = {
    vata: {
      icon: Droplets,
      description: "Air & Space - Movement and creativity",
      dietTips: ["Warm, cooked foods", "Regular meal times", "Sweet, sour, salty tastes"],
      lifestyleTips: ["Regular sleep schedule", "Gentle exercise like yoga", "Stress reduction practices"]
    },
    pitta: {
      icon: Heart,
      description: "Fire & Water - Transformation and metabolism",
      dietTips: ["Cool, fresh foods", "Avoid spicy foods", "Sweet, bitter, astringent tastes"],
      lifestyleTips: ["Moderate exercise", "Cool environment", "Avoid overheating"]
    },
    kapha: {
      icon: Leaf,
      description: "Earth & Water - Structure and stability",
      dietTips: ["Light, warm foods", "Spicy and bitter tastes", "Avoid heavy, oily foods"],
      lifestyleTips: ["Vigorous exercise", "Early rising", "Stimulating activities"]
    }
  };

  const dominant = doshaInfo[dominantDosha as keyof typeof doshaInfo];
  const DominantIcon = dominant.icon;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Prakriti Results</h1>
          <p className="text-muted-foreground">Discover your unique Ayurvedic constitution</p>
        </div>

        {/* Dosha Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DominantIcon className="h-5 w-5 text-primary" />
              Your Dosha Distribution
            </CardTitle>
            <CardDescription>
              Your dominant dosha is <Badge variant="secondary" className="mx-1">{dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1)}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name.toLowerCase() === dominantDosha ? 'hsl(var(--primary))' : entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {chartData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{item.percentage}%</div>
                  <div className="text-sm text-muted-foreground">{item.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dominant Dosha Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DominantIcon className="h-5 w-5 text-primary" />
              Your Dominant Dosha: {dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1)}
            </CardTitle>
            <CardDescription>{dominant.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  🥗 Dietary Recommendations
                </h4>
                <ul className="space-y-2">
                  {dominant.dietTips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  🧘 Lifestyle Recommendations
                </h4>
                <ul className="space-y-2">
                  {dominant.lifestyleTips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={onContinue}
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3"
            size="lg"
          >
            Continue to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoshaResults;