import React, { useState, useEffect, useContext, createContext } from 'react';
import { ShoppingCart, User, Search, Star, Plus, Minus, Trash2, Github, Linkedin, Twitter, Heart, Filter, Grid, List, Moon, Sun, Bell, ChevronDown, X, ArrowLeft, ArrowRight, Layers, ZoomIn } from 'lucide-react';

//================================================================
// 1. ENHANCED MOCK DATA & API
//================================================================
const products = [
  { id: "1", name: "QuantumCore Processor", brand: "SynthTech", price: 350.00, discountPrice: 299.99, stockQuantity: 45, images: ["https://picsum.photos/seed/1/600/600", "https://picsum.photos/seed/1a/600/600", "https://picsum.photos/seed/1b/600/600"], shortDescription: "Next-gen processor for high-performance computing.", fullDescription: "The QuantumCore Processor features cutting-edge technology with 12 cores, 24 threads, and revolutionary quantum acceleration. Built on 5nm architecture for maximum efficiency.", category: "Processors", averageRating: 4.8, reviewCount: 120, tags: ["gaming", "professional", "high-performance"], specifications: { cores: "12", threads: "24", baseClock: "3.2GHz", boostClock: "4.8GHz", socket: "AM5" } },
  { id: "2", name: "NovaGlow Gaming Mouse", brand: "PixelPerfect", price: 79.99, stockQuantity: 150, images: ["https://picsum.photos/seed/2/600/600", "https://picsum.photos/seed/2a/600/600"], shortDescription: "Ergonomic gaming mouse with customizable RGB.", fullDescription: "Professional gaming mouse with 25,000 DPI sensor, 11 programmable buttons, and stunning RGB lighting effects.", category: "Peripherals", averageRating: 4.6, reviewCount: 250, tags: ["gaming", "rgb", "wireless"], specifications: { dpi: "25,000", buttons: "11", battery: "70 hours", weight: "85g" } },
  { id: "3", name: "AeroType Mechanical Keyboard", brand: "KeyChron", price: 125.50, discountPrice: 110.00, stockQuantity: 80, images: ["https://picsum.photos/seed/3/600/600", "https://picsum.photos/seed/3a/600/600"], shortDescription: "A sleek, low-profile mechanical keyboard for coders and gamers.", fullDescription: "Premium mechanical keyboard with hot-swappable switches, aluminum construction, and wireless connectivity.", category: "Peripherals", averageRating: 4.9, reviewCount: 310, tags: ["mechanical", "wireless", "programming"], specifications: { switches: "Hot-swappable", layout: "75%", battery: "4000mAh", connectivity: "Wireless/USB-C" } },
  { id: "4", name: "CrystalView 4K Monitor", brand: "ViewSonic", price: 450.00, stockQuantity: 30, images: ["https://picsum.photos/seed/4/600/600", "https://picsum.photos/seed/4a/600/600"], shortDescription: "A 27-inch 4K UHD monitor with stunning color accuracy.", fullDescription: "Professional 4K monitor with 99% sRGB color gamut, HDR10 support, and USB-C connectivity for creators and professionals.", category: "Monitors", averageRating: 4.7, reviewCount: 95, tags: ["4k", "professional", "hdr"], specifications: { size: "27 inch", resolution: "3840x2160", refreshRate: "60Hz", colorGamut: "99% sRGB" } },
  { id: "5", name: "StealthWave NVMe SSD 1TB", brand: "DataFlow", price: 150.00, stockQuantity: 200, images: ["https://picsum.photos/seed/5/600/600", "https://picsum.photos/seed/5a/600/600"], shortDescription: "Blazing fast 1TB NVMe SSD for instant load times.", fullDescription: "High-performance NVMe SSD with read speeds up to 7,000 MB/s and advanced thermal management for sustained performance.", category: "Storage", averageRating: 4.8, reviewCount: 180, tags: ["nvme", "fast", "reliable"], specifications: { capacity: "1TB", interface: "PCIe 4.0", readSpeed: "7,000 MB/s", writeSpeed: "6,500 MB/s" } },
  { id: "6", name: "SonicSurge Wireless Headset", brand: "AudioPhile", price: 199.99, discountPrice: 179.99, stockQuantity: 65, images: ["https://picsum.photos/seed/6/600/600", "https://picsum.photos/seed/6a/600/600"], shortDescription: "Immersive 7.1 surround sound wireless headset.", fullDescription: "Premium wireless headset with active noise cancellation, 7.1 surround sound, and 30-hour battery life.", category: "Audio", averageRating: 4.5, reviewCount: 220, tags: ["wireless", "surround", "noise-cancelling"], specifications: { drivers: "50mm", frequency: "20Hz-20kHz", battery: "30 hours", features: "ANC, 7.1 Surround" } },
  { id: "7", name: "HyperCool CPU Liquid Cooler", brand: "CoolMaster", price: 130.00, stockQuantity: 90, images: ["https://picsum.photos/seed/7/600/600", "https://picsum.photos/seed/7a/600/600"], shortDescription: "Efficient liquid cooling system with addressable RGB.", fullDescription: "240mm AIO liquid cooler with RGB pump, dual PWM fans, and support for all modern CPU sockets.", category: "Cooling", averageRating: 4.7, reviewCount: 150, tags: ["liquid", "rgb", "quiet"], specifications: { radiator: "240mm", fans: "2x120mm PWM", pump: "RGB", compatibility: "Intel/AMD" } },
  { id: "8", name: "Titan X Power Supply 850W", brand: "VoltMax", price: 160.00, stockQuantity: 110, images: ["https://picsum.photos/seed/8/600/600", "https://picsum.photos/seed/8a/600/600"], shortDescription: "850W Gold-rated fully modular power supply unit.", fullDescription: "80+ Gold certified PSU with fully modular cables, silent fan operation, and 10-year warranty for ultimate reliability.", category: "Components", averageRating: 4.9, reviewCount: 200, tags: ["modular", "efficient", "reliable"], specifications: { wattage: "850W", efficiency: "80+ Gold", modular: "Fully Modular", warranty: "10 Years" } },
  { id: "9", name: "ProStream Webcam 4K", brand: "StreamTech", price: 89.99, discountPrice: 74.99, stockQuantity: 120, images: ["https://picsum.photos/seed/9/600/600", "https://picsum.photos/seed/9a/600/600"], shortDescription: "Professional 4K webcam for streaming and video calls.", fullDescription: "Ultra HD webcam with auto-focus, noise reduction microphone, and plug-and-play setup for content creators.", category: "Peripherals", averageRating: 4.4, reviewCount: 180, tags: ["4k", "streaming", "microphone"], specifications: { resolution: "4K 30fps", microphone: "Dual stereo", focus: "Auto-focus", compatibility: "Plug & Play" } },
  { id: "10", name: "GlowDesk RGB Gaming Mousepad", brand: "LightZone", price: 45.00, stockQuantity: 300, images: ["https://picsum.photos/seed/10/600/600", "https://picsum.photos/seed/10a/600/600"], shortDescription: "Extra-large RGB mousepad with wireless charging zone.", fullDescription: "Premium gaming mousepad with customizable RGB lighting, wireless charging area, and micro-textured surface.", category: "Peripherals", averageRating: 4.3, reviewCount: 95, tags: ["rgb", "wireless-charging", "large"], specifications: { size: "800x300mm", lighting: "RGB LED", charging: "Qi Wireless", surface: "Micro-textured" } }
];

