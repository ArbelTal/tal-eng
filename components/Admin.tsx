import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';

// Admin page component
const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [projects, addProject, deleteProject] = useProjects();
    
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        category: '',
        imageUrl: ''
    });

    useEffect(() => {
        const pass = prompt('אנא הזן את סיסמת הניהול:');
        if (pass === 'ArbelAdmin2024') { // Simple hardcoded password
            setIsAuthenticated(true);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProject(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newProject.title && newProject.description && newProject.category && newProject.imageUrl) {
            addProject(newProject);
            // Reset form fields
            setNewProject({ title: '', description: '', category: '', imageUrl: '' });
             const fileInput = document.getElementById('imageUrl') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
        } else {
            alert('נא למלא את כל השדות.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-red-600">גישה נדחתה</h1>
                    <p className="mt-4 text-lg text-gray-700">אין לך הרשאה לגשת לעמוד זה.</p>
                     <a href="/" className="mt-6 inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-600">חזרה לדף הבית</a>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 pt-24" dir="rtl">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-4xl font-bold text-gray-800">ניהול תיק עבודות</h1>
                <a href="/" className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors">צפה באתר</a>
            </div>

            {/* Add New Project Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-2xl font-bold mb-6">הוספת פרויקט חדש</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">כותרת</label>
                        <input type="text" name="title" id="title" value={newProject.title} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">קטגוריה</label>
                        <input type="text" name="category" id="category" value={newProject.category} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">תיאור</label>
                        <textarea name="description" id="description" value={newProject.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">תמונה</label>
                        <input type="file" name="imageUrl" id="imageUrl" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200" required />
                        <p className="text-xs text-gray-500 mt-1">מומלץ להעלות תמונות קטנות (מתחת ל-1MB) כדי למנוע חריגה ממגבלת האחסון של הדפדפן.</p>
                    </div>
                    <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-md transition-colors text-lg">הוסף פרויקט</button>
                </form>
            </div>
            
            {/* Existing Projects List */}
            <div>
                 <h2 className="text-2xl font-bold mb-6">פרויקטים קיימים ({projects.length})</h2>
                 <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-x-4">
                            <div className="flex items-center gap-x-4 flex-grow min-w-0">
                                <img src={project.imageUrl} alt={project.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"/>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-bold truncate">{project.title}</h3>
                                    <p className="text-sm text-gray-600">{project.category}</p>
                                </div>
                            </div>
                            <button onClick={() => deleteProject(project.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 sm:px-4 rounded-md transition-colors flex-shrink-0">מחק</button>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default AdminPage;