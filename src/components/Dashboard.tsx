import React, { useState } from 'react';
import { User, Award, Package, Repeat, Plus, Star, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockClothingItems, mockSwapRequests } from '../data/mockData';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user's items (in real app, filter by user ID)
  const userItems = mockClothingItems.slice(0, 3);
  const userSwapRequests = mockSwapRequests;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'items', label: 'My Items', icon: Package },
    { id: 'swaps', label: 'Swap Requests', icon: Repeat },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Manage your items, track swaps, and grow your sustainable wardrobe.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user?.points || 0}</p>
                <p className="text-sm text-gray-600">Points Balance</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userItems.length}</p>
                <p className="text-sm text-gray-600">Listed Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Repeat className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user?.swapCount || 0}</p>
                <p className="text-sm text-gray-600">Completed Swaps</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Profile Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                          alt={user?.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{user?.name}</h4>
                          <p className="text-gray-600">{user?.email}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Joined {user?.joinDate}</span>
                          </div>
                        </div>
                      </div>
                      {user?.location && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Swap request accepted</span> for Vintage Denim Jacket
                        </p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Earned 25 points</span> for completing a swap
                        </p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">New item listed:</span> Blue Sweater
                        </p>
                        <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Items Tab */}
            {activeTab === 'items' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">My Listed Items</h3>
                  <button
                    onClick={() => onPageChange('add-item')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600 font-medium">{item.pointsValue} points</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {userItems.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No items listed yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first item to the platform</p>
                    <button
                      onClick={() => onPageChange('add-item')}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      List Your First Item
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Swap Requests Tab */}
            {activeTab === 'swaps' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Swap Requests</h3>

                <div className="space-y-4">
                  {userSwapRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{request.itemTitle}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {request.usePoints ? (
                              <>Requesting with <span className="font-medium">{request.pointsOffered} points</span></>
                            ) : (
                              <>Offering: <span className="font-medium">{request.offeredItemTitle}</span></>
                            )}
                          </p>
                          {request.message && (
                            <p className="text-gray-600 text-sm bg-white p-3 rounded border italic">
                              "{request.message}"
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            {request.createdDate} • by {request.requesterName}
                          </p>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex space-x-2 ml-4">
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                              Accept
                            </button>
                            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors">
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {userSwapRequests.length === 0 && (
                  <div className="text-center py-12">
                    <Repeat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No swap requests yet</h3>
                    <p className="text-gray-600">Swap requests will appear here when others are interested in your items</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;