const reviews = {
  "1": [
    { id: 1, user: "TechEnthusiast92", rating: 5, comment: "Incredible performance boost! Gaming and rendering are lightning fast.", date: "2024-08-15", verified: true },
    { id: 2, user: "BuilderPro", rating: 4, comment: "Great processor but runs a bit hot under heavy load.", date: "2024-08-10", verified: true },
    { id: 3, user: "CodeMaster", rating: 5, comment: "Perfect for development work. Compilation times are amazing.", date: "2024-08-05", verified: false }
  ],
  "2": [
    { id: 1, user: "GamerX", rating: 5, comment: "Best mouse I've ever used! The RGB is stunning.", date: "2024-08-20", verified: true },
    { id: 2, user: "ProPlayer", rating: 4, comment: "Excellent for competitive gaming, very responsive.", date: "2024-08-18", verified: true }
  ]
};

const fetchProducts = async () => new Promise(resolve => setTimeout(() => resolve(products), 500));
const fetchProductById = async (id) => new Promise(resolve => setTimeout(() => resolve(products.find(p => p.id === id)), 500));
const fetchReviews = async (productId) => new Promise(resolve => setTimeout(() => resolve(reviews[productId] || []), 300));

//================================================================
// 2. ENHANCED CONTEXTS
//================================================================

