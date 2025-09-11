import React from 'react';

interface HeroProps {
    onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 p-8">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">טל הנדסת חשמל</h1>
                <p className="text-2xl md:text-3xl font-light mb-8 drop-shadow-md">ארבל טל | מהנדס חשמל, תכנון וייעוץ</p>
                <button 
                    onClick={onContactClick}
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-xl"
                >
                    ליצירת קשר
                </button>
            </div>
        </section>
    );
};

export default Hero;