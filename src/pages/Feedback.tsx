
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, AlertTriangle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavigationBar from "@/components/NavigationBar";

type FeedbackItemProps = {
  text: string;
  type: "strength" | "improvement";
};

const FeedbackItem = ({ text, type }: FeedbackItemProps) => {
  return (
    <div className="flex items-center mb-4">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
        type === "strength" ? "bg-secondary" : "bg-secondary"
      }`}>
        {type === "strength" ? (
          <Check size={16} className="text-white" />
        ) : (
          <AlertTriangle size={16} className="text-white" />
        )}
      </div>
      <p className="text-gray-200">{text}</p>
    </div>
  );
};

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quality = 80, exercise = "Exercício", historyView = false } = location.state || {};
  
  // Mock feedback data
  const strengths = [
    "Bom alinhamento corporal durante todo o exercício",
    "Ritmo constante na execução dos movimentos",
    "Respiração sincronizada com os movimentos"
  ];
  
  const improvements = [
    "Aumentar o controle no ponto mais baixo do movimento",
    "Manter os joelhos alinhados com os pés durante todo o exercício",
    "Distribuir melhor o peso entre calcanhar e parte frontal do pé"
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={() => navigate(historyView ? '/history' : '/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Feedback do Treino</h1>
        <button>
          <Share2 size={20} />
        </button>
      </div>
      
      {/* Exercise summary */}
      <div className="p-4">
        <Card className="bg-secondary border-gray-800 p-4">
          <h2 className="text-xl font-medium mb-2">{exercise}</h2>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Qualidade</p>
              <p className="text-2xl font-semibold">{quality}%</p>
            </div>
            
            <div className="h-20 w-20 rounded-full border-4 border-primary flex items-center justify-center">
              <span className="text-xl font-medium">
                {quality >= 80 ? 'A' : quality >= 70 ? 'B' : quality >= 60 ? 'C' : 'D'}
              </span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Feedback sections */}
      <div className="px-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Pontos Fortes</h2>
          <div>
            {strengths.map((strength, index) => (
              <FeedbackItem key={index} text={strength} type="strength" />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Sugestões de Melhoria</h2>
          <div>
            {improvements.map((improvement, index) => (
              <FeedbackItem key={index} text={improvement} type="improvement" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Action buttons (only for non-history view) */}
      {!historyView && (
        <div className="p-4 mt-8">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Início
          </Button>
        </div>
      )}
      
      <NavigationBar />
    </div>
  );
};

export default Feedback;
