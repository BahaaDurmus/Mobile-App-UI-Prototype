import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Heart, Gift, Calendar, Award, TrendingUp, Star, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function UserProfile() {
  const { userStats, currentUser, activities } = useAppContext();
  
  // Format time ago
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Az önce';
    if (diffInMinutes < 60) return `${diffInMinutes} dk önce`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} gün önce`;
  };

  // Get user's activities (filter by current user)
  const userActivities = activities.filter(activity => activity.user === currentUser.name);

  const achievements = [
    { 
      id: 1, 
      name: 'İlk Bağış', 
      description: 'İlk internetini paylaştın', 
      icon: Heart, 
      color: 'bg-[#F558DB]',
      earned: true 
    },
    { 
      id: 2, 
      name: 'Cömert Kalp', 
      description: '10+ bağış yaptın', 
      icon: Gift, 
      color: 'bg-[#034EA2]',
      earned: true 
    },
    { 
      id: 3, 
      name: 'Altın Destekçi', 
      description: '50+ GB bağışladın', 
      icon: Award, 
      color: 'bg-[#FFC40C]',
      earned: true 
    },
    { 
      id: 4, 
      name: 'Eğitim Kahramanı', 
      description: '100+ GB bağışla', 
      icon: Star, 
      color: 'bg-purple-500',
      earned: false 
    },
    { 
      id: 5, 
      name: 'Topluluk Lideri', 
      description: '50+ kişiyi davet et', 
      icon: Users, 
      color: 'bg-green-500',
      earned: false 
    },
    { 
      id: 6, 
      name: 'Süreklilik', 
      description: '30 gün üst üste bağış', 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      earned: false 
    }
  ];

  const monthlyStats = {
    January: { donated: 23.5, claimed: 4.2, days: 31 },
    December: { donated: 18.7, claimed: 6.1, days: 31 },
    November: { donated: 5.3, claimed: 2.0, days: 30 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <Avatar className="w-20 h-20 mx-auto border-4 border-[#FFC40C]">
            <AvatarFallback className="bg-[#034EA2] text-white text-xl font-bold">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        <div>
          <h2 className="text-2xl font-bold text-[#034EA2]">{currentUser.name}</h2>
          <Badge className="bg-[#FFC40C] text-[#034EA2] font-semibold">
            {currentUser.level}
          </Badge>
          <p className="text-gray-600 mt-1">{currentUser.joinDate}'ten beri üye</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-[#034EA2] bg-gradient-to-br from-[#034EA2] to-[#034EA2]/80 text-white">
          <CardContent className="p-4 text-center">
            <Gift size={24} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.totalDonated} GB</p>
            <p className="text-sm opacity-90">{userStats.donationCount} bağış</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#F558DB] bg-gradient-to-br from-[#F558DB] to-[#F558DB]/80 text-white">
          <CardContent className="p-4 text-center">
            <User size={24} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.totalClaimed} GB</p>
            <p className="text-sm opacity-90">{userStats.claimCount} talep</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Geçmiş</TabsTrigger>
          <TabsTrigger value="achievements">Rozetler</TabsTrigger>
          <TabsTrigger value="stats">İstatistik</TabsTrigger>
        </TabsList>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#034EA2]">
                <Calendar size={20} />
                Son Aktiviteler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userActivities.length > 0 ? (
                userActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'donation' ? 'bg-[#034EA2]' : 'bg-[#F558DB]'
                      }`}>
                        {activity.type === 'donation' ? (
                          <Gift className="text-white" size={16} />
                        ) : (
                          <User className="text-white" size={16} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                    <Badge 
                      className={activity.type === 'donation' 
                        ? 'bg-[#034EA2] text-white' 
                        : 'bg-[#F558DB] text-white'
                      }
                    >
                      {activity.type === 'donation' ? '+' : '-'}{activity.amount} GB
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Henüz aktivite bulunmuyor.</p>
                  <p className="text-sm">İlk bağışını yaparak başla!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-2 ${achievement.earned ? 'border-[#FFC40C] bg-gradient-to-br from-white to-[#FFC40C]/10' : 'border-gray-200 bg-gray-50'}`}>
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        achievement.earned ? achievement.color : 'bg-gray-300'
                      }`}>
                        <IconComponent 
                          className={achievement.earned ? 'text-white' : 'text-gray-500'} 
                          size={20} 
                        />
                      </div>
                      <h4 className={`font-semibold text-sm ${achievement.earned ? 'text-[#034EA2]' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-2"
                        >
                          <Badge className="bg-[#FFC40C] text-[#034EA2] text-xs">
                            Kazanıldı!
                          </Badge>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#034EA2]">
                <TrendingUp size={20} />
                Aylık Özet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(monthlyStats).map(([month, stats], index) => (
                <motion.div
                  key={month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#034EA2]">{month}</span>
                    <span className="text-sm text-gray-500">
                      Net: +{(stats.donated - stats.claimed).toFixed(1)} GB
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bağış</span>
                      <span className="font-medium">{stats.donated} GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-[#034EA2] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.donated / 30) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Talep</span>
                      <span className="font-medium">{stats.claimed} GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-[#F558DB] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.claimed / 30) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-[#034EA2]/10 to-[#F558DB]/10 border-2 border-[#FFC40C]">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-[#034EA2] mb-2">Sosyal Etki</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#034EA2]">
                    {Math.floor(userStats.totalDonated * 4)}
                  </p>
                  <p className="text-sm text-gray-600">Saat eğitim sağladı</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#F558DB]">
                    {Math.floor(userStats.totalDonated / 2)}
                  </p>
                  <p className="text-sm text-gray-600">Öğrenciye ulaştı</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}