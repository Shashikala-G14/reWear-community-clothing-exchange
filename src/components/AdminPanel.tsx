import React, { useState } from 'react';
import { Shield, Package, Users, AlertTriangle, Check, X, Eye } from 'lucide-react';
import { mockClothingItems } from '../data/mockData';
import { ClothingItem } from '../types';

interface AdminPanelProps {
  onPageChange: (page: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onPageChange }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  // Mock pending items for approval
  const pendingItems = mockClothingItems.slice(0, 3).map(item => ({ ...item, isApproved: false }));
  const approvedItems = mockClothingItems.slice(3);

  const tabs = [
    { id: 'pending', label: 'Pending Approval', icon: AlertTriangle, count: pendingItems.length },
    { id: 'approved', label: 'Approved Items', icon: Check, count: approvedItems.length },
    { id: 'users', label: 'User Management', icon: Users, count: 0 },
  ];

  const handleApprove = (itemId: string) => {
    // In a real app, this would make an API call
    console.log('Approving item:', itemId);
    alert('Item approved successfully!');
  };

  const handleReject = (itemId: string) => {
    // In a real app, this would make an API call
    console.log('Rejecting item:', itemId);
    alert('Item rejected and removed.');
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-xl text-gray-600">
            Manage item approvals, user accounts, and platform oversight.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingItems.length}</p>
                <p className="text-sm text-gray-600">Pending Approval</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{approvedItems.length}</p>
                <p className="text-sm text-gray-600">Approved Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
                <p className="text-sm text-gray-600">Approval Rate</p>
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
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Pending Approval Tab */}
            {activeTab === 'pending' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Items Pending Approval ({pendingItems.length})
                </h3>

                {pendingItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Check className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No items pending approval at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-6 border border-orange-200">
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                                <p className="text-gray-600 text-sm mb-2">by {item.uploaderName}</p>
                                <p className="text-gray-700 text-sm line-clamp-2">{item.description}</p>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => setSelectedItem(item)}
                                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center space-x-1"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span>View</span>
                                </button>
                                <button
                                  onClick={() => handleApprove(item.id)}
                                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                                >
                                  <Check className="h-4 w-4" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center space-x-1"
                                >
                                  <X className="h-4 w-4" />
                                  <span>Reject</span>
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 mt-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                                {item.condition}
                              </span>
                              <span className="text-sm text-gray-500">Size: {item.size}</span>
                              <span className="text-sm text-gray-500 capitalize">Category: {item.category}</span>
                              <span className="text-sm font-medium text-green-600">{item.pointsValue} points</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Approved Items Tab */}
            {activeTab === 'approved' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Approved Items ({approvedItems.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvedItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">by {item.uploaderName}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600 font-medium">{item.pointsValue} points</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.isAvailable ? 'Available' : 'Swapped'}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">User management features will be implemented here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Item Review</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {selectedItem.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedItem.title} ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedItem.title}</h4>
                  <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium capitalize">{selectedItem.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-medium">{selectedItem.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-2 font-medium">{selectedItem.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <span className="ml-2 font-medium capitalize">{selectedItem.condition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Points Value:</span>
                      <span className="ml-2 font-medium text-green-600">{selectedItem.pointsValue}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Listed by:</span>
                      <span className="ml-2 font-medium">{selectedItem.uploaderName}</span>
                    </div>
                  </div>

                  {selectedItem.tags.length > 0 && (
                    <div className="mt-4">
                      <span className="text-gray-500 text-sm">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedItem.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {!selectedItem.isApproved && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => {
                        handleReject(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Reject Item
                    </button>
                    <button
                      onClick={() => {
                        handleApprove(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Approve Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;