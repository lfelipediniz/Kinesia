
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("Atleta");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("70");
  const [injuries, setInjuries] = useState("");
  const [trainingMode, setTrainingMode] = useState("preventive");
  
  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso."
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-medium">Perfil</h1>
        <button onClick={() => navigate('/settings')}>
          <Settings size={20} />
        </button>
      </div>
      
      {/* Profile picture */}
      <div className="flex justify-center my-6">
        <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-2xl font-medium">{name.charAt(0)}</span>
        </div>
      </div>
      
      {/* Form */}
      <form className="px-4 space-y-6">
        <div>
          <label htmlFor="name" className="text-sm text-gray-300 block mb-2">
            Nome
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary border-gray-800 text-white"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="height" className="text-sm text-gray-300 block mb-2">
              Altura (cm)
            </label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-secondary border-gray-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="weight" className="text-sm text-gray-300 block mb-2">
              Peso (kg)
            </label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-secondary border-gray-800 text-white"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="injuries" className="text-sm text-gray-300 block mb-2">
            Histórico de Lesões
          </label>
          <Textarea
            id="injuries"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            placeholder="Descreva lesões anteriores"
            className="bg-secondary border-gray-800 text-white h-24"
          />
        </div>
        
        <div>
          <p className="text-sm text-gray-300 mb-2">Modo de Treinamento</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-3 rounded-md border ${
                trainingMode === "preventive" 
                  ? "border-primary bg-secondary" 
                  : "border-gray-700 bg-transparent"
              }`}
              onClick={() => setTrainingMode("preventive")}
            >
              Preventivo
            </button>
            <button
              type="button"
              className={`p-3 rounded-md border ${
                trainingMode === "performance" 
                  ? "border-primary bg-secondary" 
                  : "border-gray-700 bg-transparent"
              }`}
              onClick={() => setTrainingMode("performance")}
            >
              Performance
            </button>
          </div>
        </div>
        
        <Button 
          type="button" 
          className="w-full"
          onClick={handleSave}
        >
          Salvar
        </Button>
      </form>
      
      <NavigationBar />
    </div>
  );
};

export default Profile;
