import React, { useState, useEffect } from 'react';

const BoltIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
    </svg>
);

const MenuIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const PortfolioIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.92a2.25 2.25 0 0 1-2.25-2.25v-4.07a2.25 2.25 0 0 1 .526-1.442l3.3-4.4a2.25 2.25 0 0 1 1.832-.888h5.244a2.25 2.25 0 0 1 1.832.888l3.3 4.4a2.25 2.25 0 0 1 .526 1.442Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75V9.75a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v3" />
    </svg>
);

const AboutIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const ContactIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
);

interface HeaderProps {
    onAboutClick: () => void;
    onPortfolioClick: () => void;
    onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onPortfolioClick, onContactClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => {
             document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    const handleLinkClick = (scrollFunc: () => void) => {
        setIsMenuOpen(false);
        // Use a short timeout to allow the menu to start its closing animation
        // before the scroll begins, which feels smoother.
        setTimeout(() => {
            scrollFunc();
        }, 300);
    };
    
    const navLinkClasses = "cursor-pointer text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold";
    
    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-gray-800 shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <BoltIcon className="w-7 h-7 text-yellow-400" />
                        <span className="text-2xl font-bold text-white">טל הנדסת חשמל</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-x-8">
                        <button onClick={onPortfolioClick} className={navLinkClasses}>תיק עבודות</button>
                        <button onClick={onAboutClick} className={navLinkClasses}>אודות</button>
                        <button onClick={onContactClick} className={navLinkClasses}>צור קשר</button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="text-white p-2" aria-label="פתח תפריט">
                            <MenuIcon className="w-7 h-7"/>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div 
                role="button"
                tabIndex={0}
                aria-label="סגור תפריט"
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div className={`fixed top-0 right-0 h-full w-1/2 max-w-[190px] bg-black/50 backdrop-blur-lg shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-2xl`}>
                 <div className="p-6 flex justify-between items-center border-b border-white/20">
                    <span className="text-xl font-bold text-white">תפריט</span>
                    <button onClick={() => setIsMenuOpen(false)} className="text-white p-2" aria-label="סגור תפריט">
                        <CloseIcon className="w-7 h-7"/>
                    </button>
                </div>
                <nav className="flex flex-col p-6 space-y-4">
                    <button onClick={() => handleLinkClick(onPortfolioClick)} className={`${navLinkClasses} text-right py-2 flex items-center justify-start gap-x-4 w-full`}>
                        <PortfolioIcon className="w-6 h-6"/>
                        <span>תיק עבודות</span>
                    </button>
                    <button onClick={() => handleLinkClick(onAboutClick)} className={`${navLinkClasses} text-right py-2 flex items-center justify-start gap-x-4 w-full`}>
                        <AboutIcon className="w-6 h-6"/>
                        <span>אודות</span>
                    </button>
                    <button onClick={() => handleLinkClick(onContactClick)} className={`${navLinkClasses} text-right py-2 flex items-center justify-start gap-x-4 w-full`}>
                        <ContactIcon className="w-6 h-6"/>
                        <span>צור קשר</span>
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Header;