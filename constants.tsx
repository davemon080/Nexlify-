
import React from 'react';
import { 
  PencilSquareIcon, 
  CodeBracketIcon, 
  PaintBrushIcon 
} from '@heroicons/react/24/outline';
import { Service, Project } from './types';

export const SERVICES: Service[] = [
  {
    id: 'content',
    title: 'Content Writing',
    description: 'Compelling narratives that convert. We craft SEO-optimized articles, whitepapers, and brand stories that resonate with your audience.',
    icon: <PencilSquareIcon className="w-8 h-8" />
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Future-ready digital experiences. We build high-performance React applications, e-commerce solutions, and custom CMS platforms.',
    icon: <CodeBracketIcon className="w-8 h-8" />
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Visual identities that stand out. From logo design to UI/UX, we create stunning visuals that define your brands personality.',
    icon: <PaintBrushIcon className="w-8 h-8" />
  }
];

export const PORTFOLIO: Project[] = [
  // Fix: IDs must be strings as defined in the Project interface
  { id: '1', title: 'Nebula Fintech App', category: 'Web Development', image: 'https://picsum.photos/seed/nebula/600/400' },
  // Fix: IDs must be strings as defined in the Project interface
  { id: '2', title: 'Ethereal Branding', category: 'Graphic Design', image: 'https://picsum.photos/seed/design/600/400' },
  // Fix: IDs must be strings as defined in the Project interface
  { id: '3', title: 'AI Ethics Journal', category: 'Content Writing', image: 'https://picsum.photos/seed/writing/600/400' },
  // Fix: IDs must be strings as defined in the Project interface
  { id: '4', title: 'Solaris E-commerce', category: 'Web Development', image: 'https://picsum.photos/seed/solar/600/400' },
];
