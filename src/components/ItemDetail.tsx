import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, User, Star, Heart, Share2, MessageCircle, Repeat, Coins } from 'lucide-react';
import { ClothingItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface ItemDetailProps {
  item: ClothingItem;
  onBack: () => void;
  onSwapRequest: (item: ClothingItem, usePoints: boolean) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onBack, onSwapRequest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'excellent': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSwapRequest = () => {
    if (!isAuthenticated) {
      alert('Please sign in to make swap requests');
      return;
    }
    onSwapRequest(item, usePoints);
    setShowSwapModal(false);
  };

  const canAffordPoints = user && user.points >= item.pointsValue;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to browse</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {item.images.length > 1 && (
              <div className="flex space-x-3">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{item.title}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.pointsValue} points
                </span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            {/* Item Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium capitalize">{item.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="font-medium">{item.type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Size</span>
                  <p className="font-medium">{item.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Condition</span>
                  <p className="font-medium capitalize">{item.condition}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={item.uploaderAvatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                  alt={item.uploaderName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.uploaderName}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {item.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Listed {item.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowSwapModal(true)}
                disabled={!item.isAvailable || !isAuthenticated}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Repeat className="h-5 w-5" />
                <span>{!isAuthenticated ? 'Sign in to Swap' : 'Request Swap'}</span>
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Message Owner</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Swap</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">by {item.uploaderName}</p>
                    <p className="text-sm text-green-600 font-medium">{item.pointsValue} points</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="swapType"
                    checked={!usePoints}
                    onChange={() => setUsePoints(false)}
                    className="h-4 w-4 text-green-600"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Direct Item Swap</span>
                    <p className="text-sm text-gray-600">Offer one of your items in exchange</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="swapType"
                    checked={usePoints}
                    onChange={() => setUsePoints(true)}
                    className="h-4 w-4 text-green-600"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Use Points</span>
                    <p className="text-sm text-gray-600">
                      Redeem using {item.pointsValue} points
                      {user && (
                        <span className={`ml-1 ${canAffordPoints ? 'text-green-600' : 'text-red-600'}`}>
                          (You have {user.points})
                        </span>
                      )}
                    </p>
                  </div>
                </label>
              </div>

              {usePoints && !canAffordPoints && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  You don't have enough points for this item. You need {item.pointsValue - (user?.points || 0)} more points.
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSwapRequest}
                  disabled={usePoints && !canAffordPoints}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );
};

export default ItemDetail;