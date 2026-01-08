
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconName?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  service: string;
  message: string;
  date: string;
}

export interface SiteData {
  logo: string | null;
  heroImage: string | null;
  passcode: string;
  services: Service[];
  projects: Project[];
  enquiries: Enquiry[];
  aboutContent: {
    heroTitle: string;
    mainText: string;
    secondaryText: string;
  };
}
