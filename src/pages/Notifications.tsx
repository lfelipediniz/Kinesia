
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Info } from "lucide-react";

type NotificationType = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "alert" | "info" | "achievement";
};

const Notifications = () => {
  const navigate = useNavigate();
  
  // Mock notifications data
  const notifications: NotificationType[] = [
    {
      id: 1,
      title: "Alerta de Postura",
      message: "Detectamos um padrão de movimento que pode aumentar o risco de lesão no joelho.",
      time: "15 min atrás",
      read: false,
      type: "alert"
    },
    {
      id: 2,
      title: "Objetivo Alcançado!",
      message: "Você completou 10 treinos este mês. Continue assim!",
      time: "2 horas atrás",
      read: true,
      type: "achievement"
    },
    {
      id: 3,
      title: "Análise de Treino Disponível",
      message: "Seu relatório de treino da sessão de ontem está pronto.",
      time: "Ontem",
      read: true,
      type: "info"
    },
    {
      id: 4,
      title: "Novo Recurso",
      message: "Agora você pode conectar seu smartwatch para melhorar a precisão da análise.",
      time: "2 dias atrás",
      read: true,
      type: "info"
    }
  ];
  
  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell size={18} />;
      case "achievement":
        return <Bell size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-medium">Notificações</h1>
      </div>
      
      {/* Notification list */}
      {notifications.length > 0 ? (
        <div className="mt-2">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-4 border-b border-gray-800 ${
                !notification.read ? 'bg-secondary' : ''
              }`}
            >
              <div className="flex">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-400">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-60">
          <Bell size={40} className="text-gray-600 mb-4" />
          <p className="text-gray-400">Você não tem novas notificações</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
