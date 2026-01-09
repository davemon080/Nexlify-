
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, Project, Service, Enquiry } from '../types';
import { SERVICES, PORTFOLIO } from '../constants';
import { dbService } from '../services/dbService';

interface DataContextType {
  data: SiteData;
  isLoading: boolean;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateLogo: (logoBase64: string | null) => Promise<void>;
  updateHeroImage: (imageBase64: string | null) => Promise<void>;
  updatePasscode: (newPasscode: string) => Promise<void>;
  updateAboutContent: (content: SiteData['aboutContent']) => Promise<void>;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date'>) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  setupDatabase: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [data, setData] = useState<SiteData>({
    logo: null,
    heroImage: null,
    passcode: '1234',
    services: SERVICES,
    projects: PORTFOLIO,
    enquiries: [],
    aboutContent: { 
      heroTitle: "The Story Behind Nexlify.", 
      mainText: "Nexlify began with a simple observation: most digital agencies either focused solely on code or solely on design.", 
      secondaryText: "We combine the precision of high-end web development with the emotional impact of professional writing." 
    }
  });

  const refreshData = async () => {
    try {
      const remoteData = await dbService.getSiteData();
      setData(remoteData);
    } catch (err) {
      console.error("Data refresh failed:", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const setupDatabase = async () => {
    await dbService.setupDatabase();
    await refreshData();
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    await dbService.addProject(newProject);
    setData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const deleteProject = async (id: string) => {
    await dbService.deleteProject(id);
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const updateLogo = async (logoBase64: string | null) => {
    await dbService.updateConfig('logo', logoBase64);
    setData(prev => ({ ...prev, logo: logoBase64 }));
  };

  const updateHeroImage = async (imageBase64: string | null) => {
    await dbService.updateConfig('heroImage', imageBase64);
    setData(prev => ({ ...prev, heroImage: imageBase64 }));
  };

  const updatePasscode = async (newPasscode: string) => {
    await dbService.updateConfig('passcode', newPasscode);
    setData(prev => ({ ...prev, passcode: newPasscode }));
  };

  const updateAboutContent = async (content: SiteData['aboutContent']) => {
    await dbService.updateConfig('about_heroTitle', content.heroTitle);
    await dbService.updateConfig('about_mainText', content.mainText);
    await dbService.updateConfig('about_secondaryText', content.secondaryText);
    setData(prev => ({ ...prev, aboutContent: content }));
  };

  const addEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'date'>) => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
    };
    await dbService.addEnquiry(newEnquiry);
    setData(prev => ({ ...prev, enquiries: [newEnquiry, ...prev.enquiries] }));
  };

  const deleteEnquiry = async (id: string) => {
    await dbService.deleteEnquiry(id);
    setData(prev => ({ ...prev, enquiries: prev.enquiries.filter(e => e.id !== id) }));
  };

  return (
    <DataContext.Provider value={{ 
      data, 
      isLoading,
      addProject, 
      deleteProject, 
      updateLogo, 
      updateHeroImage,
      updatePasscode,
      updateAboutContent,
      addEnquiry,
      deleteEnquiry,
      setupDatabase
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
