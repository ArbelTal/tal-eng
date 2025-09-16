import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import type { Project } from '../types';

// Icons for buttons and UI elements
const EyeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

const PencilIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const LockClosedIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

// Admin page component
const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [projects, addProject, deleteProject, updateProject] = useProjects();
    
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        category: '',
        imageUrl: ''
    });

    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        const pass = prompt('אנא הזן את סיסמת הניהול:');
        if (pass === 'arbel8395') { // Simple hardcoded password
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
    
    // Handlers for the edit modal
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editingProject) return;
        const { name, value } = e.target;
        setEditingProject(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingProject) return;
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingProject(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            updateProject(editingProject.id, {
                title: editingProject.title,
                description: editingProject.description,
                imageUrl: editingProject.imageUrl,
            });
            setEditingProject(null); // Close modal on save
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-10 bg-white shadow-xl rounded-2xl border border-gray-200 max-w-md w-full">
                    <LockClosedIcon className="w-16 h-16 mx-auto text-red-500" />
                    <h1 className="text-3xl font-bold text-red-600 mt-4">גישה נדחתה</h1>
                    <p className="mt-4 text-lg text-gray-600">אין לך הרשאה לגשת לעמוד זה.</p>
                     <a href="/" className="mt-8 inline-block bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                         חזרה לדף הבית
                     </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen" dir="rtl">
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">ניהול תיק עבודות</h1>
                    <a href="/" className="flex items-center gap-x-2 bg-gray-700 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-sm">
                        <EyeIcon className="w-5 h-5" />
                        <span>צפה באתר</span>
                    </a>
                </header>

                {/* Add New Project Form */}
                <div className="bg-white p-8 rounded-xl shadow-xl mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">הוספת פרויקט חדש</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">כותרת</label>
                                <input type="text" name="title" id="title" value={newProject.title} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow duration-200" required />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">קטגוריה</label>
                                <input type="text" name="category" id="category" value={newProject.category} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow duration-200" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">תיאור</label>
                            <textarea name="description" id="description" value={newProject.description} onChange={handleInputChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow duration-200" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">תמונה</label>
                            <input type="file" name="imageUrl" id="imageUrl" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-800 hover:file:bg-yellow-200 cursor-pointer" required />
                            <p className="text-xs text-gray-500 mt-2">מומלץ להעלות תמונות קטנות (מתחת ל-1MB) כדי למנוע חריגה ממגבלת האחסון של הדפדפן.</p>
                        </div>
                        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-[1.01] flex items-center justify-center gap-x-2">
                            <PlusIcon className="w-6 h-6" />
                            <span>הוסף פרויקט</span>
                        </button>
                    </form>
                </div>
                
                {/* Existing Projects List */}
                <div>
                     <h2 className="text-3xl font-bold mb-6 text-gray-800">פרויקטים קיימים ({projects.length})</h2>
                     <div className="space-y-4">
                        {projects.map(project => (
                            <div key={project.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-x-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200">
                                <div className="flex items-center gap-x-4 flex-grow min-w-0">
                                    <img src={project.imageUrl} alt={project.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"/>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-bold truncate text-gray-800">{project.title}</h3>
                                        <p className="text-sm text-gray-500">{project.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2 flex-shrink-0">
                                    <button onClick={() => setEditingProject(project)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center gap-x-1.5">
                                        <PencilIcon className="w-5 h-5"/>
                                        <span className="hidden sm:inline">ערוך</span>
                                    </button>
                                    <button onClick={() => deleteProject(project.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center gap-x-1.5">
                                        <TrashIcon className="w-5 h-5"/>
                                        <span className="hidden sm:inline">מחק</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Edit Project Modal */}
            {editingProject && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    onClick={() => setEditingProject(null)} // Close on backdrop click
                >
                    <div 
                        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-grow-in"
                        onClick={e => e.stopPropagation()} // Prevent closing on modal click
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">עריכת פרויקט</h2>
                        <form onSubmit={handleUpdateSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="editTitle" className="block text-sm font-semibold text-gray-700 mb-1">כותרת</label>
                                <input type="text" name="title" id="editTitle" value={editingProject.title} onChange={handleEditInputChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow duration-200" required />
                            </div>
                            <div>
                                <label htmlFor="editDescription" className="block text-sm font-semibold text-gray-700 mb-1">תיאור</label>
                                <textarea name="description" id="editDescription" value={editingProject.description} onChange={handleEditInputChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow duration-200" required></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">תמונה נוכחית</label>
                                <img src={editingProject.imageUrl} alt="תמונה נוכחית" className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-200"/>
                            </div>
                            <div>
                                <label htmlFor="editImageUrl" className="block text-sm font-semibold text-gray-700 mb-1">החלף תמונה</label>
                                <input type="file" name="imageUrl" id="editImageUrl" onChange={handleEditImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-800 hover:file:bg-yellow-200 cursor-pointer" />
                            </div>
                            <div className="flex justify-end gap-x-4 pt-4 border-t border-gray-200 mt-8">
                                <button type="button" onClick={() => setEditingProject(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors">
                                    ביטול
                                </button>
                                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors">
                                    שמור שינויים
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;