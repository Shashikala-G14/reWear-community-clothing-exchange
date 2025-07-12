import React, { useState } from 'react';
import { Upload, X, Plus, Camera, ArrowLeft } from 'lucide-react';

interface AddItemProps {
  onBack: () => void;
  onSubmit: (itemData: any) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    location: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'excellent', label: 'Excellent condition' },
    { value: 'good', label: 'Good condition' },
    { value: 'fair', label: 'Fair condition' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImages(prev => [...prev, imageUrl]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSampleImages = () => {
    const sampleImages = [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800',
    ];
    setImages(prev => [...prev, ...sampleImages.slice(0, 3 - prev.length)]);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const itemData = {
        ...formData,
        images,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        pointsValue: calculatePointsValue(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(itemData);
    } catch (error) {
      console.error('Error submitting item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePointsValue = () => {
    const basePoints = {
      new: 100,
      excellent: 80,
      good: 60,
      fair: 40,
    };
    const categoryMultiplier = {
      outerwear: 1.5,
      dresses: 1.3,
      shoes: 1.2,
      tops: 1.0,
      bottoms: 1.1,
      accessories: 0.8,
    };
    
    const base = basePoints[formData.condition as keyof typeof basePoints] || 60;
    const multiplier = categoryMultiplier[formData.category as keyof typeof categoryMultiplier] || 1;
    
    return Math.round(base * multiplier);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to dashboard</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List New Item</h1>
          <p className="text-xl text-gray-600">
            Share your pre-loved items with the community and earn points for sustainable fashion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Photos <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add up to 5 photos. Good photos help your item get noticed!
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Photo</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {images.length === 0 && (
                <button
                  type="button"
                  onClick={addSampleImages}
                  className="mt-4 text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Add sample images for demo
                </button>
              )}

              {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                  Item Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Vintage Denim Jacket"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
                  Item Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g., Jacket, T-shirt, Sneakers"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors ${
                    errors.type ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your item's condition, style, fit, and any special features..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Category and Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-900 mb-2">
                  Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors ${
                    errors.size ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-900 mb-2">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors ${
                    errors.condition ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>{cond.label}</option>
                  ))}
                </select>
                {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
              </div>
            </div>

            {/* Tags and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-900 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="vintage, summer, casual (comma separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
                <p className="mt-1 text-sm text-gray-600">
                  Add tags to help others find your item
                </p>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-900 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Points Estimate */}
            {formData.condition && formData.category && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-900 mb-2">Estimated Points Value</h3>
                <p className="text-2xl font-bold text-green-600">{calculatePointsValue()} points</p>
                <p className="text-sm text-green-700 mt-1">
                  Based on condition and category. Final value may vary after review.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span>List Item</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;