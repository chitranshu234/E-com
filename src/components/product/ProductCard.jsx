import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Star, Heart, ZoomIn } from '../../utils/icons';

const ProductCard = ({ product, viewType = 'grid', onQuickViewOpen }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [isHovered, setIsHovered] = useState(false);

    const effectivePrice = product.discountPrice || product.price;
    const discount = product.discountPrice ? Math.round((1 - product.discountPrice / product.price) * 100) : 0;

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleQuickAdd = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleQuickViewClick = (e) => {
        e.stopPropagation();
        onQuickViewOpen(product);
    }

    if (viewType === 'list') {
        return (
            <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                        {discount > 0 && (<span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold animate-pulse">-{discount}%</span>)}
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-[#0A3A2A] mb-2">{product.name}</h3>
                            <p className="text-[#5A7D7C] mb-2">{product.brand}</p>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} size={16} className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />))}</div>
                                <span className="text-sm text-[#5A7D7C]">{product.averageRating} ({product.reviewCount})</span>
                            </div>
                            <p className="text-[#5A7D7C] mb-4">{product.shortDescription}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold text-[#0A3A2A]">${effectivePrice.toFixed(2)}</span>
                                {product.discountPrice && (<span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>)}
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={handleWishlistToggle} className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isInWishlist(product.id) ? 'text-red-500 bg-red-100' : 'text-gray-500 hover:text-red-500'}`}><Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} /></button>
                                <button onClick={handleQuickViewClick} className="p-2 rounded-lg text-gray-500 hover:text-[#10B981] transition-all duration-200 hover:scale-110"><ZoomIn size={20} /></button>
                                <button onClick={handleQuickAdd} className="bg-[#10B981] text-white px-4 py-2 rounded-lg hover:bg-[#059669] transition-all duration-200 font-semibold transform hover:scale-105">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="relative">
                <img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                {discount > 0 && (<span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold animate-pulse">-{discount}%</span>)}
                <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                    <button onClick={handleWishlistToggle} className={`p-2 rounded-full bg-white bg-opacity-90 transition-all duration-200 hover:scale-110 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}><Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} /></button>
                    <button onClick={handleQuickViewClick} className="p-2 rounded-full bg-white bg-opacity-90 text-gray-600 hover:text-[#10B981] transition-all duration-200 hover:scale-110"><ZoomIn size={18} /></button>
                </div>
                <button onClick={handleQuickAdd} className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#10B981] text-white px-4 py-2 rounded-lg hover:bg-[#059669] transition-all duration-300 font-semibold ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>Quick Add</button>
            </div>
            <div className="p-4 text-[#0A3A2A]">
                <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-[#5A7D7C] mb-2">{product.brand}</p>
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />))}</div>
                    <span className="text-sm text-[#5A7D7C]">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold">${effectivePrice.toFixed(2)}</p>
                        {product.discountPrice && <p className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;