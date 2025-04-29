import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, History, MessageSquare, User } from 'lucide-react';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const NavigationItem = ({ icon, label, to, active }: NavigationItemProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex flex-col items-center justify-center py-2 px-4 w-1/4 transition-all ${
        active ? 'text-white' : 'text-gray-500'
      }`}
    >
      <div className="relative">
        {icon}
        {active && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const NavigationBar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 
        bg-black border-t border-gray-800 
        flex justify-around py-2 
        z-50
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <NavigationItem
        icon={<Home size={20} />}
        label="Home"
        to="/dashboard"
        active={pathname === '/dashboard'}
      />
      <NavigationItem
        icon={<History size={20} />}
        label="History"
        to="/history"
        active={pathname === '/history'}
      />
      <NavigationItem
        icon={<MessageSquare size={20} />}
        label="Feedback"
        to="/feedback"
        active={pathname === '/feedback'}
      />
      <NavigationItem
        icon={<User size={20} />}
        label="Profile"
        to="/profile"
        active={pathname === '/profile'}
      />
    </nav>
  );
};

export default NavigationBar;
