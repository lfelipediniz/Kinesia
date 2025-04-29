
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type FeedbackType = "correct" | "warning" | "neutral";

const Exercise = () => {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("neutral");
  const [feedbackMessage, setFeedbackMessage] = useState("Preparando análise...");
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  
  // Simulate exercise analysis with changing feedback
  useEffect(() => {
    const feedbackCycle = [
      { type: "neutral", message: "Posicione-se para começar" },
      { type: "correct", message: "Boa postura! Continue" },
      { type: "warning", message: "Eleve mais o cotovelo" },
      { type: "correct", message: "Excelente correção!" },
      { type: "correct", message: "Mantenha o ritmo" },
      { type: "warning", message: "Ajuste a coluna" },
      { type: "correct", message: "Perfeito!" }
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      const feedback = feedbackCycle[currentIndex % feedbackCycle.length];
      setFeedbackType(feedback.type as FeedbackType);
      setFeedbackMessage(feedback.message);
      currentIndex += 1;
      
      // Update progress
      setProgress(prev => Math.min(prev + 12, 100));
      
      // Update quality score based on feedback
      setQuality(prev => {
        const change = feedback.type === "correct" ? 2 : feedback.type === "warning" ? -1 : 0;
        return Math.min(Math.max(prev + change, 0), 100);
      });
      
      // Update exercise time (in seconds)
      setExerciseTime(prev => prev + 2);
      
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleEndExercise = () => {
    navigate("/feedback", { 
      state: { 
        quality, 
        duration: exerciseTime,
        exercise: "Agachamento" 
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Agachamento</h1>
        <div className="w-5"></div> {/* Empty div for alignment */}
      </div>
      
      {/* Exercise timer */}
      <div className="p-4 flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">Tempo</p>
          <p className="text-lg">{Math.floor(exerciseTime / 60)}:{(exerciseTime % 60).toString().padStart(2, '0')}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Qualidade</p>
          <p className="text-lg">{quality}%</p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="px-4 mb-4">
        <Progress value={progress} className="h-2 bg-gray-800" />
      </div>
      
      {/* Main feedback area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className={`h-32 w-32 rounded-full flex items-center justify-center mb-8 ${
          feedbackType === "correct" ? "bg-secondary border-2 border-primary animate-pulse-subtle" : 
          feedbackType === "warning" ? "bg-secondary border-2 border-gray-400" : 
          "bg-secondary"
        }`}>
          {feedbackType === "correct" && <Check size={60} />}
          {feedbackType === "warning" && <AlertTriangle size={60} className="text-gray-300" />}
        </div>
        
        <h2 className={`text-2xl font-medium text-center mb-2 ${
          feedbackType === "warning" ? "text-gray-300" : "text-white"
        }`}>
          {feedbackMessage}
        </h2>
        
        {feedbackType === "warning" && (
          <p className="text-gray-400 text-center">Siga a orientação para melhorar sua técnica</p>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="p-4 mt-auto">
        <Button 
          variant="default" 
          className="w-full mb-3"
          onClick={handleEndExercise}
        >
          Finalizar Treino
        </Button>
        
        <Button 
          variant="outline"
          className="w-full bg-transparent border border-gray-800"
          onClick={() => navigate('/dashboard')}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Exercise;
