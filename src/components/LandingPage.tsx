import React from 'react';
import { ArrowRight, Recycle, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockClothingItems } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPageChange }) => {
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const featuredItems = mockClothingItems.slice(0, 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Swap Style,
                  <span className="text-green-600"> Save Planet</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join the sustainable fashion revolution. Exchange clothes with others, 
                  earn points for eco-friendly choices, and give your wardrobe new life.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onPageChange(isAuthenticated ? 'browse' : 'signup')}
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Start Swapping</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onPageChange('browse')}
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Browse Items
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sustainable Fashion"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Sustainable Fashion</h3>
                  <p className="text-gray-600 mt-2">Give clothes a second life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RWear?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're making fashion sustainable, accessible, and fun through innovative 
              swapping and reward systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <Recycle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Eco-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduce textile waste and carbon footprint by giving clothes a second life 
                through our sustainable swapping platform.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with like-minded fashion enthusiasts who share your passion 
                for sustainable style and conscious consumption.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <Award className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Rewards System</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn points for every swap and sustainable action. Use points to get 
                items you love without direct exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing pieces available for swap right now
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 h-96">
                      <div className="relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.pointsValue} points
                        </div>
                      </div>
                      <div className="flex flex-col justify-center space-y-4">
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">Size {item.size}</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full capitalize">{item.condition}</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full">{item.category}</span>
                        </div>
                        <button
                          onClick={() => onPageChange('browse')}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors self-start"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users who are making fashion sustainable, one swap at a time.
          </p>
          <button
            onClick={() => onPageChange(isAuthenticated ? 'add-item' : 'signup')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isAuthenticated ? 'List Your First Item' : 'Get Started Today'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;