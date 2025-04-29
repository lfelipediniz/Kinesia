
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Settings, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/NavigationBar";
import KinesiaLogo from "@/components/KinesiaLogo";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [exerciseProgress] = useState(85);
  
  // Mock data for recent workouts
  const recentWorkouts = [
    { id: 1, name: "Squat", date: "Hoje", quality: 90, risk: "Baixo" },
    { id: 2, name: "Deadlift", date: "Ontem", quality: 76, risk: "Médio" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-16 animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <KinesiaLogo size="sm" className="mr-2" />
          <span className="font-medium">Kinesia</span>
        </div>
        
        <div className="flex space-x-4">
          <button onClick={() => navigate('/notifications')}>
            <Bell size={20} />
          </button>
          <button onClick={() => navigate('/settings')}>
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {/* Welcome section */}
      <div className="px-4 py-6">
        <h1 className="text-xl font-medium">Olá, Atleta</h1>
        <p className="text-gray-400 mt-1">Seu resumo de treino</p>
      </div>
      
      {/* Performance metrics */}
      <div className="px-4 mb-8">
        <Card className="bg-secondary border-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">Qualidade da Execução</h2>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Pontuação</span>
            <span className="text-xl font-semibold">{exerciseProgress}%</span>
          </div>
          
          <Progress value={exerciseProgress} className="h-2 bg-gray-800" />
          
          <div className="mt-6 flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Treinos</p>
              <p className="text-xl font-medium">12</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Risco de Lesão</p>
              <p className="text-xl font-medium">Baixo</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Evolução</p>
              <p className="text-xl font-medium">+8%</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Start training button */}
      <div className="px-4 mb-8">
        <Button 
          onClick={() => navigate('/exercise')}
          className="w-full py-6"
        >
          <Play size={18} className="mr-2" /> Iniciar Treino
        </Button>
      </div>
      
      {/* Recent workouts */}
      <div className="px-4">
        <h2 className="text-lg font-medium mb-4">Treinos Recentes</h2>
        
        <div className="space-y-3">
          {recentWorkouts.map(workout => (
            <Card 
              key={workout.id}
              className="bg-secondary border-gray-800 p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{workout.name}</h3>
                <p className="text-gray-400 text-sm">{workout.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{workout.quality}%</p>
                <p className={`text-sm ${
                  workout.risk === "Baixo" ? "text-gray-300" : 
                  workout.risk === "Médio" ? "text-gray-300" : "text-gray-300"
                }`}>
                  Risco {workout.risk}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Navigation bar */}
      <NavigationBar />
    </div>
  );
};

export default Dashboard;