// Theme Context
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Wishlist Context
const WishlistContext = createContext();
const useWishlist = () => useContext(WishlistContext);
const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Enhanced Cart Context
const CartContext = createContext();
const useCart = () => useContext(CartContext);
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.discountPrice || product.price,
        quantity
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const cart = {
    items: cartItems,
    totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Comparison Context
const ComparisonContext = createContext();
const useComparison = () => useContext(ComparisonContext);
const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState([]);

  const addToComparison = (product) => {
    setComparisonItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      if (prev.length >= 4) return prev; // Max 4 items
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId) => {
    setComparisonItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInComparison = (productId) => {
    return comparisonItems.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonItems,
      addToComparison,
      removeFromComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

// Recently Viewed Context
const RecentlyViewedContext = createContext();
const useRecentlyViewed = () => useContext(RecentlyViewedContext);
const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 5); // Keep only 5 recent items
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

//================================================================
// 3. ENHANCED COMPONENTS
//================================================================

// Quick View Modal
const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold dark:text-white">Quick View</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="relative">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 border-2 rounded ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(product.discountPrice || product.price).toFixed(2)}
                </span>
                {product.discountPrice && (
                  <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.shortDescription}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => addToWishlist(product)}
                  className={`p-2 rounded-lg transition-colors ${
                    isInWishlist(product.id)
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Product Card
const ProductCard = ({ product, viewType = 'grid' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const effectivePrice = product.discountPrice || product.price;
  const discount = product.discountPrice ? Math.round((1 - product.discountPrice / product.price) * 100) : 0;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  if (viewType === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="flex">
          <div className="relative w-48 h-48">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                -{discount}%
              </span>
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.averageRating} ({product.reviewCount})</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{product.shortDescription}</p>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${effectivePrice.toFixed(2)}</span>
                  {product.discountPrice && (
                    <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button onClick={handleWishlistToggle} className={`p-2 rounded-lg transition-colors ${isInWishlist(product.id) ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-500 hover:text-red-500'}`}>
                  <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => addToComparison(product)} className={`p-2 rounded-lg transition-colors ${isInComparison(product.id) ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 hover:text-blue-500'}`}>
                  <Layers size={20} />
                </button>
                <button onClick={() => setQuickViewOpen(true)} className="p-2 rounded-lg text-gray-500 hover:text-blue-500 transition-colors">
                  <ZoomIn size={20} />
                </button>
                <button onClick={handleQuickAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <QuickViewModal product={product} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{discount}%
          </span>
        )}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={handleWishlistToggle} className={`p-2 rounded-full bg-white bg-opacity-90 transition-colors ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
            <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => addToComparison(product)} className={`p-2 rounded-full bg-white bg-opacity-90 transition-colors ${isInComparison(product.id) ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}>
            <Layers size={18} />
          </button>
          <button onClick={() => setQuickViewOpen(true)} className="p-2 rounded-full bg-white bg-opacity-90 text-gray-600 hover:text-blue-500 transition-colors">
            <ZoomIn size={18} />
          </button>
        </div>
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          Quick Add
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-gray-900 dark:text-white">${effectivePrice.toFixed(2)}</p>
            {product.discountPrice && <p className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>}
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </div>
  );
};

// Advanced Filters Component
const FiltersPanel = ({ onFilterChange, categories, brands, isOpen, onClose }) => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minRating, setMinRating] = useState(0);
  
    const applyFilters = () => {
      onFilterChange({
        categories: selectedCategories,
        brands: selectedBrands,
        priceRange,
        minRating
      });
      if (onClose) onClose();
    };
  
    const clearFilters = () => {
      setSelectedCategories([]);
      setSelectedBrands([]);
      setPriceRange([0, 1000]);
      setMinRating(0);
      onFilterChange({});
    };
  
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
        <div className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold dark:text-white">Filters</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-3 dark:text-white">Categories</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        }
                      }}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm dark:text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Brands */}
            <div>
              <h4 className="font-semibold mb-3 dark:text-white">Brands</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm dark:text-gray-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Price Range */}
            <div>
              <h4 className="font-semibold mb-3 dark:text-white">Price Range</h4>
              <div className="space-y-3">
                <input type="range" min="0" max="1000" value={priceRange[1]} onChange={e => setPriceRange([0, parseInt(e.target.value)])} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            {/* Rating */}
            <div>
              <h4 className="font-semibold mb-3 dark:text-white">Minimum Rating</h4>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                    <button key={rating} onClick={() => setMinRating(rating)} className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => <Star key={i} size={20} className={`cursor-pointer ${minRating >= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                    </button>
                ))}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t dark:border-gray-700">
              <button
                onClick={applyFilters}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Enhanced Header 
const Header = ({ searchTerm, setSearchTerm, setActiveView }) => { // Make sure setActiveView is a prop
  const { cart } = useCart();
  const { wishlistItems } = useWishlist();
  const { comparisonItems } = useComparison();
  const { isDark, toggleTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={() => setActiveView('/')} className="text-2xl font-bold text-gray-800 dark:text-white">
          ShopSphere
        </button>
        <nav className="hidden md:flex gap-6 items-center">
          <button onClick={() => setActiveView('/')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</button>
          <button onClick={() => setActiveView('/products')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Products</button>
          <button onClick={() => setActiveView('/wishlist')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Wishlist</button>
          <button onClick={() => setActiveView('/comparison')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Compare</button>
        </nav>
        <div className="hidden md:flex items-center border dark:border-gray-600 rounded-lg w-1/3 bg-gray-50 dark:bg-gray-700">
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 w-full bg-transparent focus:outline-none dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <Search size={20} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <Bell size={24} />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <User size={24} />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg py-2">
                <button onClick={() => setActiveView('/profile')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
                <button onClick={() => setActiveView('/orders')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Orders</button>
                <button onClick={() => setActiveView('/settings')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</button>
                <hr className="my-1 dark:border-gray-600" />
                <button onClick={() => setActiveView('/logout')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
          <button onClick={() => setActiveView('/wishlist')} className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <Heart size={24} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>
          <button onClick={() => setActiveView('/comparison')} className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <Layers size={24} />
            {comparisonItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {comparisonItems.length}
              </span>
            )}
          </button>
          <button onClick={() => setActiveView('/cart')} className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <ShoppingCart size={24} />
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

// Enhanced Footer
// src/App.jsx

// ... (keep all other code the same)

// Enhanced Footer - CORRECTED
const Footer = ({ setActiveView }) => { // <-- Add setActiveView prop
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-12 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopSphere</h3>
            <p className="text-gray-400 mb-4">Your one-stop shop for the latest tech and gadgets with cutting-edge features.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveView('/about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setActiveView('/contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              <li><button onClick={() => setActiveView('/faq')} className="text-gray-400 hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveView('/products')} className="text-gray-400 hover:text-white transition-colors">Processors</button></li>
              <li><button onClick={() => setActiveView('/products')} className="text-gray-400 hover:text-white transition-colors">Peripherals</button></li>
              <li><button onClick={() => setActiveView('/products')} className="text-gray-400 hover:text-white transition-colors">Monitors</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ... (keep other components the same)
// Enhanced Product Page with Reviews
const ProductDetailPage = () => {
  // In a real app, you'd use a router to get the ID from the URL.
  // For this example, we'll hardcode it.
  const productId = "1"; 

  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToComparison } = useComparison();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const getProduct = async () => {
      const productData = await fetchProductById(productId);
      const reviewsData = await fetchReviews(productId);
      setProduct(productData);
      setProductReviews(reviewsData);
      if (productData) {
        addToRecentlyViewed(productData);
      }
    };
    getProduct();
  }, [productId, addToRecentlyViewed]);

  if (!product) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // You could add a toast notification here for better UX
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative mb-4">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all"
                >
                  <ArrowRight size={24} />
                </button>
              </>
            )}
            <button className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all">
              <ZoomIn size={20} />
            </button>
          </div>
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{product.brand}</p>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.averageRating}</span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">({product.reviewCount} reviews)</span>
          </div>
          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              ${(product.discountPrice || product.price).toFixed(2)}
            </span>
            {product.discountPrice && (
              <>
                <span className="text-2xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Save ${(product.price - product.discountPrice).toFixed(2)}
                </span>
              </>
            )}
          </div>
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{product.shortDescription}</p>
          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${product.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`font-semibold ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>
          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
              >
                {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => addToWishlist(product)}
                className={`flex-1 border-2 font-semibold py-3 px-6 rounded-lg transition-colors ${
                  isInWishlist(product.id)
                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart size={18} className="inline mr-2" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                onClick={() => addToComparison(product)}
                className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                <Layers size={18} className="inline mr-2" />
                Compare
              </button>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags?.map(tag => (
              <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs Section */}
      <div className="border-b dark:border-gray-600 mb-8">
        <nav className="flex space-x-8">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === 'description' && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">{product.fullDescription}</p>
          </div>
        )}
        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b dark:border-gray-600">
                <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-gray-900 dark:text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Review Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">{product.averageRating}</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{product.reviewCount} reviews</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = productReviews.filter(review => Math.floor(review.rating) === rating).length;
                    const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm w-12">{rating} star</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm w-8 text-gray-600 dark:text-gray-400">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Individual Reviews */}
            <div className="space-y-6">
              {productReviews.map(review => (
                <div key={review.id} className="border dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-lg dark:text-white">{review.user}</div>
                      <div className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  {review.verified && <span className="text-xs text-green-600 font-semibold mt-2 inline-block">Verified Purchase</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

//================================================================
// 4. APPLICATION PAGES
//================================================================

// src/App.jsx

// ... (keep all other code the same)

const HomePage = ({ setActiveView }) => { // <-- Add setActiveView here
    const featuredProducts = products.slice(0, 4); 
    const newArrivals = products.slice(4, 8);
    const { recentlyViewed } = useRecentlyViewed();

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">Welcome to ShopSphere</h1>
                    <p className="text-xl mb-8">Discover the best in tech, from components to peripherals.</p>
                    {/* CHANGE THIS LINE */}
                    <button 
                        onClick={() => setActiveView('/products')} 
                        className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Shop Now
                    </button>
                </div>
            </section>

            {/* ... (rest of the HomePage component remains the same) */}
        </div>
    );
};

// ... (keep all other components the same)

const ProductsPage = ({ searchTerm }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
    const [sortOption, setSortOption] = useState('default');
    const [filters, setFilters] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Unique categories and brands for the filter panel
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand))];

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const productsData = await fetchProducts();
            setAllProducts(productsData);
            setFilteredProducts(productsData);
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    useEffect(() => {
        let tempProducts = [...allProducts];

        // Apply Search
        if (searchTerm) {
            tempProducts = tempProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply Filters
        if (filters.categories && filters.categories.length > 0) {
            tempProducts = tempProducts.filter(p => filters.categories.includes(p.category));
        }
        if (filters.brands && filters.brands.length > 0) {
            tempProducts = tempProducts.filter(p => filters.brands.includes(p.brand));
        }
        if (filters.priceRange) {
            tempProducts = tempProducts.filter(p => (p.discountPrice || p.price) <= filters.priceRange[1]);
        }
        if (filters.minRating) {
            tempProducts = tempProducts.filter(p => p.averageRating >= filters.minRating);
        }

        // Apply Sorting
        switch (sortOption) {
            case 'price-asc':
                tempProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                break;
            case 'price-desc':
                tempProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                break;
            case 'rating-desc':
                tempProducts.sort((a, b) => b.averageRating - a.averageRating);
                break;
            case 'name-asc':
                tempProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(tempProducts);

    }, [searchTerm, sortOption, filters, allProducts]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-white">All Products</h1>
                <div className="flex items-center gap-4">
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                        <option value="default">Default Sorting</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">By Rating</option>
                        <option value="name-asc">By Name (A-Z)</option>
                    </select>
                    <div className="hidden md:flex items-center gap-2">
                        <button onClick={() => setViewType('grid')} className={`p-2 rounded ${viewType === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            <Grid size={20} />
                        </button>
                        <button onClick={() => setViewType('list')} className={`p-2 rounded ${viewType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            <List size={20} />
                        </button>
                    </div>
                    <button onClick={() => setIsFilterOpen(true)} className="md:hidden p-2 bg-gray-200 dark:bg-gray-700 rounded">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="flex gap-8">
                <aside className="hidden md:block w-1/4">
                   <FiltersPanel onFilterChange={setFilters} categories={categories} brands={brands} />
                </aside>
                <main className="w-full md:w-3/4">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className={`grid gap-8 ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} viewType={viewType} />
                            ))}
                        </div>
                    )}
                    {filteredProducts.length === 0 && !isLoading && (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold dark:text-white">No Products Found</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </main>
            </div>
             <FiltersPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onFilterChange={setFilters} categories={categories} brands={brands} />
        </div>
    );
};


