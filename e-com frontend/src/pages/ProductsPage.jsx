import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productService';
import { useRecentlyViewed } from '../contexts/RecentlyViewedContext';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import { Grid, List } from '../utils/icons';

const ProductsPage = ({ searchTerm }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewType, setViewType] = useState('grid');
    const [sortOption, setSortOption] = useState('default');
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const { addToRecentlyViewed } = useRecentlyViewed();

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
        if (searchTerm) {
            tempProducts = tempProducts.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        }
        switch (sortOption) {
            case 'price-asc': tempProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
            case 'price-desc': tempProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
            case 'rating-desc': tempProducts.sort((a, b) => b.averageRating - a.averageRating); break;
            case 'name-asc': tempProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
            default: break;
        }
        setFilteredProducts(tempProducts);
    }, [searchTerm, sortOption, allProducts]);

    const handleOpenQuickView = (product) => {
        setQuickViewProduct(product);
        addToRecentlyViewed(product);
    };

    const handleCloseQuickView = () => {
        setQuickViewProduct(null);
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-[#0A3A2A]">All Products</h1>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
                            className="flex-grow border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white text-[#0A3A2A]">
                            <option value="default">Default Sorting</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating-desc">By Rating</option>
                            <option value="name-asc">By Name (A-Z)</option>
                        </select>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setViewType('grid')}
                                className={`p-2 rounded transition-all duration-200 hover:scale-110 ${viewType === 'grid' ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-600'}`}>
                                <Grid size={20} />
                            </button>
                            <button onClick={() => setViewType('list')}
                                className={`p-2 rounded transition-all duration-200 hover:scale-110 ${viewType === 'list' ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-600'}`}>
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <main>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10B981]"></div>
                        </div>
                    ) : (
                        <div className={`grid gap-8 ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                            {filteredProducts.map((product, idx) => (
                                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <ProductCard product={product} viewType={viewType} onQuickViewOpen={handleOpenQuickView} />
                                </div>
                            ))}
                        </div>
                    )}
                    {filteredProducts.length === 0 && !isLoading && (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold text-[#0A3A2A]">No Products Found</h2>
                            <p className="text-[#5A7D7C] mt-2">Try adjusting your search.</p>
                        </div>
                    )}
                </main>
            </div>
            <QuickViewModal isOpen={!!quickViewProduct} product={quickViewProduct} onClose={handleCloseQuickView} />
        </>
    );
};

export default ProductsPage;