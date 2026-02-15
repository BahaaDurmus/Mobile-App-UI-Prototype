import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DonationScreen from './components/DonationScreen';
import ClaimScreen from './components/ClaimScreen';
import PoolDashboard from './components/PoolDashboard';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('donation');

  const screens = {
    donation: <DonationScreen />,
    claim: <ClaimScreen />,
    dashboard: <PoolDashboard />,
    profile: <UserProfile />
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        {/* Mobile Container */}
        <div className="max-w-sm mx-auto bg-white shadow-xl min-h-screen relative">
          {/* Header */}
          <div className="bg-[#034EA2] text-white p-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Askıdanet</h1>
              <p className="text-sm opacity-90">İnternet Paylaşım Platformu</p>
            </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/AMBLEM_SARI.webp" 
              alt="Askıdanet Amblem" 
              className="w-full h-full object-cover"
            />
          </div>
          </div>

          {/* Screen Content */}
          <div className="pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {screens[currentScreen]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
        </div>
      </div>
    </AppProvider>
  );
}