import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Activity {
  id: string;
  user: string;
  amount: number;
  type: 'donation' | 'claim';
  timestamp: Date;
  description: string;
}

export interface UserStats {
  totalDonated: number;
  totalClaimed: number;
  donationCount: number;
  claimCount: number;
}

export interface PoolStats {
  totalGB: number;
  activeUsers: number;
  dailyProgress: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  initials: string;
  totalDonated: number;
  donationCount: number;
  rank: number;
  level: string;
}

interface AppContextType {
  // Pool Statistics
  poolStats: PoolStats;
  updatePoolStats: (stats: Partial<PoolStats>) => void;
  
  // User Statistics
  userStats: UserStats;
  updateUserStats: (stats: Partial<UserStats>) => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  
  // Leaderboard
  leaderboard: LeaderboardUser[];
  updateLeaderboard: () => void;
  
  // User Profile
  currentUser: {
    name: string;
    initials: string;
    joinDate: string;
    level: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [poolStats, setPoolStats] = useState<PoolStats>({
    totalGB: 847.5,
    activeUsers: 1243,
    dailyProgress: 67
  });

  const [userStats, setUserStats] = useState<UserStats>({
    totalDonated: 47.5,
    totalClaimed: 12.3,
    donationCount: 23,
    claimCount: 8
  });

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      user: 'Ayşe K.',
      amount: 5,
      type: 'donation',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      description: 'Haftalık bağış'
    },
    {
      id: '2',
      user: 'Mehmet A.',
      amount: 2,
      type: 'claim',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      description: 'Online sınav için'
    },
    {
      id: '3',
      user: 'Fatma Y.',
      amount: 10,
      type: 'donation',
      timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      description: 'Özel bağış'
    },
    {
      id: '4',
      user: 'Ali T.',
      amount: 1,
      type: 'claim',
      timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
      description: 'Araştırma ödevi'
    },
    {
      id: '5',
      user: 'Zeynep S.',
      amount: 3,
      type: 'donation',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      description: 'Haftalık bağış'
    }
  ]);

  const [currentUser] = useState({
    name: 'Ayşe Kaya',
    initials: 'AK',
    joinDate: 'Mart 2024',
    level: 'Altın Destekçi'
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([
    {
      id: '1',
      name: 'Ayşe Kaya',
      initials: 'AK',
      totalDonated: 47.5,
      donationCount: 23,
      rank: 1,
      level: 'Altın Destekçi'
    },
    {
      id: '2',
      name: 'Mehmet Yılmaz',
      initials: 'MY',
      totalDonated: 42.3,
      donationCount: 18,
      rank: 2,
      level: 'Gümüş Destekçi'
    },
    {
      id: '3',
      name: 'Fatma Demir',
      initials: 'FD',
      totalDonated: 38.7,
      donationCount: 15,
      rank: 3,
      level: 'Gümüş Destekçi'
    },
    {
      id: '4',
      name: 'Ali Kaya',
      initials: 'AK',
      totalDonated: 35.2,
      donationCount: 12,
      rank: 4,
      level: 'Bronz Destekçi'
    },
    {
      id: '5',
      name: 'Zeynep Özkan',
      initials: 'ZÖ',
      totalDonated: 31.8,
      donationCount: 10,
      rank: 5,
      level: 'Bronz Destekçi'
    },
    {
      id: '6',
      name: 'Can Yıldız',
      initials: 'CY',
      totalDonated: 28.4,
      donationCount: 9,
      rank: 6,
      level: 'Bronz Destekçi'
    },
    {
      id: '7',
      name: 'Elif Şahin',
      initials: 'EŞ',
      totalDonated: 25.1,
      donationCount: 8,
      rank: 7,
      level: 'Bronz Destekçi'
    },
    {
      id: '8',
      name: 'Burak Çelik',
      initials: 'BÇ',
      totalDonated: 22.6,
      donationCount: 7,
      rank: 8,
      level: 'Bronz Destekçi'
    }
  ]);

  const updatePoolStats = (newStats: Partial<PoolStats>) => {
    setPoolStats(prev => ({ ...prev, ...newStats }));
  };

  const updateUserStats = (newStats: Partial<UserStats>) => {
    setUserStats(prev => ({ ...prev, ...newStats }));
  };

  const updateLeaderboard = () => {
    setLeaderboard(prev => {
      // Find current user in leaderboard and update their stats
      const updatedLeaderboard = prev.map(user => {
        if (user.name === currentUser.name) {
          return {
            ...user,
            totalDonated: userStats.totalDonated,
            donationCount: userStats.donationCount
          };
        }
        return user;
      });
      
      // Sort by totalDonated descending
      return updatedLeaderboard.sort((a, b) => b.totalDonated - a.totalDonated)
        .map((user, index) => ({ ...user, rank: index + 1 }));
    });
  };

  const addActivity = (activityData: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only last 10 activities
    
    // Update pool stats based on activity type
    if (activityData.type === 'donation') {
      updatePoolStats({
        totalGB: poolStats.totalGB + activityData.amount,
        dailyProgress: Math.min(100, poolStats.dailyProgress + (activityData.amount * 2))
      });
    } else {
      updatePoolStats({
        totalGB: Math.max(0, poolStats.totalGB - activityData.amount)
      });
    }
  };

  const value: AppContextType = {
    poolStats,
    updatePoolStats,
    userStats,
    updateUserStats,
    activities,
    addActivity,
    leaderboard,
    updateLeaderboard,
    currentUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
