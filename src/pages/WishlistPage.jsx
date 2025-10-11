import React, { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useRecentlyViewed } from '../contexts/RecentlyViewedContext';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import { Heart } from '../utils/icons';

const WishlistPage = ({ setActiveView }) => {
    const { wishlistItems } = useWishlist();
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const { addToRecentlyViewed } = useRecentlyViewed();

    const handleOpenQuickView = (product) => {
        setQuickViewProduct(product);
        addToRecentlyViewed(product);
    };

    const handleCloseQuickView = () => {
        setQuickViewProduct(null);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <Heart size={64} className="mx-auto text-gray-400 mb-4 animate-pulse" />
                <h1 className="text-3xl font-bold mb-2 text-[#0A3A2A]">Your Wishlist is Empty</h1>
                <p className="text-[#5A7D7C] mb-6">Add products you love to your wishlist to see them here.</p>
                <button onClick={() => setActiveView('/products')}
                    className="bg-[#10B981] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#059669] transition-all duration-200 transform hover:scale-105">
                    Discover Products
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-[#0A3A2A]">Your Wishlist</h1>
                <div className="grid grid-cols-1 gap-6">
                    {wishlistItems.map((product, idx) => (
                        <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <ProductCard product={product} viewType="list" onQuickViewOpen={handleOpenQuickView} />
                        </div>
                    ))}
                </div>
            </div>
            <QuickViewModal isOpen={!!quickViewProduct} product={quickViewProduct} onClose={handleCloseQuickView} />
        </>
    );
};

export default WishlistPage;