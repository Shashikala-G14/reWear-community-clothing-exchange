import React from 'react';
import { MapPin, Calendar, User, Star } from 'lucide-react';
import { ClothingItem } from '../types';

interface ItemCardProps {
  item: ClothingItem;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'excellent': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
    >
      <div className="relative">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {item.pointsValue} pts
        </div>
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
          {item.condition}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded-full">Size {item.size}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full capitalize">{item.category}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={item.uploaderAvatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
              alt={item.uploaderName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{item.uploaderName}</span>
          </div>
          
          {item.location && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{item.location.split(',')[0]}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Listed {item.uploadDate}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;