const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
  
    if (cart.items.length === 0) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <a href="/products" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Continue Shopping
          </a>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div key={item.productId} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg dark:text-white">{item.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2">
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2">
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-bold w-20 text-right dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.productId)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal ({cart.totalItems} items)</span>
                <span className="font-semibold dark:text-white">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-semibold dark:text-white">Free</span>
              </div>
              <div className="border-t dark:border-gray-600 pt-4 mt-4 flex justify-between text-lg">
                <span className="font-bold dark:text-white">Total</span>
                <span className="font-bold dark:text-white">${cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

//================================================================
// 5. MAIN APP COMPONENT & ROUTING
//================================================================

// MAIN APP COMPONENT - CORRECTED
const App = () => {
    const [page, setPage] = useState(window.location.pathname);
    const [searchTerm, setSearchTerm] = useState('');

    const setActiveView = (view) => {
        history.pushState({}, '', view);
        setPage(view);
    };

    const renderPage = () => {
        switch (page) {
            case '/products':
                return <ProductsPage searchTerm={searchTerm} />;
            case '/cart':
                return <CartPage />;
            case '/product-detail':
                return <ProductDetailPage />;
            case '/':
            default:
                return <HomePage setActiveView={setActiveView} />;
        }
    };

    useEffect(() => {
        // This handles browser back/forward buttons
        const handlePopState = () => setPage(window.location.pathname);
        window.addEventListener('popstate', handlePopState);

        // This handles our custom setActiveView navigation
        const originalPushState = history.pushState;
        history.pushState = function(...args) {
            originalPushState.apply(this, args);
            handlePopState(); // Update state when we manually push history
        };

        return () => {
            window.removeEventListener('popstate', handlePopState);
            history.pushState = originalPushState; // Restore original function on cleanup
        };
    }, []);

    return (
        <ThemeProvider>
            <CartProvider>
                <WishlistProvider>
                    <ComparisonProvider>
                        <RecentlyViewedProvider>
                            <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col transition-colors duration-200">
                                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} setActiveView={setActiveView} />
                                <main className="flex-grow">
                                    {renderPage()}
                                </main>
                                {/* Pass the function to the Footer */}
                                <Footer setActiveView={setActiveView} />
                            </div>
                        </RecentlyViewedProvider>
                    </ComparisonProvider>
                </WishlistProvider>
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;