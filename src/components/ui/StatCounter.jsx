import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const StatCounter = ({ end, label, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useIntersectionObserver();

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const increment = end / (duration / 16); // Run at roughly 60fps
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isVisible, end, duration]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl font-bold text-[#10B981] mb-2">{count.toLocaleString()}+</div>
            <div className="text-[#5A7D7C]">{label}</div>
        </div>
    );
};

export default StatCounter;