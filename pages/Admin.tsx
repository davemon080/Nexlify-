
import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  PlusIcon, 
  TrashIcon, 
  Squares2X2Icon,
  XMarkIcon,
  PhotoIcon,
  EnvelopeOpenIcon,
  DevicePhoneMobileIcon,
  UserIcon,
  AtSymbolIcon,
  CalendarIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
  const { data, addProject, deleteProject, updateLogo, updateHeroImage, deleteEnquiry, updatePasscode } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const [activeTab, setActiveTab] = useState<'portfolio' | 'enquiries' | 'settings'>('portfolio');
  const [isAdding, setIsAdding] = useState(false);
  const [newProj, setNewProj] = useState({ title: '', category: '', image: '' });
  
  const [oldPasscodeConfirm, setOldPasscodeConfirm] = useState('');
  const [newPasscodeInput, setNewPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput === data.passcode) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title || !newProj.category) return;
    addProject(newProj);
    setNewProj({ title: '', category: '', image: '' });
    setIsAdding(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateHeroImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasscodeChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');

    if (oldPasscodeConfirm !== data.passcode) {
      setPasscodeError('Old passcode is incorrect.');
      return;
    }
    if (newPasscodeInput.length < 4) {
      setPasscodeError('New passcode must be at least 4 characters.');
      return;
    }

    updatePasscode(newPasscodeInput);
    setOldPasscodeConfirm('');
    setNewPasscodeInput('');
    alert('Passcode updated successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <LockClosedIcon className="w-8 h-8 text-primary-light" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Admin Login</h2>
          <p className="text-slate-500 mb-8">Enter your secure passcode to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type={showPasscode ? "text" : "password"}
                placeholder="••••"
                className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} p-4 rounded-2xl text-center text-2xl tracking-[1em] text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                value={loginInput}
                onChange={e => setLoginInput(e.target.value)}
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPasscode ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {loginError && <p className="text-red-500 text-sm font-semibold">Incorrect passcode. Try again.</p>}
            <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1 md:mt-2 text-sm md:text-base">Command center for Nexlify content and leads.</p>
        </div>
        <div className="flex flex-wrap gap-2">
           <button 
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'portfolio' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}
          >
            Portfolio
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'enquiries' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}
          >
            Enquiries ({data.enquiries.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}
          >
            Settings
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {activeTab === 'settings' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Logo Upload */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <PhotoIcon className="w-6 h-6 mr-3 text-primary-light" />
              Brand Logo
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-slate-100 dark:bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                {data.logo ? (
                  <img src={data.logo} className="w-full h-full object-contain p-4" alt="Site Logo" />
                ) : (
                  <PhotoIcon className="w-12 h-12 text-slate-500" />
                )}
              </div>
              <div className="space-y-4">
                <p className="text-slate-400 text-sm max-w-sm">Upload a PNG or SVG version of your logo. This will appear in the navigation bar and footer.</p>
                <input type="file" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                <div className="flex gap-4">
                  <button onClick={() => logoInputRef.current?.click()} className="px-6 py-2 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-all">Upload Logo</button>
                  {data.logo && <button onClick={() => updateLogo(null)} className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl font-bold transition-all">Remove</button>}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Upload */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <IdentificationIcon className="w-6 h-6 mr-3 text-primary-light" />
              Landing Page Picture
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-100 dark:bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                {data.heroImage ? (
                  <img src={data.heroImage} className="w-full h-full object-cover" alt="Hero" />
                ) : (
                  <IdentificationIcon className="w-12 h-12 text-slate-500" />
                )}
              </div>
              <div className="space-y-4">
                <p className="text-slate-400 text-sm max-w-sm">Update the main picture displayed on your landing page. Recommended: Square aspect ratio.</p>
                <input type="file" ref={heroInputRef} onChange={handleHeroUpload} accept="image/*" className="hidden" />
                <div className="flex gap-4">
                  <button onClick={() => heroInputRef.current?.click()} className="px-6 py-2 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-all">Update Picture</button>
                  {data.heroImage && <button onClick={() => updateHeroImage(null)} className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl font-bold transition-all">Reset to Default</button>}
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <ShieldCheckIcon className="w-6 h-6 mr-3 text-primary-light" />
              Security Settings
            </h2>
            <div className="max-w-md">
              <p className="text-slate-400 text-sm mb-6">Update your admin access passcode. You must confirm your current passcode to make changes.</p>
              <form onSubmit={handlePasscodeChange} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Passcode</label>
                  <input 
                    type="password" 
                    placeholder="Enter current passcode" 
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={oldPasscodeConfirm}
                    onChange={e => setOldPasscodeConfirm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Passcode</label>
                  <input 
                    type="text" 
                    placeholder="Enter new passcode" 
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={newPasscodeInput}
                    onChange={e => setNewPasscodeInput(e.target.value)}
                  />
                </div>
                {passcodeError && <p className="text-red-500 text-sm font-semibold">{passcodeError}</p>}
                <button 
                  type="submit"
                  disabled={!oldPasscodeConfirm || newPasscodeInput.length < 4}
                  className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  Update Passcode
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <EnvelopeOpenIcon className="w-6 h-6 mr-3 text-primary-light" />
            Client Inquiries
          </h2>
          
          {data.enquiries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.enquiries.map((enq) => (
                <div key={enq.id} className="glass p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all flex flex-col relative group">
                  <button 
                    onClick={() => deleteEnquiry(enq.id)}
                    className="absolute top-4 right-4 p-2 text-red-500 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{enq.name}</h4>
                      <p className="text-xs text-primary-light font-bold uppercase tracking-wider">{enq.service}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-500">
                      <AtSymbolIcon className="w-4 h-4 mr-2" />
                      {enq.email}
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <DevicePhoneMobileIcon className="w-4 h-4 mr-2" />
                      {enq.mobile}
                    </div>
                    <div className="flex items-center text-sm text-slate-400">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {enq.date}
                    </div>
                  </div>

                  <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl flex-grow">
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{enq.message}"</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl border border-white/5">
              <EnvelopeOpenIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 italic">Your inbox is currently empty. Great things take time!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <Squares2X2Icon className="w-6 h-6 mr-2 text-primary-light" />
              Live Projects ({data.projects.length})
            </h2>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center"
            >
              {isAdding ? <XMarkIcon className="w-4 h-4 mr-2" /> : <PlusIcon className="w-4 h-4 mr-2" />}
              {isAdding ? 'Cancel' : 'New Project'}
            </button>
          </div>

          {isAdding && (
            <div className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-primary/30">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Project Details</h2>
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Title</label>
                  <input required type="text" placeholder="e.g. Nebula App" className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 p-3 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
                  <input required type="text" placeholder="e.g. Web Design" className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 p-3 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" value={newProj.category} onChange={e => setNewProj({...newProj, category: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Image URL</label>
                  <input required type="text" placeholder="Link to image" className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 p-3 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" value={newProj.image} onChange={e => setNewProj({...newProj, image: e.target.value})} />
                </div>
                <button type="submit" className="md:col-span-3 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all shadow-xl shadow-primary/20">Publish Project</button>
              </form>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.projects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4"><img src={project.image} className="w-12 h-12 rounded-lg object-cover bg-slate-800" alt="" /></td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{project.title}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{project.category}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteProject(project.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><TrashIcon className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-white/10">
              {data.projects.map((project) => (
                <div key={project.id} className="p-4 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <img src={project.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{project.title}</h4>
                      <p className="text-xs text-slate-500">{project.category}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteProject(project.id)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-all"><TrashIcon className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
