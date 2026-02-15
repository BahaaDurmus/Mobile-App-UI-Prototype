import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Download, Wifi, Clock, Users, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ClaimScreen() {
  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [isEligible] = useState(true);
  
  const { poolStats, userStats, updateUserStats, addActivity, currentUser } = useAppContext();

  const handleClaim = (amount: number) => {
    setClaimedAmount(amount);
    
    // Add activity to global state
    addActivity({
      user: currentUser.name,
      amount: amount,
      type: 'claim',
      description: `${amount} GB internet talebi`
    });
    
    // Update user stats
    updateUserStats({
      totalClaimed: userStats.totalClaimed + amount,
      claimCount: userStats.claimCount + 1
    });
    
    setShowClaimDialog(true);
  };

  const claimOptions = [
    { amount: 1, description: '4 saatlik online ders', color: 'bg-blue-100 border-blue-300' },
    { amount: 2, description: '8 saatlik online ders', color: 'bg-green-100 border-green-300' },
    { amount: 5, description: '20 saatlik online ders', color: 'bg-purple-100 border-purple-300' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-[#F558DB] to-[#034EA2] rounded-full mx-auto flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Download className="text-white" size={32} />
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-[#034EA2] mb-2">Ücretsiz İnternet Al</h2>
          <p className="text-gray-600 leading-relaxed">
            Eğitim hayatın için gereken interneti buradan alabilirsin.
          </p>
        </div>
      </div>

      {/* Pool Status */}
      <Card className="border-2 border-[#FFC40C] bg-gradient-to-r from-[#FFC40C]/10 to-[#F558DB]/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wifi className="text-[#034EA2]" size={20} />
              <span className="font-semibold text-[#034EA2]">Havuz Durumu</span>
            </div>
            <Badge className="bg-[#F558DB] text-white">
              <span className="animate-pulse">●</span>
              <span className="ml-1">Aktif</span>
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <motion.p 
                className="text-3xl font-bold text-[#034EA2]"
                key={poolStats.totalGB}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {poolStats.totalGB.toFixed(1)}
                <span className="text-lg ml-1">GB</span>
              </motion.p>
              <p className="text-sm text-gray-600">Mevcut</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#F558DB]">
                {poolStats.activeUsers}
              </p>
              <p className="text-sm text-gray-600">Aktif Kullanıcı</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eligibility Status */}
      {isEligible ? (
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <p className="font-semibold text-green-800">Uygun Durumdasın!</p>
            <p className="text-sm text-green-600">Eğitim amaçlı internet talep edebilirsin.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border-2 border-orange-200">
          <Clock className="text-orange-600" size={24} />
          <div>
            <p className="font-semibold text-orange-800">Bekleme Süresi</p>
            <p className="text-sm text-orange-600">2 saat sonra tekrar talep edebilirsin.</p>
          </div>
        </div>
      )}

      {/* Claim Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-[#034EA2]">İhtiyacın Olan Miktarı Seç</h3>
        
        {claimOptions.map((option, index) => (
          <motion.div
            key={option.amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`cursor-pointer border-2 ${option.color} hover:shadow-lg transition-all`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-[#034EA2]">
                      {option.amount} GB
                    </p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  <Button
                    onClick={() => handleClaim(option.amount)}
                    disabled={!isEligible}
                    className="bg-[#034EA2] hover:bg-[#034EA2]/90 text-white px-6"
                  >
                    Al
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-[#034EA2]" size={20} />
            <span className="font-semibold text-[#034EA2]">Son Aktiviteler</span>
          </div>
          <div className="space-y-2">
            {[
              { user: 'Ahmet K.', amount: '2 GB', time: '5 dk önce' },
              { user: 'Zeynep M.', amount: '1 GB', time: '12 dk önce' },
              { user: 'Mehmet T.', amount: '5 GB', time: '25 dk önce' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-[#034EA2] border-[#034EA2]">
                  {activity.amount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claim Confirmation Dialog */}
      <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-[#FFC40C] rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <CheckCircle className="text-[#034EA2]" size={32} />
              </motion.div>
              İnternet Alındı!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              <span className="font-bold text-[#034EA2]">{claimedAmount} GB</span> internetin 
              hesabına eklendi.
            </p>
            <p className="text-sm text-gray-500">
              Bu internet ile yaklaşık {claimedAmount * 4} saat online eğitim alabilirsin.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowClaimDialog(false)}
                className="flex-1 bg-[#FFC40C] hover:bg-[#FFC40C]/90 text-[#034EA2] font-semibold"
              >
                Teşekkürler!
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}