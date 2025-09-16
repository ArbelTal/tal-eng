import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS as projects } from '../constants';
import type { Project } from '../types';

// A redesigned, more accessible project card
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform transition-transform duration-300 md:hover:scale-105 md:hover:shadow-2xl">
        <div className="relative h-56">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <span className="absolute top-4 right-4 text-sm font-semibold bg-yellow-500 text-gray-900 px-3 py-1 rounded-full">{project.category}</span>
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {project.description}
            </p>
        </div>
    </div>
);

// Icon components for carousel navigation
const ChevronLeftIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);


const Portfolio: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Refs for robust touch handling
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isSwiping = useRef(false);

    // Check for mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Reset index if projects array changes to prevent out-of-bounds errors
    useEffect(() => {
        setCurrentIndex(0);
    }, [projects]);


    const nextProject = () => {
        if (projects.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const prevProject = () => {
        if (projects.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isSwiping.current = false; // Reset on new touch
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current === 0) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = touchStartX.current - currentX;
        const diffY = touchStartY.current - currentY;
        
        // Determine if horizontal movement is dominant, which indicates a swipe.
        if (Math.abs(diffX) > Math.abs(diffY)) {
            isSwiping.current = true;
            // This is crucial: it prevents the browser from scrolling the page
            // up and down while the user is trying to swipe left or right.
            e.preventDefault();
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isSwiping.current) {
            touchStartX.current = 0;
            touchStartY.current = 0;
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX.current - touchEndX;
        const swipeThreshold = 50; // Minimum distance to be considered a swipe

        if (diffX > swipeThreshold) { // Swipe left (finger R to L)
            nextProject();
        } else if (diffX < -swipeThreshold) { // Swipe right (finger L to R)
            prevProject();
        }
        
        // Reset refs for the next touch gesture
        touchStartX.current = 0;
        touchStartY.current = 0;
        isSwiping.current = false;
    };
    
    // Common header for both views
    const portfolioHeader = (
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">תיק עבודות</h2>
            <p className="text-xl text-gray-600 mt-4">מבחר פרויקטים נבחרים המדגימים את המומחיות שלי</p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>
    );

    if (projects.length === 0) {
        return (
            <section id="portfolio" className="py-20 bg-gray-200">
                <div className="container mx-auto px-6">
                    {portfolioHeader}
                    <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow">
                        <p className="text-lg">לא נוספו פרויקטים עדיין.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-20 bg-gray-200">
            <div className="container mx-auto px-6">
                {portfolioHeader}
                
                {isMobile ? (
                    // Mobile Carousel View
                    <div className="relative w-full max-w-lg mx-auto" role="region" aria-label="קרוסלת פרויקטים">
                        <div 
                            className="relative h-[29rem] overflow-hidden rounded-lg shadow-xl"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                           {projects.map((project, index) => (
                                <div 
                                    key={project.id} 
                                    aria-hidden={index !== currentIndex}
                                    className="absolute inset-0 transition-all duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(${-(index - currentIndex) * 100}%) scale(${index === currentIndex ? 1 : 0.85})`,
                                        opacity: index === currentIndex ? 1 : 0,
                                    }}
                                >
                                    <ProjectCard project={project} />
                                </div>
                           ))}
                        </div>
                        
                        {/* Dot Indicators */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse">
                             {projects.map((_, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`עבור לפרויקט ${index + 1}`}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-yellow-500 scale-125' : 'bg-gray-400 hover:bg-gray-500'}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    // Desktop Grid View
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                             <div key={project.id} className="animate-grow-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;