import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productService';
import { useRecentlyViewed } from '../contexts/RecentlyViewedContext';

import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import AnimatedItem from '../components/ui/AnimatedItem';
import FloatingElement from '../components/ui/FloatingElement';
import StatCounter from '../components/ui/StatCounter';
import TechIcon from '../components/ui/TechIcon';

import { Zap, Star, Monitor, Smartphone, Gamepad2, Cpu, HardDrive, Headphones, ChevronDown, ArrowRight, Shield } from '../utils/icons';


const HomePage = ({ setActiveView }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const productsData = await fetchProducts();
            setProducts(productsData);
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    const handleOpenQuickView = (product) => {
        setQuickViewProduct(product);
        addToRecentlyViewed(product);
    };

    const handleCloseQuickView = () => {
        setQuickViewProduct(null);
    };

    const scrollToProducts = () => {
        document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#F7F9F9]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10B981]"></div>
            </div>
        );
    }

    return (
        <>
            <style>
                {`
                    @keyframes gentle-float {
                        0%, 100% { transform: translateY(-5%); }
                        50% { transform: translateY(5%); }
                    }
                    .animate-gentle-float {
                        animation: gentle-float 4s ease-in-out infinite;
                    }
                `}
            </style>

            <div className="space-y-20 bg-[#F7F9F9] text-[#0A3A2A]">
                <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50">
                    <div className="absolute inset-0 overflow-hidden">
                        <FloatingElement initialY={100} speed={-0.5}>
                            <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        </FloatingElement>
                        <FloatingElement initialY={200} speed={-0.3}>
                            <div className="absolute top-40 left-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
                        </FloatingElement>
                    </div>

                    <div className="container mx-auto px-4 py-20 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                            <div className="space-y-8">
                                <div className="space-y-6 animate-fade-in">
                                    <div className="flex items-center gap-2 text-[#10B981] text-sm font-medium">
                                        <Zap size={16} />
                                        <span>Next-Gen Tech Store</span>
                                    </div>
                                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-[#0A3A2A]">
                                        Future of
                                        <br />
                                        <span className="bg-gradient-to-r from-[#10B981] via-green-500 to-teal-400 text-transparent bg-clip-text animate-gradient">
                                            Technology
                                        </span>
                                    </h1>
                                    <p className="text-lg sm:text-xl text-[#5A7D7C] leading-relaxed max-w-lg">
                                        Discover cutting-edge components, revolutionary peripherals, and next-gen devices that power the digital future.
                                    </p>
                                </div>
                                <div className="grid grid-cols-3 gap-6 py-8">
                                    <StatCounter end={50000} label="Products" />
                                    <StatCounter end={25000} label="Customers" />
                                    <StatCounter end={99} label="Satisfaction" />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setActiveView('/products')}
                                        className="group relative px-8 py-4 bg-gradient-to-r from-[#10B981] to-green-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-105"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative flex items-center justify-center gap-2">
                                            <span>Explore Products</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                    <button
                                        onClick={scrollToProducts}
                                        className="px-8 py-4 border-2 border-gray-300 text-[#0A3A2A] font-semibold rounded-lg hover:border-[#10B981] hover:text-[#10B981] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <span>Check Demo</span>
                                    </button>
                                </div>
                            </div>

                            <div className="relative h-96 flex items-center justify-center">
                                <div className="absolute w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative w-full h-full max-w-md">
                                    <div className="absolute top-[5%] left-[50%] -translate-x-1/2 animate-gentle-float" style={{ animationDelay: '0s' }}>
                                        <TechIcon icon={Monitor} delay={200} />
                                    </div>
                                    <div className="absolute top-[35%] left-[5%] animate-gentle-float" style={{ animationDelay: '1s' }}>
                                        <TechIcon icon={Smartphone} delay={400} />
                                    </div>
                                    <div className="absolute top-[25%] right-[-5%] animate-gentle-float" style={{ animationDelay: '2s' }}>
                                        <TechIcon icon={Gamepad2} delay={600} />
                                    </div>
                                    <div className="absolute bottom-[5%] left-[15%] animate-gentle-float" style={{ animationDelay: '3s' }}>
                                        <TechIcon icon={Cpu} delay={800} />
                                    </div>
                                    <div className="absolute bottom-[5%] right-[10%] animate-gentle-float" style={{ animationDelay: '2.5s' }}>
                                        <TechIcon icon={HardDrive} delay={1000} />
                                    </div>
                                    <div className="absolute bottom-[25%] left-[50%] -translate-x-1/2 animate-gentle-float" style={{ animationDelay: '1.5s' }}>
                                        <TechIcon icon={Headphones} delay={1200} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="flex flex-col items-center gap-2 text-[#5A7D7C]">
                                <span className="text-sm">Scroll to explore</span>
                                <ChevronDown size={24} />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="featured-products" className="container mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full text-emerald-600 text-sm font-medium mb-4">
                            <Star size={16} />
                            <span>Featured Collection</span>
                        </div>
                        <h2 className="text-4xl font-bold text-[#0A3A2A] mb-4">
                            Premium Tech Products
                        </h2>
                        <p className="text-[#5A7D7C] text-lg max-w-2xl mx-auto">
                            Handpicked selection of the most innovative and powerful technology products
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.slice(0, 4).map((product, idx) => (
                            <AnimatedItem key={product.id} delay={idx * 150}>
                                <ProductCard product={product} onQuickViewOpen={handleOpenQuickView} />
                            </AnimatedItem>
                        ))}
                    </div>
                </section>

                <section className="relative py-20 overflow-hidden bg-white">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-[#0A3A2A] mb-6">
                                    Innovation Meets Performance
                                </h2>
                                <p className="text-[#5A7D7C] text-lg mb-8 leading-relaxed">
                                    Experience the perfect fusion of cutting-edge technology and unmatched performance.
                                    Our carefully curated selection represents the pinnacle of modern engineering.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                                            <Zap size={24} className="text-[#10B981]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0A3A2A] mb-2">Lightning Fast</h3>
                                            <p className="text-[#5A7D7C]">Advanced components delivering unprecedented speed and efficiency</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                                            <Shield size={24} className="text-[#10B981]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0A3A2A] mb-2">Built to Last</h3>
                                            <p className="text-[#5A7D7C]">Premium materials and rigorous testing ensure long-lasting reliability</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                                            <Cpu size={24} className="text-[#10B981]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0A3A2A] mb-2">Future Ready</h3>
                                            <p className="text-[#5A7D7C]">Designed for tomorrow's applications and technologies</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    {products.slice(4, 8).map((product, idx) => (
                                        <AnimatedItem key={product.id} delay={idx * 100} className="transition-all duration-700 opacity-0 translate-y-4 rotate-3">
                                            <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] hover:border-[#10B981] transition-all duration-300 group">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <h4 className="text-[#0A3A2A] font-semibold text-sm truncate">{product.name}</h4>
                                                <p className="text-[#10B981] font-bold">${(product.discountPrice || product.price).toFixed(2)}</p>
                                            </div>
                                        </AnimatedItem>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {recentlyViewed.length > 0 && (
                    <section className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#0A3A2A] mb-4">Recently Viewed</h2>
                            <p className="text-[#5A7D7C]">Continue exploring your interests</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                            {recentlyViewed.map((product, idx) => (
                                <AnimatedItem key={product.id} delay={idx * 100} className="transition-all duration-500 opacity-0 -translate-x-4">
                                    <ProductCard product={product} onQuickViewOpen={handleOpenQuickView} />
                                </AnimatedItem>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <QuickViewModal isOpen={!!quickViewProduct} product={quickViewProduct} onClose={handleCloseQuickView} />
        </>
    );
};

export default HomePage;