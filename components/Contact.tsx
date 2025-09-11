import React from 'react';
import { CONTACT_PHONE, CONTACT_EMAIL } from '../constants';

const PhoneIconSVG: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.258 6.433a.75.75 0 0 0 .93.385l.256-.085a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
    </svg>
);

const EnvelopeIconSVG: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
);

const WhatsAppIconSVG: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.8-26.7l-7-4.1-72.5 19 19.3-71.1-4.5-7.4c-18.5-30.7-28.2-65.7-28.2-101.7 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
);

const Contact: React.FC = () => {
    const whatsappNumber = CONTACT_PHONE.replace(/^0/, '972'); // Format for wa.me link

    return (
        <section id="contact" className="py-20 bg-gray-800 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">מוכנים להתחיל פרויקט חדש?</h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    מוזמנים לפנות אליי בטלפון
                </p>
                <div className="flex flex-row justify-center items-start gap-x-4 sm:gap-x-6 w-full">
                    {/* Phone Link */}
                    <a href={`tel:${CONTACT_PHONE}`} className="flex flex-col items-center group text-center flex-1 max-w-[150px]">
                        <div className="bg-yellow-500 p-3 rounded-full mb-2 transition-transform duration-300 group-hover:scale-110 text-gray-900">
                           <PhoneIconSVG className="w-6 h-6" />
                        </div>
                        <span className="text-base font-semibold break-words">{CONTACT_PHONE}</span>
                        <span className="text-yellow-400 font-semibold text-sm mt-1">התקשרו עכשיו</span>
                    </a>

                    {/* WhatsApp Link */}
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group text-center flex-1 max-w-[150px]">
                        <div className="bg-yellow-500 p-3 rounded-full mb-2 transition-transform duration-300 group-hover:scale-110 text-gray-900">
                           <WhatsAppIconSVG className="w-6 h-6" />
                        </div>
                        <span className="text-base font-semibold break-words">{CONTACT_PHONE}</span>
                        <span className="text-yellow-400 font-semibold text-sm mt-1">שלחו הודעה</span>
                    </a>

                    {/* Email Link */}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="flex flex-col items-center group text-center flex-1 max-w-[150px]">
                        <div className="bg-yellow-500 p-3 rounded-full mb-2 transition-transform duration-300 group-hover:scale-110 text-gray-900">
                           <EnvelopeIconSVG className="w-6 h-6" />
                        </div>
                        <span className="text-base font-semibold break-words w-full">{CONTACT_EMAIL}</span>
                        <span className="text-yellow-400 font-semibold text-sm mt-1">שלחו מייל</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;