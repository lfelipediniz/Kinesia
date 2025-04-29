
import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Calendar } from "lucide-react";

type WorkoutType = {
  id: number;
  exercise: string;
  date: string;
  quality: number;
  risk: "Baixo" | "Médio" | "Alto";
};

const History = () => {
  const navigate = useNavigate();

  // Mock workout history data
  const workouts: WorkoutType[] = [
    { id: 1, exercise: "Agachamento", date: "Hoje, 14:30", quality: 85, risk: "Baixo" },
    { id: 2, exercise: "Deadlift", date: "Ontem, 16:45", quality: 76, risk: "Médio" },
    { id: 3, exercise: "Press de Ombro", date: "24 Abr, 10:15", quality: 90, risk: "Baixo" },
    { id: 4, exercise: "Agachamento", date: "22 Abr, 18:30", quality: 65, risk: "Médio" },
    { id: 5, exercise: "Supino", date: "20 Abr, 11:00", quality: 60, risk: "Alto" }
  ];
  
  const getRiskElement = (risk: string) => {
    switch (risk) {
      case "Baixo":
        return <span className="flex items-center text-gray-300"><div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div> {risk}</span>;
      case "Médio":
        return <span className="flex items-center text-gray-300"><div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div> {risk}</span>;
      case "Alto":
        return <span className="flex items-center text-gray-300"><AlertTriangle size={14} className="mr-1" /> {risk}</span>;
      default:
        return risk;
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white pb-16 animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-xl font-medium">Histórico de Treinos</h1>
        <button>
          <Calendar size={20} />
        </button>
      </div>
      
      {/* Weekly graph summary */}
      <div className="p-4">
        <h2 className="text-lg font-medium mb-3">Evolução Semanal</h2>
        <Card className="bg-secondary border-gray-800 p-4">
          <div className="h-32 flex items-end justify-between">
            {[65, 70, 82, 75, 60, 85, 90].map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-muted mx-1" 
                  style={{ height: `${value * 0.3}%` }}
                />
                <span className="text-xs text-gray-400 mt-2">
                  {["S", "T", "Q", "Q", "S", "S", "D"][index]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Workout list */}
      <div className="px-4">
        <h2 className="text-lg font-medium mb-4">Treinos Recentes</h2>
        
        <div className="space-y-3">
          {workouts.map(workout => (
            <Card 
              key={workout.id}
              className="bg-secondary border-gray-800 p-4"
              onClick={() => navigate('/feedback', { 
                state: { 
                  quality: workout.quality, 
                  exercise: workout.exercise,
                  historyView: true
                }
              })}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{workout.exercise}</h3>
                  <p className="text-gray-400 text-sm">{workout.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{workout.quality}%</p>
                  <p className="text-sm">
                    {getRiskElement(workout.risk)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default History;
