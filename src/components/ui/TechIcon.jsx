import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TechIcon = ({ icon: Icon, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <div
            ref={ref}
            className={`p-4 bg-white/20 rounded-full border border-white/30 shadow-lg shadow-emerald-500/10 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <Icon size={32} className="text-[#10B981]" />
        </div>
    );
};

export default TechIcon;