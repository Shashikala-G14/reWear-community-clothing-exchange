import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import BrowseItems from './components/BrowseItems';
import ItemDetail from './components/ItemDetail';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';
import AdminPanel from './components/AdminPanel';
import { ClothingItem } from './types';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const { isAuthenticated, isAdmin } = useAuth();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedItem(null);
  };

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  const handleSwapRequest = (item: ClothingItem, usePoints: boolean) => {
    const requestType = usePoints ? 'points' : 'item swap';
    alert(`Swap request sent for "${item.title}" using ${requestType}!`);
    setCurrentPage('dashboard');
  };

  const handleAddItem = (itemData: any) => {
    console.log('New item submitted:', itemData);
    alert('Item submitted successfully! It will be reviewed by our team.');
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    // Redirect to login if trying to access protected pages while not authenticated
    if (!isAuthenticated && ['dashboard', 'add-item'].includes(currentPage)) {
      setCurrentPage('login');
    }

    // Redirect to dashboard if admin tries to access admin panel while not admin
    if (currentPage === 'admin' && !isAdmin) {
      setCurrentPage('dashboard');
    }

    switch (currentPage) {
      case 'home':
        return <LandingPage onPageChange={handlePageChange} />;
      case 'login':
        return <LoginForm onPageChange={handlePageChange} />;
      case 'signup':
        return <SignupForm onPageChange={handlePageChange} />;
      case 'browse':
        return <BrowseItems onItemClick={handleItemClick} />;
      case 'item-detail':
        return selectedItem ? (
          <ItemDetail
            item={selectedItem}
            onBack={() => setCurrentPage('browse')}
            onSwapRequest={handleSwapRequest}
          />
        ) : (
          <BrowseItems onItemClick={handleItemClick} />
        );
      case 'dashboard':
        return <Dashboard onPageChange={handlePageChange} />;
      case 'add-item':
        return (
          <AddItem
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleAddItem}
          />
        );
      case 'admin':
        return isAdmin ? (
          <AdminPanel onPageChange={handlePageChange} />
        ) : (
          <Dashboard onPageChange={handlePageChange} />
        );
      default:
        return <LandingPage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      {renderCurrentPage()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;