import { ClothingItem, SwapRequest } from '../types';

export const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket from the 90s. Perfectly worn-in with beautiful fading. Great for layering!',
    category: 'outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'good',
    tags: ['vintage', 'denim', 'casual', '90s'],
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '2',
    uploaderName: 'Sarah Chen',
    uploaderAvatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    pointsValue: 75,
    isAvailable: true,
    isApproved: true,
    uploadDate: '2024-01-20',
    location: 'Brooklyn, NY'
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral midi dress perfect for summer occasions. Lightweight and comfortable with a flattering fit.',
    category: 'dresses',
    type: 'Midi Dress',
    size: 'S',
    condition: 'excellent',
    tags: ['floral', 'summer', 'midi', 'feminine'],
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '3',
    uploaderName: 'Emma Rodriguez',
    uploaderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    pointsValue: 90,
    isAvailable: true,
    isApproved: true,
    uploadDate: '2024-01-22',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    title: 'Classic White Sneakers',
    description: 'Clean white leather sneakers. Minimal wear, perfect for everyday casual looks.',
    category: 'shoes',
    type: 'Sneakers',
    size: '8',
    condition: 'excellent',
    tags: ['white', 'sneakers', 'casual', 'leather'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '4',
    uploaderName: 'Alex Johnson',
    uploaderAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    pointsValue: 60,
    isAvailable: true,
    isApproved: true,
    uploadDate: '2024-01-18',
    location: 'Seattle, WA'
  },
  {
    id: '4',
    title: 'Wool Blend Coat',
    description: 'Elegant wool blend coat in camel color. Perfect for fall and winter. Classic tailored fit.',
    category: 'outerwear',
    type: 'Coat',
    size: 'L',
    condition: 'good',
    tags: ['wool', 'coat', 'winter', 'elegant'],
    images: [
      'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '5',
    uploaderName: 'Maria Santos',
    uploaderAvatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    pointsValue: 120,
    isAvailable: true,
    isApproved: true,
    uploadDate: '2024-01-15',
    location: 'Chicago, IL'
  },
  {
    id: '5',
    title: 'High-Waisted Jeans',
    description: 'Dark wash high-waisted jeans with great stretch. Flattering fit for all body types.',
    category: 'bottoms',
    type: 'Jeans',
    size: '29',
    condition: 'good',
    tags: ['jeans', 'high-waisted', 'dark-wash', 'stretch'],
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '6',
    uploaderName: 'Jessica Kim',
    uploaderAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    pointsValue: 65,
    isAvailable: true,
    isApproved: true,
    uploadDate: '2024-01-25',
    location: 'Austin, TX'
  },
  {
    id: '6',
    title: 'Silk Scarf Collection',
    description: 'Set of 3 beautiful silk scarves in various patterns. Perfect for adding elegance to any outfit.',
    category: 'accessories',
    type: 'Scarf',
    size: 'One Size',
    condition: 'excellent',
    tags: ['silk', 'scarf', 'accessories', 'elegant'],
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '7',
    uploaderName: 'Rachel Green',
    uploaderAvatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    pointsValue: 45,
    isAvailable: true,
    isApproved: true,
    uploadDate: '2024-01-23',
    location: 'Miami, FL'
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterId: '1',
    requesterName: 'Current User',
    itemId: '2',
    itemTitle: 'Floral Summer Dress',
    offeredItemId: '7',
    offeredItemTitle: 'Blue Sweater',
    usePoints: false,
    status: 'pending',
    createdDate: '2024-01-26',
    message: 'Hi! I love this dress and would like to swap it for my blue sweater. Let me know if you\'re interested!'
  },
  {
    id: '2',
    requesterId: '3',
    requesterName: 'Emma Rodriguez',
    itemId: '1',
    itemTitle: 'Vintage Denim Jacket',
    usePoints: true,
    pointsOffered: 75,
    status: 'accepted',
    createdDate: '2024-01-24',
    message: 'Would love to get this jacket using my points!'
  }
];