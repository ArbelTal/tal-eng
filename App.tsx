import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { smoothScrollTo } from './utils/smoothScroll';

const App: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (target: React.RefObject<HTMLDivElement> | number) => {
    const headerElement = document.querySelector('header');
    // A fallback height in case the header isn't mounted yet.
    const headerHeight = headerElement ? headerElement.offsetHeight : 80;

    if (typeof target === 'number') {
      smoothScrollTo(target, 800);
    } else if (target.current) {
      // Calculate the target position, accounting for the fixed header.
      const y = target.current.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      smoothScrollTo(y, 800);
    }
  };

  const contactScroll = () => scrollTo(contactRef);

  return (
    <div className="min-h-screen">
      <Header 
        onHomeClick={() => scrollTo(0)}
        onAboutClick={() => scrollTo(aboutRef)}
        onPortfolioClick={() => scrollTo(portfolioRef)}
        onContactClick={contactScroll}
      />
      <main>
        <Hero onContactClick={contactScroll} />
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={portfolioRef}>
          <Portfolio />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
