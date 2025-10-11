import React, { useState } from 'react';
import { Linkedin, Github } from '../../utils/icons';

const Footer = ({ setActiveView }) => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            alert(`Thank you for subscribing, ${email}! You'll receive our latest updates and offers.`);
            setEmail('');
        } else {
            alert('Please enter a valid email address.');
        }
    };

    return (
        <footer className="bg-white text-[#0A3A2A] mt-12 border-t border-[#E5E7EB]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="animate-fade-in">
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#10B981] to-green-400 text-transparent bg-clip-text">ShopSphere</h3>
                        <p className="text-[#5A7D7C] mb-4">Your one-stop shop for the latest tech and gadgets.</p>
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/in/chitranshupandey/" target="_blank" rel="noopener noreferrer"
                                className="text-[#5A7D7C] hover:text-[#10B981] transition-all duration-200 hover:scale-110">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/chitranshu234" target="_blank" rel="noopener noreferrer"
                                className="text-[#5A7D7C] hover:text-[#10B981] transition-all duration-200 hover:scale-110">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['About Us', 'Contact', 'FAQ'].map(item => (
                                <li key={item}>
                                    <button onClick={() => setActiveView(`/${item.toLowerCase().replace(' ', '')}`)}
                                        className="text-[#5A7D7C] hover:text-[#0A3A2A] transition-colors duration-200 hover:translate-x-1">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {['Processors', 'Peripherals', 'Monitors'].map(item => (
                                <li key={item}>
                                    <button onClick={() => setActiveView('/products')}
                                        className="text-[#5A7D7C] hover:text-[#0A3A2A] transition-colors duration-200 hover:translate-x-1">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
                        <p className="text-[#5A7D7C] mb-4">Get the latest updates on new products and upcoming sales.</p>
                        <form onSubmit={handleSubscribe} className="flex">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 border border-[#E5E7EB] rounded-l-lg focus:outline-none focus:border-[#10B981]"
                            />
                            <button type="submit" className="bg-[#10B981] text-white px-4 py-2 rounded-r-lg hover:bg-[#059669] transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-[#E5E7EB] mt-8 pt-6 text-center text-[#5A7D7C]">
                    <p>&copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;