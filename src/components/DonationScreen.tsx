import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Heart, Wifi, GraduationCap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function DonationScreen() {
  const [selectedGB, setSelectedGB] = useState([3]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { poolStats, userStats, updateUserStats, addActivity, currentUser, updateLeaderboard } = useAppContext();

  const handleDonate = () => {
    setIsAnimating(true);
    setTimeout(() => {
      // Add activity to global state
      addActivity({
        user: currentUser.name,
        amount: selectedGB[0],
        type: 'donation',
        description: `${selectedGB[0]} GB internet bağışı`
      });
      
      // Update user stats
      updateUserStats({
        totalDonated: userStats.totalDonated + selectedGB[0],
        donationCount: userStats.donationCount + 1
      });
      
      // Update leaderboard
      updateLeaderboard();
      
      setShowConfirmation(true);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-[#034EA2] to-[#F558DB] rounded-full mx-auto flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="text-white" size={32} />
        </motion.div>
        
        <div>
          <h2 className="text-2xl font-bold text-[#034EA2] mb-2">İnternet Bağışla</h2>
          <p className="text-gray-600 leading-relaxed">
            Eğitim eşitliği için internetini paylaş. Senin fazlan, onların fırsatı olsun.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-[#034EA2] to-[#034EA2]/80 p-4 rounded-2xl text-white">
          <GraduationCap size={24} className="mb-2" />
          <p className="text-2xl font-bold">{poolStats.activeUsers.toLocaleString()}</p>
          <p className="text-sm opacity-90">Aktif kullanıcı</p>
        </div>
        <div className="bg-gradient-to-r from-[#F558DB] to-[#F558DB]/80 p-4 rounded-2xl text-white">
          <Wifi size={24} className="mb-2" />
          <p className="text-2xl font-bold">{poolStats.totalGB.toFixed(1)} GB</p>
          <p className="text-sm opacity-90">Toplam havuz</p>
        </div>
      </div>

      {/* Donation Amount Selector */}
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Bağışlamak istediğin internet miktarı</p>
          <motion.div 
            className="text-6xl font-bold text-[#034EA2] mb-2"
            key={selectedGB[0]}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedGB[0]}
            <span className="text-xl ml-2">GB</span>
          </motion.div>
          <p className="text-sm text-gray-500">
            {selectedGB[0] * 25} saat online ders imkanı
          </p>
        </div>

        <div className="px-4">
          <Slider
            value={selectedGB}
            onValueChange={setSelectedGB}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1 GB</span>
            <span>10 GB</span>
          </div>
        </div>
      </div>

      {/* Quick Selection */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Hızlı seçim:</p>
        <div className="flex gap-2">
          {[1, 3, 5, 10].map((gb) => (
            <button
              key={gb}
              onClick={() => setSelectedGB([gb])}
              className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                selectedGB[0] === gb
                  ? 'border-[#034EA2] bg-[#034EA2] text-white'
                  : 'border-gray-200 text-gray-600 hover:border-[#034EA2]'
              }`}
            >
              {gb} GB
            </button>
          ))}
        </div>
      </div>

      {/* Donate Button */}
      <motion.div
        animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0 }}
      >
        <Button
          onClick={handleDonate}
          disabled={isAnimating}
          className="w-full bg-[#034EA2] hover:bg-[#034EA2]/90 text-white py-4 rounded-2xl text-lg font-semibold"
        >
          {isAnimating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Bağışla'
          )}
        </Button>
      </motion.div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-[#FFC40C] rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Heart className="text-[#034EA2]" size={32} />
              </motion.div>
              Bağışın Tamamlandı!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              <span className="font-bold text-[#034EA2]">{selectedGB[0]} GB</span> internetin 
              eğitim havuzuna eklendi.
            </p>
            <p className="text-sm text-gray-500">
              Bu bağışla yaklaşık {selectedGB[0] * 25} saat online eğitim imkanı sağladın.
            </p>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-[#FFC40C] hover:bg-[#FFC40C]/90 text-[#034EA2] font-semibold"
            >
              Harika!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}