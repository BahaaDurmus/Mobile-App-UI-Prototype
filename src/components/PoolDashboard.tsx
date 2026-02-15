import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { TrendingUp, Users, Heart, Activity, Calendar, Trophy, Medal, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Snail-inspired connectivity icon component
const SnailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C7.58 2 4 5.58 4 10c0 2.5 1.12 4.74 2.88 6.24L12 21l5.12-4.76C18.88 14.74 20 12.5 20 10c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    <circle cx="12" cy="10" r="1.5"/>
  </svg>
);

export default function PoolDashboard() {
  const { poolStats, activities, leaderboard, currentUser } = useAppContext();
  const [localStats, setLocalStats] = useState(poolStats);

  // Update local stats when global stats change
  useEffect(() => {
    setLocalStats(poolStats);
  }, [poolStats]);

  // Simulate real-time updates for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalStats(prev => ({
        ...prev,
        totalGB: prev.totalGB + Math.random() * 0.1,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 2 - 1),
        dailyProgress: Math.min(100, prev.dailyProgress + Math.random() * 0.1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const weeklyStats = [
    { day: 'Pzt', donated: 45, claimed: 38 },
    { day: 'Sal', donated: 52, claimed: 41 },
    { day: 'Çar', donated: 38, claimed: 35 },
    { day: 'Per', donated: 61, claimed: 48 },
    { day: 'Cum', donated: 73, claimed: 59 },
    { day: 'Cmt', donated: 29, claimed: 22 },
    { day: 'Paz', donated: 41, claimed: 33 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-[#034EA2] via-[#FFC40C] to-[#F558DB] rounded-full mx-auto flex items-center justify-center"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <SnailIcon className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-[#034EA2]">Paylaşım Havuzu</h2>
        <p className="text-gray-600">Topluluk istatistikleri ve canlı aktiviteler</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-[#034EA2] bg-gradient-to-br from-[#034EA2] to-[#034EA2]/80 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp size={24} className="mx-auto mb-2" />
            <motion.p 
              className="text-3xl font-bold"
              key={Math.floor(localStats.totalGB)}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {localStats.totalGB.toFixed(1)}
              <span className="text-lg ml-1">GB</span>
            </motion.p>
            <p className="text-sm opacity-90">Toplam Havuz</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#F558DB] bg-gradient-to-br from-[#F558DB] to-[#F558DB]/80 text-white">
          <CardContent className="p-4 text-center">
            <Users size={24} className="mx-auto mb-2" />
            <motion.p 
              className="text-3xl font-bold"
              key={localStats.activeUsers}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {localStats.activeUsers.toLocaleString()}
            </motion.p>
            <p className="text-sm opacity-90">Aktif Kullanıcı</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-[#034EA2]">
            <Activity size={20} />
            Günlük Hedef
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Bugünkü bağış hedefi</span>
            <span className="font-semibold text-[#034EA2]">{localStats.dailyProgress.toFixed(0)}%</span>
          </div>
          
          <div className="relative">
            <Progress 
              value={localStats.dailyProgress} 
              className="h-3 bg-gray-200"
            />
            <motion.div
              className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-[#034EA2] to-[#FFC40C]"
              initial={{ width: 0 }}
              animate={{ width: `${localStats.dailyProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 GB</span>
            <span>100 GB hedef</span>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-[#034EA2]">
            <Calendar size={20} />
            Haftalık Özet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((stat, index) => (
              <div key={stat.day} className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium text-gray-600">{stat.day}</span>
                <div className="flex-1 flex gap-1">
                  <motion.div
                    className="bg-[#034EA2] h-4 rounded-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.donated / 80) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  />
                  <motion.div
                    className="bg-[#F558DB] h-4 rounded-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.claimed / 80) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-gray-500 w-12 text-right">
                  {stat.donated + stat.claimed} GB
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#034EA2] rounded-sm"></div>
              <span>Bağış</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#F558DB] rounded-sm"></div>
              <span>Talep</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-[#034EA2]">
            <Heart size={20} />
            Canlı Aktiviteler
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-[#FFC40C] rounded-full"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.slice(0, 5).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'donation' ? 'bg-[#034EA2]' : 'bg-[#F558DB]'
                }`}>
                  <SnailIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.user}</p>
                  <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  className={activity.type === 'donation' 
                    ? 'bg-[#034EA2] text-white' 
                    : 'bg-[#F558DB] text-white'
                  }
                >
                  {activity.type === 'donation' ? '+' : '-'}{activity.amount} GB
                </Badge>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-[#034EA2]">
            <Trophy size={20} />
            En Çok Bağış Yapanlar
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#FFC40C]"
            >
              🏆
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.slice(0, 5).map((user, index) => {
            const isCurrentUser = user.name === currentUser.name;
            const getRankIcon = (rank: number) => {
              switch (rank) {
                case 1: return <Trophy className="w-4 h-4 text-[#FFC40C]" />;
                case 2: return <Medal className="w-4 h-4 text-gray-400" />;
                case 3: return <Award className="w-4 h-4 text-[#CD7F32]" />;
                default: return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-gray-500">#{rank}</span>;
              }
            };

            const getLevelColor = (level: string) => {
              switch (level) {
                case 'Altın Destekçi': return 'bg-[#FFC40C] text-[#034EA2]';
                case 'Gümüş Destekçi': return 'bg-gray-400 text-white';
                case 'Bronz Destekçi': return 'bg-[#CD7F32] text-white';
                default: return 'bg-gray-200 text-gray-700';
              }
            };

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between py-3 px-3 rounded-xl border-2 transition-all ${
                  isCurrentUser 
                    ? 'border-[#FFC40C] bg-gradient-to-r from-[#FFC40C]/10 to-[#F558DB]/10' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-[#034EA2] to-[#F558DB] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.initials}</span>
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${isCurrentUser ? 'text-[#034EA2]' : 'text-gray-800'}`}>
                      {user.name}
                      {isCurrentUser && <span className="ml-1 text-[#FFC40C]">(Sen)</span>}
                    </p>
                    <p className="text-xs text-gray-500">{user.donationCount} bağış</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#034EA2]">{user.totalDonated} GB</p>
                  <Badge className={`text-xs ${getLevelColor(user.level)}`}>
                    {user.level}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
          
          {/* Show more button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-2"
          >
            <button className="text-sm text-[#034EA2] hover:text-[#F558DB] transition-colors">
              Tüm listeyi gör →
            </button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}