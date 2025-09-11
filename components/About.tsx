import React from 'react';

const About: React.FC = () => {
    const text = `שלום, אני ארבל טל, מהנדס חשמל ומתמחה בתכנון חשמל לבנייה רבוייה, בתים פרטיים ומשרדים.\nאני עוסק בתחום מעל ל-10 שנים.\nאם אתם מעצבי פנים או אדריכלים שמחפשים איש מקצוע לתכנון תאורה ומיקומי נקודות חשמל מדויקים, אשמח לעזור לכם.`;

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">אודות</h2>
                <div className="w-24 h-1 bg-yellow-500 mx-auto mb-10"></div>
                <div className="text-xl text-gray-600 leading-relaxed space-y-4">
                    {text.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;