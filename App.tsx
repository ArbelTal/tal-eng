import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPage from './components/Admin';

// This component contains the main layout of the portfolio website
const PortfolioLayout: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      <Header 
        onAboutClick={() => scrollTo(aboutRef)}
        onPortfolioClick={() => scrollTo(portfolioRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <main>
        <Hero onContactClick={() => scrollTo(contactRef)} />
        <div ref={portfolioRef}>
          <Portfolio />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// The main App component now handles the application's routing
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PortfolioLayout />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default App;