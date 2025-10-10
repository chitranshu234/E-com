// src/App.jsx

import React, { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { RecentlyViewedProvider } from './contexts/RecentlyViewedContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

function App() {
    const [activeView, setActiveView] = useState('/');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // This effect handles navigation when a search is initiated from any page.
        if (searchTerm && activeView !== '/products') {
            setActiveView('/products');
        }
    }, [searchTerm, activeView]);

    const renderView = () => {
        switch (activeView) {
            case '/products':
                return <ProductsPage searchTerm={searchTerm} />;
            case '/cart':
                return <CartPage setActiveView={setActiveView} />;
            case '/wishlist':
                return <WishlistPage setActiveView={setActiveView} />;
            default:
                return <HomePage setActiveView={setActiveView} />;
        }
    };

    return (
        <CartProvider>
            <WishlistProvider>
                <RecentlyViewedProvider>
                    <div className="bg-[#F7F9F9] text-[#0A3A2A] min-h-screen">
                        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} setActiveView={setActiveView} />
                        <main>
                            {renderView()}
                        </main>
                        <Footer setActiveView={setActiveView} />
                    </div>
                </RecentlyViewedProvider>
            </WishlistProvider>
        </CartProvider>
    );
}

export default App;