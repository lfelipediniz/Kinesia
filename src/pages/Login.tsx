import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import KinesiaLogo from '@/components/KinesiaLogo';
import { useToast } from '@/components/ui/use-toast';
import { FcGoogle } from 'react-icons/fc'; // Ícone do Google
import { FaApple } from 'react-icons/fa';  // Ícone da Apple

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isLogin ? "Login realizado com sucesso" : "Conta criada",
      description: "Redirecionando para o aplicativo...",
    });

    setTimeout(() => {
      navigate(isLogin ? '/dashboard' : '/onboarding');
    }, 1000);
  };

  const handleFocus = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col">
      <div className="flex justify-center mt-10 mb-8">
        <KinesiaLogo size="md" animateIn={true} />
      </div>

      <h1 className="text-2xl font-medium text-white text-center mb-8">
        {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        {!isLogin && (
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-gray-800 pl-10 text-white"
                placeholder="Seu nome"
                onFocus={handleFocus}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-gray-800 pl-10 text-white"
              placeholder="seu@email.com"
              onFocus={handleFocus}
              inputMode="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary border-gray-800 pl-10 text-white"
              placeholder="••••••••"
              onFocus={handleFocus}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 mt-8"
        >
          {isLogin ? 'Entrar' : 'Criar Conta'}
          <ArrowRight size={18} />
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white ml-2 underline"
          >
            {isLogin ? 'Cadastre-se' : 'Entre'}
          </button>
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm">ou</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button variant="outline" className="bg-transparent border border-gray-800 hover:bg-secondary flex items-center justify-center gap-2">
          <FcGoogle size={20} />
          Google
        </Button>
        <Button variant="outline" className="bg-transparent border border-gray-800 hover:bg-secondary flex items-center justify-center gap-2">
          <FaApple size={20} />
          Apple
        </Button>
      </div>
    </div>
  );
};

export default Login;
