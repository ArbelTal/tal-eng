import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} טל הנדסת חשמל. כל הזכויות שמורות.</p>
            </div>
        </footer>
    );
};

export default Footer;