
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Shield, MessageCircle, Settings } from 'lucide-react';

type OnboardingStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const OnboardingSteps: OnboardingStep[] = [
  {
    title: "Corrija seus movimentos e evite lesões",
    description: "Nosso sistema de análise detecta e corrige movimentos inadequados em tempo real.",
    icon: <Check size={40} className="text-white" />
  },
  {
    title: "Treine com mais segurança",
    description: "Monitore seu risco de lesões e adapte seus treinos para maior segurança.",
    icon: <Shield size={40} className="text-white" />
  },
  {
    title: "Receba feedback em tempo real",
    description: "Orientações precisas durante o exercício para maximizar seus resultados.",
    icon: <MessageCircle size={40} className="text-white" />
  },
  {
    title: "Personalize seu treino com inteligência",
    description: "Ajustes dinâmicos baseados no seu progresso e histórico de exercícios.",
    icon: <Settings size={40} className="text-white" />
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepVisible, setStepVisible] = useState(true);

  // Handle step transitions with animation
  const nextStep = () => {
    setStepVisible(false);
    
    setTimeout(() => {
      if (currentStep < OnboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        navigate('/dashboard');
      }
      setStepVisible(true);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Step content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div 
          className={`transition-all duration-300 ease-in-out transform ${
            stepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
              {OnboardingSteps[currentStep].icon}
            </div>
          </div>
          
          <h1 className="text-2xl font-medium text-white text-center mb-4">
            {OnboardingSteps[currentStep].title}
          </h1>
          
          <p className="text-gray-400 text-center mb-8">
            {OnboardingSteps[currentStep].description}
          </p>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {OnboardingSteps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentStep ? 'bg-white w-4' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      
      {/* Action button */}
      <div className="px-6 mb-10">
        <Button 
          onClick={nextStep}
          className="w-full flex items-center justify-center gap-2"
        >
          {currentStep < OnboardingSteps.length - 1 ? 'Próximo' : 'Começar'}
          <ArrowRight size={18} />
        </Button>
        
        {currentStep < OnboardingSteps.length - 1 && (
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full text-gray-400 text-sm mt-4"
          >
            Pular introdução
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
