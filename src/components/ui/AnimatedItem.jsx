import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AnimatedItem = ({ children, delay = 0, className = '' }) => {
    const [ref, isVisible] = useIntersectionObserver();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${className} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default AnimatedItem;