import React from 'react';
import { motion } from 'motion/react';
import { Gift, Download, BarChart3, User } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export default function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const navItems = [
    { id: 'donation', icon: Gift, label: 'Bağışla' },
    { id: 'claim', icon: Download, label: 'Al' },
    { id: 'dashboard', icon: BarChart3, label: 'Havuz' },
    { id: 'profile', icon: User, label: 'Profil' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className="flex flex-col items-center py-2 px-4 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#034EA2] rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10">
                <Icon 
                  size={20} 
                  className={isActive ? 'text-white' : 'text-gray-500'} 
                />
                <span className={`text-xs mt-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}