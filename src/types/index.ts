export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  avatar?: string;
  location?: string;
  joinDate: string;
  swapCount: number;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  type: string;
  size: string;
  condition: 'new' | 'excellent' | 'good' | 'fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  pointsValue: number;
  isAvailable: boolean;
  isApproved: boolean;
  uploadDate: string;
  location?: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId?: string;
  offeredItemTitle?: string;
  usePoints: boolean;
  pointsOffered?: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdDate: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}