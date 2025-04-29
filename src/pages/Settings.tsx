
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Watch, FileText, LogOut, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  withSwitch?: boolean;
  initialChecked?: boolean;
  onToggle?: (checked: boolean) => void;
};

const SettingItem = ({ 
  icon, 
  title, 
  onClick, 
  withSwitch = false,
  initialChecked = false,
  onToggle
}: SettingItemProps) => {
  const [checked, setChecked] = useState(initialChecked);
  
  const handleToggle = (value: boolean) => {
    setChecked(value);
    if (onToggle) onToggle(value);
  };
  
  return (
    <div 
      className={`flex items-center justify-between p-4 border-b border-gray-800 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-4 text-white">
          {icon}
        </div>
        <span>{title}</span>
      </div>
      
      {withSwitch ? (
        <Switch 
          checked={checked} 
          onCheckedChange={handleToggle} 
          onClick={(e) => e.stopPropagation()}
        />
      ) : onClick ? (
        <ChevronRight size={18} className="text-gray-500" />
      ) : null}
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleToggleNotifications = (checked: boolean) => {
    toast({
      title: checked ? "Notificações ativadas" : "Notificações desativadas"
    });
  };
  
  const handleToggleWatch = (checked: boolean) => {
    if (checked) {
      toast({
        title: "Conectando smartwatch",
        description: "Procurando dispositivos próximos..."
      });
    } else {
      toast({
        title: "Smartwatch desconectado"
      });
    }
  };
  
  const handlePrivacyPolicy = () => {
    // Navigate to privacy policy
    toast({
      title: "Política de Privacidade",
      description: "Abrindo documento..."
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso."
    });
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-medium">Configurações</h1>
      </div>
      
      {/* Settings list */}
      <div className="mt-4">
        <SettingItem 
          icon={<Bell size={20} />} 
          title="Notificações" 
          withSwitch
          initialChecked={true}
          onToggle={handleToggleNotifications}
        />
        
        <SettingItem 
          icon={<Watch size={20} />} 
          title="Conectar Smartwatch" 
          withSwitch
          onToggle={handleToggleWatch}
        />
        
        <SettingItem 
          icon={<FileText size={20} />} 
          title="Política de Privacidade" 
          onClick={handlePrivacyPolicy}
        />
      </div>
      
      <div className="mt-8">
        <SettingItem 
          icon={<LogOut size={20} />} 
          title="Sair" 
          onClick={handleLogout}
        />
      </div>
      
      <div className="fixed bottom-4 left-0 right-0 text-center text-gray-500 text-xs">
        Kinesia v1.0.0
      </div>
    </div>
  );
};

export default Settings;
