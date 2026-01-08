
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { data } = useData();

  return (
    <div className="space-y-12 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-24 lg:pb-40 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
        
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8 md:mb-10 group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary via-accent to-primary-light rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 glass shadow-2xl">
              <img 
                src={data.heroImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                alt="Founder of Nexlify" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-primary px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl border border-white/20 shadow-lg hidden xs:block">
              <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Lead Strategist</p>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-slate-200 dark:border-white/10 text-primary-light text-xs font-semibold mb-6 md:mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light"></span>
            </span>
            <span>Available for Hire</span>
          </div>

          <h1 className="text-3xl md:text-6xl lg:text-8xl font-display font-bold text-slate-900 dark:text-white leading-tight mb-6 md:mb-8 tracking-tight max-w-4xl px-2">
            Designing <span className="text-gradient">Experiences</span> that define brands.
          </h1>
          
          <p className="max-w-2xl px-4 text-sm md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 md:mb-12 font-light">
            I'm the creative lead at Nexlify. I bridge the gap between high-end web development, bespoke design, and strategic storytelling to build your digital legacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full px-6 sm:px-0">
            <Link 
              to="/inquiry" 
              className="w-full sm:w-auto group px-8 md:px-10 py-4 md:py-5 bg-primary hover:bg-primary-light text-white rounded-full text-base md:text-lg font-bold transition-all shadow-2xl shadow-primary/30 flex items-center justify-center"
            >
              Hire Us
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white rounded-full text-base md:text-lg font-semibold transition-all text-center">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="reveal px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-16">
          <div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
              Full-Spectrum <br className="hidden md:block" />
              Digital Excellence<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg">
              We specialize in bringing complex ideas to life through a blend of technical mastery and artistic vision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 md:p-6 glass rounded-2xl border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 md:mb-2 text-base">Modern Code</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Scalable, secure, and blazing fast applications.</p>
            </div>
            <div className="p-5 md:p-6 glass rounded-2xl border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 md:mb-2 text-base">Iconic Design</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Visuals that define and dominate your market.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {data.services.map((service) => (
            <div 
              key={service.id} 
              className="group p-6 md:p-10 glass rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 md:mb-4">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                {service.description}
              </p>
              <Link to="/inquiry" className="text-primary-light font-semibold flex items-center group-hover:underline text-sm">
                Get a Quote <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Grid - COMPLETELY HIDDEN IF EMPTY */}
      {data.projects.length > 0 && (
        <section className="reveal px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mb-3 md:mb-4">Case Studies</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Selected work from across the digital landscape.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {data.projects.map((project) => (
              <div key={project.id} className="group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer aspect-video md:aspect-[16/10]">
                <img 
                  src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-5 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-primary-light text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2 block">{project.category}</span>
                  <h3 className="text-lg md:text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="reveal px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-12">
        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-[1.5rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10"></div>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6 md:mb-8">Ready to grow?</h2>
          <p className="text-sm md:text-lg lg:text-xl text-slate-700 dark:text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with Nexlify to transform your digital presence. Let's discuss how we can help you achieve your goals.
          </p>
          <Link 
            to="/inquiry" 
            className="inline-flex items-center px-6 md:px-10 py-3 md:py-5 bg-primary text-white hover:bg-primary-light rounded-full text-base md:text-lg font-bold transition-all shadow-xl"
          >
            Work With Nexlify
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
