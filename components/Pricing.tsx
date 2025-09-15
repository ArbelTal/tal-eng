import React from 'react';

// Icons for the pricing cards
const LightbulbIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.451 0-2.713-.58-3.687-1.562a7.036 7.036 0 0 1-3.687-1.562M12 18.75v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.451 0-2.713-.58-3.687-1.562a7.036 7.036 0 0 1-3.687-1.562M12 18.75v-5.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.375c0-1.036.84-1.875 1.875-1.875h1.25c1.036 0 1.875.84 1.875 1.875v.375c0 1.036-.84 1.875-1.875 1.875h-1.25A1.875 1.875 0 0 1 9 9.75v-.375Z" />
    </svg>
);

const BlueprintIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m7.5 4.5 5.25 5.25m0 0L18 4.5M12.75 9.75v10.5M4.5 20.25h15a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25h-15a2.25 2.25 0 0 0-2.25 2.25v11.25a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);

interface PricingProps {
    onContactClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onContactClick }) => {
    return (
        <section id="pricing" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">תמחור ושירותים</h2>
                    <p className="text-xl text-gray-600 mt-4">חבילות שירות שקופות ומותאמות לכל סוגי הפרויקטים</p>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {/* Tier 1: Basic */}
                    <div className="bg-gray-50 rounded-lg shadow-lg p-8 flex flex-col h-full text-center transform hover:scale-105 transition-transform duration-300 border-2 border-gray-800">
                        <LightbulbIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">חבילת ייעוץ</h3>
                        <p className="text-gray-600 mb-6">אידיאלי לפרויקטים קטנים או לקבלת חוות דעת מקצועית</p>
                        <ul className="text-right space-y-3 text-gray-700 mb-8 flex-grow">
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>פגישת ייעוץ ואפיון צרכים</p></li>
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>תכנון ראשוני של נקודות חשמל</p></li>
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>המלצות לתכנון תאורה</p></li>
                        </ul>
                        <button onClick={onContactClick} className="mt-auto w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors">
                            לקבלת הצעת מחיר
                        </button>
                    </div>

                    {/* Tier 2: Comprehensive (Highlighted) */}
                    <div className="relative bg-gray-50 rounded-lg shadow-2xl p-8 pt-12 flex flex-col h-full text-center ring-2 ring-yellow-500 transform md:scale-105">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="bg-yellow-500 text-gray-900 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">החבילה המומלצת</span>
                        </div>
                        <BlueprintIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4"/>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">תכנון מקיף</h3>
                        <p className="text-gray-600 mb-6">הפתרון המלא לבתים פרטיים, דירות ומשרדים</p>
                        <ul className="text-right space-y-3 text-gray-700 mb-8 flex-grow">
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>כל מה שבחבילת הייעוץ</p></li>
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>הכנת תכניות חשמל מלאות בפורמט PDF</p></li>
                        </ul>
                        <button onClick={onContactClick} className="mt-auto w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
                            לקבלת הצעת מחיר
                        </button>
                    </div>

                    {/* Tier 3: Premium */}
                    <div className="bg-gray-50 rounded-lg shadow-lg p-8 flex flex-col h-full text-center transform hover:scale-105 transition-transform duration-300 border-2 border-gray-800">
                        <StarIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">תכנון פרימיום</h3>
                        <p className="text-gray-600 mb-6">לבנייה רבויה, פרויקטים מסחריים ומורכבים</p>
                        <ul className="text-right space-y-3 text-gray-700 mb-8 flex-grow">
                             <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>כל מה שבתכנון המקיף</p></li>
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>מודל תלת-מימדי (Revit)</p></li>
                            <li className="flex items-center"><CheckIcon className="w-5 h-5 text-green-500 ml-3 flex-shrink-0"/><p>זמינות ותמיכה מלאה</p></li>
                        </ul>
                        <button onClick={onContactClick} className="mt-auto w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors">
                            לקבלת הצעת מחיר
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;