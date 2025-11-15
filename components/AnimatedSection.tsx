
import React, { FC, ReactNode } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

export const AnimatedSection: FC<{ children: ReactNode, className?: string }> = ({ children, className }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div ref={ref} className={`${className} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {isVisible && <div className="fade-in-up">{children}</div>}
        </div>
    );
};
