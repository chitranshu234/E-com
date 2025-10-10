import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { X, ArrowLeft, ArrowRight, Star, Minus, Plus, Heart } from '../../utils/icons';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (product) {
            setQuantity(1);
            setCurrentImageIndex(0);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const handleWishlistToggle = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const effectivePrice = product.discountPrice || product.price;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div className="p-4 sm:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A3A2A]">Product Details</h2>
                        <button onClick={onClose} className="text-[#5A7D7C] hover:text-[#0A3A2A] transition-colors p-1 rounded-full hover:bg-gray-100">
                            <X size={28} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="relative">
                                <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg" />
                                {product.images.length > 1 && (
                                    <>
                                        <button onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : product.images.length - 1)} className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"> <ArrowLeft size={24} /> </button>
                                        <button onClick={() => setCurrentImageIndex(prev => prev < product.images.length - 1 ? prev + 1 : 0)} className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"> <ArrowRight size={24} /> </button>
                                    </>
                                )}
                            </div>
                            <div className="flex gap-2 mt-4 overflow-x-auto p-1">
                                {product.images.map((image, index) => (
                                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition-all ${currentImageIndex === index ? 'border-[#10B981] scale-105' : 'border-[#E5E7EB] opacity-60 hover:opacity-100'}`}>
                                        <img src={image} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col text-[#0A3A2A]">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h3>
                            <p className="text-lg text-[#5A7D7C] mb-2">{product.brand}</p>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (<Star key={i} size={18} className={i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />))}
                                </div>
                                <span className="text-md text-[#5A7D7C]">({product.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-4xl font-bold">${(effectivePrice).toFixed(2)}</span>
                                {product.discountPrice && (<span className="text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>)}
                            </div>
                            <p className="text-[#5A7D7C] mb-6 flex-grow">{product.fullDescription || product.shortDescription}</p>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center border border-[#E5E7EB] rounded-lg">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg"> <Minus size={18} /> </button>
                                    <span className="px-5 font-semibold text-lg">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg"> <Plus size={18} /> </button>
                                </div>
                                <button onClick={() => { addToCart(product, quantity); onClose(); }} className="flex-1 bg-[#10B981] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#059669] transition-colors transform hover:scale-105 text-lg"> Add to Cart </button>
                                <button onClick={handleWishlistToggle} className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${isInWishlist(product.id) ? 'text-red-500 bg-red-100' : 'text-gray-500 hover:text-red-500'}`}>
                                    <Heart size={24} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;