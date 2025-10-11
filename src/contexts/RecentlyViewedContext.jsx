import React, { useState, useContext, createContext } from 'react';

const RecentlyViewedContext = createContext();
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(item => item.id !== product.id);
            return [product, ...filtered].slice(0, 5);
        });
    };

    return (
        <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
            {children}
        </RecentlyViewedContext.Provider>
    );
};