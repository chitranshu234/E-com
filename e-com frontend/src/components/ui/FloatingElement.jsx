import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FloatingElement = ({ children, initialY = 0, speed = 1 }) => {
    const scrollY = useScrollAnimation();

    return (
        <div
            className="absolute transition-transform duration-100 ease-out"
            style={{
                transform: `translateY(${initialY + scrollY * speed * 0.1}px)`
            }}
        >
            {children}
        </div>
    );
};

export default FloatingElement;