import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Minus, Plus, Trash2 } from '../utils/icons';

const CartPage = ({ setActiveView }) => {
    const { cart, updateQuantity, removeFromCart } = useCart();

    if (cart.items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold mb-2 text-[#0A3A2A]">Your Cart is Empty</h1>
                <p className="text-[#5A7D7C] mb-6">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => setActiveView('/products')}
                    className="bg-[#10B981] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#059669] transition-all duration-200 transform hover:scale-105">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-[#0A3A2A]">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item, idx) => (
                        <div key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow-md animate-fade-in-up border border-[#E5E7EB]"
                            style={{ animationDelay: `${idx * 100}ms` }}>
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4 mb-4 sm:mb-0" />
                            <div className="flex-1 mb-4 sm:mb-0">
                                <h2 className="font-semibold text-lg text-[#0A3A2A]">{item.name}</h2>
                                <p className="text-[#5A7D7C]">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                                <div className="flex items-center border border-[#E5E7EB] rounded-lg">
                                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        className="p-2 hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-4 font-semibold text-[#0A3A2A]">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        className="p-2 hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <p className="font-bold w-20 text-right text-[#0A3A2A]">${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.productId)}
                                    className="text-gray-500 hover:text-red-500 transition-all duration-200 hover:scale-110">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md h-fit border border-[#E5E7EB]">
                    <h2 className="text-xl font-semibold mb-4 text-[#0A3A2A]">Order Summary</h2>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-[#5A7D7C]">
                            <span>Subtotal ({cart.totalItems} items)</span>
                            <span className="font-semibold text-[#0A3A2A]">${cart.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#5A7D7C]">
                            <span>Shipping</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="border-t border-[#E5E7EB] pt-4 mt-4 flex justify-between text-lg">
                            <span className="font-bold text-[#0A3A2A]">Total</span>
                            <span className="font-bold text-[#0A3A2A]">${cart.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="w-full bg-[#10B981] text-white font-semibold py-3 rounded-lg hover:bg-[#059669] transition-all duration-200 transform hover:scale-105">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;