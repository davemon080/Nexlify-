
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, Project, Service, Enquiry } from '../types';
import { SERVICES, PORTFOLIO } from '../constants';

interface DataContextType {
  data: SiteData;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Project) => void;
  deleteProject: (id: string) => void;
  updateServices: (services: Service[]) => void;
  updateLogo: (logoBase64: string | null) => void;
  updateHeroImage: (imageBase64: string | null) => void;
  updatePasscode: (newPasscode: string) => void;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date'>) => void;
  deleteEnquiry: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('nexlify_data');
    if (saved) return JSON.parse(saved);
    return {
      logo: null,
      heroImage: null,
      passcode: '1234',
      services: SERVICES,
      projects: PORTFOLIO.map(p => ({ ...p, id: p.id.toString() })),
      enquiries: [],
      aboutContent: {
        heroTitle: "The Story Behind Nexlify.",
        mainText: "Nexlify began with a simple observation: most digital agencies either focused solely on code or solely on design. There was a missing bridge between raw technical power and artistic storytelling.",
        secondaryText: "I founded Nexlify to be that bridge. We combine the precision of high-end web development with the emotional impact of professional writing and graphic design."
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('nexlify_data', JSON.stringify(data));
  }, [data]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const updateProject = (id: string, updated: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? updated : p)
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateServices = (services: Service[]) => {
    setData(prev => ({ ...prev, services }));
  };

  const updateLogo = (logoBase64: string | null) => {
    setData(prev => ({ ...prev, logo: logoBase64 }));
  };

  const updateHeroImage = (imageBase64: string | null) => {
    setData(prev => ({ ...prev, heroImage: imageBase64 }));
  };

  const updatePasscode = (newPasscode: string) => {
    setData(prev => ({ ...prev, passcode: newPasscode }));
  };

  const addEnquiry = (enquiry: Omit<Enquiry, 'id' | 'date'>) => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
    };
    setData(prev => ({ ...prev, enquiries: [newEnquiry, ...prev.enquiries] }));
  };

  const deleteEnquiry = (id: string) => {
    setData(prev => ({
      ...prev,
      enquiries: prev.enquiries.filter(e => e.id !== id)
    }));
  };

  return (
    <DataContext.Provider value={{ 
      data, 
      addProject, 
      updateProject, 
      deleteProject, 
      updateServices, 
      updateLogo, 
      updateHeroImage,
      updatePasscode,
      addEnquiry,
      deleteEnquiry
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
