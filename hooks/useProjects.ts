import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { PROJECTS as initialProjects } from '../constants';

const LOCAL_STORAGE_KEY = 'portfolio_projects';

export const useProjects = (): [Project[], (project: Omit<Project, 'id'>) => void, (id: number) => void] => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const storedProjects = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
    } catch (error) {
      console.error('Error reading projects from localStorage', error);
    }
    // If nothing is in local storage, initialize with the default projects
    // and save it for the first time.
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialProjects));
    return initialProjects;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage', error);
    }
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects(prevProjects => [
      { ...project, id: Date.now() }, // Use timestamp for unique ID
      ...prevProjects,
    ]);
  };

  const deleteProject = (id: number) => {
    // Add a confirmation before deleting
    if(window.confirm('האם אתה בטוח שברצונך למחוק פרויקט זה?')) {
        setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    }
  };

  return [projects, addProject, deleteProject];
};
