import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, Activity } from "lucide-react";

// Sample data showing dosha balance over time
const doshaData = [
  {
    date: 'Week 1',
    Vata: 45,
    Pitta: 35,
    Kapha: 20,
    timestamp: '2024-01-01'
  },
  {
    date: 'Week 2', 
    Vata: 42,
    Pitta: 38,
    Kapha: 20,
    timestamp: '2024-01-08'
  },
  {
    date: 'Week 3',
    Vata: 40,
    Pitta: 40,
    Kapha: 20,
    timestamp: '2024-01-15'
  },
  {
    date: 'Week 4',
    Vata: 38,
    Pitta: 42,
    Kapha: 20,
    timestamp: '2024-01-22'
  },
  {
    date: 'Week 5',
    Vata: 35,
    Pitta: 45,
    Kapha: 20,
    timestamp: '2024-01-29'
  },
  {
    date: 'Week 6',
    Vata: 33,
    Pitta: 47,
    Kapha: 20,
    timestamp: '2024-02-05'
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="font-medium">{entry.dataKey}:</span> {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DoshaProgressTracker = () => {
  // Get current dosha percentages (latest data point)
  const currentData = doshaData[doshaData.length - 1];
  const dominantDosha = Object.entries(currentData)
    .filter(([key]) => ['Vata', 'Pitta', 'Kapha'].includes(key))
    .reduce((a, b) => a[1] > b[1] ? a : b)[0];

  // Calculate trends
  const getTrend = (doshaName: string) => {
    const firstValue = doshaData[0][doshaName as keyof typeof doshaData[0]] as number;
    const lastValue = currentData[doshaName as keyof typeof currentData] as number;
    const change = lastValue - firstValue;
    return {
      direction: change > 0 ? 'increasing' : change < 0 ? 'decreasing' : 'stable',
      change: Math.abs(change)
    };
  };

  const vataColor = "#f59e0b"; // Yellow for Vata (from tailwind.config)
  const pittaColor = "#f97316"; // Orange for Pitta  
  const kaphaColor = "#3b82f6"; // Blue for Kapha

  return (
    <Card className="shadow-sm border-0 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Dosha Balance Trends
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Dominant: {dominantDosha} ({currentData[dominantDosha as keyof typeof currentData]}%)
          </Badge>
          <Badge variant="secondary" className="text-xs bg-primary-light text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            6 week trend
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={doshaData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                domain={[0, 60]}
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="Vata" 
                stroke={vataColor}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="Pitta" 
                stroke={pittaColor}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="Kapha" 
                stroke={kaphaColor}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Summary */}
        <div className="grid grid-cols-3 gap-4">
          {['Vata', 'Pitta', 'Kapha'].map((dosha) => {
            const trend = getTrend(dosha);
            const currentValue = currentData[dosha as keyof typeof currentData] as number;
            const color = dosha === 'Vata' ? vataColor : dosha === 'Pitta' ? pittaColor : kaphaColor;
            
            return (
              <div key={dosha} className="text-center p-3 rounded-lg bg-secondary/30">
                <div className="font-medium text-sm mb-1" style={{ color }}>
                  {dosha}
                </div>
                <div className="text-lg font-bold mb-1">
                  {currentValue}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {trend.direction === 'increasing' && '↗ '}
                  {trend.direction === 'decreasing' && '↘ '}
                  {trend.direction === 'stable' && '→ '}
                  {trend.change}% change
                </div>
              </div>
            );
          })}
        </div>

        {/* Insight */}
        <div className="mt-4 p-3 bg-primary-light/30 rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Insight:</span> Your {dominantDosha} constitution is currently dominant. 
            {dominantDosha === 'Pitta' && ' Focus on cooling foods and stress management.'}
            {dominantDosha === 'Vata' && ' Incorporate grounding practices and warm, nourishing foods.'}
            {dominantDosha === 'Kapha' && ' Add energizing activities and light, spicy foods to your routine.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoshaProgressTracker;