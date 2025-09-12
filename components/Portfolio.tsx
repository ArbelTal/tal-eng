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
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    
    // Refs for robust touch handling
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isSwiping = useRef(false);
    const carouselRef = useRef<HTMLDivElement>(null);

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
        setIsDragging(true);
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isSwiping.current = false; // Reset on new touch
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - touchStartX.current;
        const diffY = currentY - touchStartY.current;
        
        if (!isSwiping.current) {
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                isSwiping.current = true;
            } else if (Math.abs(diffY) > Math.abs(diffX)) {
                setIsDragging(false);
                return;
            } else {
                return;
            }
        }
        
        e.preventDefault();
        setDragOffset(diffX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (!isSwiping.current) {
            setDragOffset(0);
            return;
        }
        
        const carouselWidth = carouselRef.current?.offsetWidth;
        const swipeThreshold = carouselWidth ? carouselWidth / 4 : 50;

        if (dragOffset < -swipeThreshold) { // Swipe right-to-left
            prevProject();
        } else if (dragOffset > swipeThreshold) { // Swipe left-to-right
            nextProject();
        }
        
        setDragOffset(0);
        
        touchStartX.current = 0;
        touchStartY.current = 0;
        isSwiping.current = false;
    };
    
    const portfolioHeader = (
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">תיק עבודות</h2>
            <p className="text-xl text-gray-600 mt-4">מבחר פרויקטים נבחרים המדגימים את המומחיות שלי</p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>
    );

    if (projects.length === 0) {
        return (
            <section id="portfolio" className="py-20 bg-gray-100">
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
        <section id="portfolio" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                {portfolioHeader}
                
                {isMobile ? (
                    // Mobile Carousel View
                    <div className="relative w-full max-w-lg mx-auto" role="region" aria-label="קרוסלת פרויקטים">
                        <div 
                            ref={carouselRef}
                            className="relative h-[29rem] cursor-grab active:cursor-grabbing overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                           {projects.map((project, index) => {
                                const offset = index - currentIndex;
                                const isVisible = Math.abs(offset) <= 1;

                                // Calculate the transform based on drag and resting state
                                const dragPercentage = (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100;
                                const finalTranslateX = (-offset * 100) + (isDragging ? dragPercentage : 0);
                                const distance = Math.abs(finalTranslateX / 100);
                                const finalScale = Math.max(0, 1 - distance * 0.2);

                                return (
                                    <div 
                                        key={project.id} 
                                        aria-hidden={index !== currentIndex}
                                        className="absolute inset-0"
                                        style={{ 
                                            transform: `translateX(${finalTranslateX}%) scale(${finalScale})`,
                                            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                                            opacity: isVisible || isDragging ? 1 : 0,
                                            zIndex: projects.length - Math.abs(offset),
                                            pointerEvents: offset === 0 ? 'auto' : 'none',
                                        }}
                                    >
                                        <ProjectCard project={project} />
                                    </div>
                                );
                           })}
                        </div>

                        {/* Navigation Buttons */}
                         <button 
                            onClick={prevProject} 
                            aria-label="הפרויקט הקודם"
                            className="absolute top-1/2 -left-3 sm:-left-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition z-20">
                             <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                        </button>
                         <button 
                            onClick={nextProject} 
                            aria-label="הפרויקט הבא"
                            className="absolute top-1/2 -right-3 sm:-right-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition z-20">
                            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                        </button>
                        
                        {/* Dot Indicators */}
                        <div className="absolute -bottom-12 inset-x-0">
                            <div className="relative mx-auto flex w-fit items-center justify-center gap-3 p-1">
                                {projects.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`עבור לפרויקט ${index + 1}`}
                                        className="h-3 w-3 rounded-full bg-gray-400 transition-colors hover:bg-gray-500"
                                        aria-current={index === currentIndex ? 'true' : 'false'}
                                    />
                                ))}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-yellow-500 transition-transform duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(${-currentIndex * 1.5}rem) translateY(-50%)`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Desktop Grid View
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;