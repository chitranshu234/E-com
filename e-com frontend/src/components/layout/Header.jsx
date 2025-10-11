import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { ShoppingCart, Search, User, Heart, Menu, X } from '../../utils/icons';

const Header = ({ searchTerm, setSearchTerm, setActiveView }) => {
    const { cart } = useCart();
    const { wishlistItems } = useWishlist();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (view) => {
        setActiveView(view);
        setIsMenuOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setActiveView('/products');
        }
    }

    return (
        <header className="bg-white/80 shadow-md sticky top-0 z-40 backdrop-blur-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <button onClick={() => handleNavClick('/')} className="flex items-center gap-2 group">
                    <ShoppingCart className="text-[#10B981] group-hover:text-[#059669] transition-colors duration-200 transform group-hover:scale-110" size={28} />
                    <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#10B981] to-green-400 text-transparent bg-clip-text">
                        ShopSphere
                    </span>
                </button>

                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex gap-6 items-center">
                        {['Home', 'Products', 'Wishlist'].map((item, idx) => (
                            <button key={item} onClick={() => handleNavClick(idx === 0 ? '/' : `/${item.toLowerCase()}`)}
                                className="text-[#5A7D7C] hover:text-[#10B981] transition-all duration-200 hover:scale-105 relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all duration-300"></span>
                            </button>
                        ))}
                    </nav>
                    <form onSubmit={handleSearchSubmit} className="flex items-center border border-[#E5E7EB] rounded-lg w-72 bg-gray-50 focus-within:border-[#10B981] transition-all duration-200">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="px-4 py-2 w-full bg-transparent focus:outline-none text-[#0A3A2A] placeholder-[#5A7D7C]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="p-2 text-[#5A7D7C] hover:text-[#10B981] transition-colors duration-200">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-4 text-[#0A3A2A]">
                    <a href="https://chitranshupandey234.netlify.app" target="_blank" rel="noopener noreferrer"
                        className="hover:text-[#10B981] transition-all duration-200 hover:scale-110" title="View Portfolio">
                        <User size={24} />
                    </a>
                    <button onClick={() => handleNavClick('/wishlist')} className="relative hover:text-red-500 transition-all duration-200 hover:scale-110">
                        <Heart size={24} />
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                {wishlistItems.length}
                            </span>
                        )}
                    </button>
                    <button onClick={() => handleNavClick('/cart')} className="relative hover:text-[#10B981] transition-all duration-200 hover:scale-110">
                        <ShoppingCart size={24} />
                        {cart.totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#10B981] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                {cart.totalItems}
                            </span>
                        )}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden hover:text-[#10B981] transition-transform duration-300">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-[#E5E7EB] animate-fade-in-down">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <nav className="flex flex-col gap-4">
                            {['Home', 'Products', 'Wishlist'].map((item, idx) => (
                                <button key={item} onClick={() => handleNavClick(idx === 0 ? '/' : `/${item.toLowerCase()}`)}
                                    className="text-[#0A3A2A] hover:text-[#10B981] text-left py-2 text-lg">
                                    {item}
                                </button>
                            ))}
                        </nav>
                        <form onSubmit={handleSearchSubmit} className="flex items-center border border-[#E5E7EB] rounded-lg bg-gray-50 focus-within:border-[#10B981]">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 w-full bg-transparent focus:outline-none text-[#0A3A2A]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="p-2 text-gray-400 hover:text-[#10B981]">
                                <Search size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;