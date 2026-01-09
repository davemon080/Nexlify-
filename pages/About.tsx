
import React from 'react';
import { 
  HeartIcon, 
  LightBulbIcon, 
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { data } = useData();
  const { aboutContent } = data;

  const values = [
    {
      title: 'Human-First Design',
      desc: 'We prioritize the end-user experience in every line of code and every visual asset.',
      icon: <HeartIcon className="w-6 h-6" />
    },
    {
      title: 'Technical Mastery',
      desc: 'Using only the most modern and efficient frameworks to ensure future-proof results.',
      icon: <LightBulbIcon className="w-6 h-6" />
    },
    {
      title: 'Deep Partnership',
      desc: 'We act as an extension of your team, not just another outside vendor.',
      icon: <UserGroupIcon className="w-6 h-6" />
    },
    {
      title: 'Integrity & Clarity',
      desc: 'Clear communication and honest timelines are the foundation of our work.',
      icon: <ShieldCheckIcon className="w-6 h-6" />
    }
  ];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>The Founder's Journey</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            {aboutContent.heroTitle}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed reveal">
            <p className="font-medium text-slate-900 dark:text-white">
              {aboutContent.mainText}
            </p>
            <div className="p-8 glass rounded-[2rem] border-l-4 border-l-primary border-white/10 italic">
              "{aboutContent.secondaryText}"
            </div>
          </div>
          <div className="space-y-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
             <p>
              I founded my digital company with nothing but a laptop, an internet connection, and a strong belief that ideas deserve to be seen, heard, and experienced properly.
            </p>
            <p>
              What began as late nights learning and experimenting has grown into a purpose-driven digital brand focused on helping businesses communicate clearly.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                <RocketLaunchIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Still building. Still curious.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mt-32 max-w-7xl mx-auto reveal">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Core Philosophy</h2>
          <p className="text-slate-500 dark:text-slate-400">The pillars that define how we work at Nexlify.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((v, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{v.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
