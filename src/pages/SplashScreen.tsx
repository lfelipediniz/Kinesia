
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KinesiaLogo from '@/components/KinesiaLogo';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    // Sequence the animations
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 300);
    
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 800);
    
    // Navigate after splash screen display
    const navigationTimer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className={`transition-all duration-1000 ease-in-out ${showLogo ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
        <KinesiaLogo size="lg" />
      </div>
      
      <h1 
        className={`mt-8 text-white text-3xl font-light tracking-wider transition-all duration-1000 ease-in-out ${
          showText ? 'opacity-100' : 'opacity-0'
        }`}
      >
        KINESIA
      </h1>
      
      <div className="absolute bottom-16 left-0 right-0 flex justify-center">
        <div className={`w-2 h-2 rounded-full bg-white mr-2 ${showText ? 'animate-pulse-subtle' : 'opacity-0'}`}></div>
        <div className={`w-2 h-2 rounded-full bg-white mr-2 ${showText ? 'animate-pulse-subtle animation-delay-100' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}></div>
        <div className={`w-2 h-2 rounded-full bg-white ${showText ? 'animate-pulse-subtle animation-delay-200' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
