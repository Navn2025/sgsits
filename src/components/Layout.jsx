import {Search, Accessibility, Menu, X, ChevronDown, MapPin, Phone, Mail, Cloud, ChevronUp} from 'lucide-react';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import Chatbot from './Chatbot';

function TopBar()
{
  return (
    <div className="bg-primary text-white text-xs md:text-sm py-2 px-4 w-full">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex space-x-4 md:space-x-6">
          <a href="#" className="hover:text-accent transition-colors">Students</a>
          <a href="#" className="hover:text-accent transition-colors">Faculty</a>
          <a href="#" className="hover:text-accent transition-colors">Alumni</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex space-x-4 items-center mt-2 sm:mt-0">
          <button className="flex items-center hover:text-accent transition-colors">
            <Search size={14} className="mr-1" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button className="flex items-center hover:text-accent transition-colors">
            <Accessibility size={14} className="mr-1" />
            <span className="hidden sm:inline">A- / A / A+</span>
          </button>
          <Link
            to="/login"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 rounded-full text-white font-semibold text-xs transition-all"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

function LogoBanner({onMobileToggle, mobileOpen})
{
  return (
    <div className="w-full bg-white z-20 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4 sm:space-x-5">
          <div className="w-[75px] sm:w-[90px] h-[75px] sm:h-[90px] shrink-0">
            <img src="/assets/image.png" alt="SGSITS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-primary font-bold text-[19px] sm:text-[22px] lg:text-[26px] leading-[1.1] tracking-tight">
              Shri Govindram Seksaria Institute of <br className="hidden lg:block lg:mb-1" />
              Technology and Science
            </h1>
            <p className="text-gray-600 font-bold text-[10px] sm:text-xs mt-1 uppercase tracking-[0.03em] hidden md:block">
              Govt. Aided Autonomous Institute, Indore (M.P.) - Estd. 1952
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 shrink-0">
          <div className="border border-red-700 px-4 py-1.5 text-red-700 font-bold text-[12px] bg-red-50 hidden xl:block uppercase tracking-wider">
            An Institute of National Standing
          </div>
        </div>
        <button
          className="lg:hidden text-primary p-2 hover:bg-gray-100 rounded transition-colors"
          onClick={onMobileToggle}
        >
          {mobileOpen? <X size={26} strokeWidth={2.5} />:<Menu size={26} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}

function StickyNav({mobileOpen})
{
  const [navVisible, setNavVisible]=useState(true);
  const [lastScrollY, setLastScrollY]=useState(0);
  const [isStuck, setIsStuck]=useState(false);
  const sentinelRef=useRef(null);

  useEffect(() =>
  {
    const handleScroll=() =>
    {
      const currentScrollY=window.scrollY;
      if (currentScrollY>lastScrollY&&currentScrollY>120)
      {
        setNavVisible(false);
      } else if (currentScrollY<lastScrollY)
      {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Detect when nav has become sticky via sentinel
  useEffect(() =>
  {
    const sentinel=sentinelRef.current;
    if (!sentinel) return;
    const observer=new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      {threshold: 0, rootMargin: '0px 0px 0px 0px'}
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const navLinks=[
    {name: 'Academics', hasDropdown: true},
    {name: 'Departments', hasDropdown: true},
    {name: 'Research', hasDropdown: false},
    {name: 'Admissions', hasDropdown: false},
    {name: 'Campus Life', hasDropdown: true},
    {name: 'Placements', hasDropdown: false},
    {name: 'About', hasDropdown: true},
  ];

  return (
    <>
      {/* Sentinel: when this scrolls off-screen, nav is "stuck" */}
      <div ref={sentinelRef} className="h-[1px] w-full" aria-hidden="true" />

      {/* Desktop sticky nav bar — hides on scroll down, reappears on scroll up */}
      <div
        className={`hidden lg:block border-t sticky top-0 left-0 right-0 z-[60] w-full shadow-md transition-all duration-300 ease-in-out ${navVisible? 'translate-y-0':'-translate-y-full'
          }`}
        style={{
          backgroundColor: isStuck
            ? 'var(--nav-bg-sticky)'
            :'var(--nav-bg-default)',
          borderTopColor: isStuck? 'rgba(255,255,255,0.15)':'#e5e7eb',
        }}
      >
        <nav className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-wrap text-[15.5px] font-semibold tracking-wide">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group cursor-pointer">
              <div
                className="flex items-center py-3 pr-8 transition-colors border-b-[3px] border-transparent group-hover:border-accent"
                style={{color: isStuck? 'var(--nav-text-sticky)':'var(--nav-text-default)'}}
              >
                {link.name}
                {link.hasDropdown&&<ChevronDown size={14} className="ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />}
              </div>
              {link.hasDropdown&&(
                <div className="absolute top-[100%] left-0 w-60 bg-white border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  <div className="h-[3px] bg-primary w-full shadow-sm"></div>
                  <ul className="py-2 text-[14px] text-gray-700 font-medium tracking-normal">
                    <li className="px-5 py-2.5 hover:bg-gray-50 hover:text-primary transition-all cursor-pointer border-b border-gray-50 last:border-0 hover:pl-6">Overview</li>
                    <li className="px-5 py-2.5 hover:bg-gray-50 hover:text-primary transition-all cursor-pointer border-b border-gray-50 last:border-0 hover:pl-6">Programs</li>
                    <li className="px-5 py-2.5 hover:bg-gray-50 hover:text-primary transition-all cursor-pointer border-b border-gray-50 last:border-0 hover:pl-6">Faculty Information</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen&&(
        <nav className="lg:hidden bg-white border-t border-gray-100 py-2 text-primary font-medium w-full shadow-xl overflow-y-auto max-h-[70vh]">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-gray-50 last:border-0">
              <div className="flex justify-between items-center px-6 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                {link.name}
                {link.hasDropdown&&<ChevronDown size={18} className="text-gray-400" />}
              </div>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}

function Footer()
{
  return (
    <>
      {/* Weather & Social Bar */}
      <div className="bg-white py-3 lg:px-12 px-4 shadow-sm border-t border-gray-200 border-b">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center text-gray-800 font-bold mb-3 md:mb-0">
            <span className="mr-2">On Campus:</span>
            <Cloud size={24} className="mx-2 text-gray-600" />
            <span>35°C | Scattered clouds</span>
          </div>
          <div className="flex space-x-5 text-gray-600">
            <a href="#" className="hover:opacity-70 text-blue-700 transition-opacity"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            <a href="#" className="hover:opacity-70 text-blue-800 transition-opacity"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
            <a href="#" className="hover:opacity-70 text-sky-500 transition-opacity"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>
            <a href="#" className="hover:opacity-70 text-pink-600 transition-opacity"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
            <a href="#" className="hover:opacity-70 text-red-600 transition-opacity"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg></a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <footer className="bg-primary text-gray-200 pt-8 pb-6 relative font-sans border-t-4 border-accent">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12">

          {/* Section 1: Top Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold pb-5 border-b border-white/10 text-sm">
            <a href="#" className="hover:text-white transition-colors">Students</a>
            <a href="#" className="hover:text-white transition-colors">Faculty & Staff</a>
            <a href="#" className="hover:text-white transition-colors">Alumni</a>
            <a href="#" className="hover:text-white transition-colors">Industry</a>
            <a href="#" className="hover:text-white transition-colors">Directory</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Section 2: Categories */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold py-5 border-b border-white/10 text-sm">
            {['Academics', 'Research', 'Innovation', 'Research Park', 'Happenings', 'Recognitions', 'Campus Life', 'Careers', 'The Institute'].map(item => (
              <a href="#" key={item} className="flex items-center hover:text-white transition-colors">
                {item} <ChevronDown size={14} className="ml-1 opacity-60" />
              </a>
            ))}
          </div>

          {/* Section 3: Departments */}
          <div className="py-8 border-b border-white/10">
            <h3 className="font-bold text-white text-lg mb-6 tracking-wide">Departments</h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-y-5 gap-x-6 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors truncate">Aerospace Engineering</a>
              <a href="#" className="hover:text-white transition-colors truncate">Applied Mechanics</a>
              <a href="#" className="hover:text-white transition-colors truncate">Biotechnology</a>
              <a href="#" className="hover:text-white transition-colors truncate">Chemical Engineering</a>
              <a href="#" className="hover:text-white transition-colors truncate">Chemistry</a>
              <a href="#" className="hover:text-white transition-colors truncate">Civil Engineering</a>
              <a href="#" className="hover:text-white transition-colors">Computer Science and<br />Engineering</a>
              <a href="#" className="hover:text-white transition-colors">Data Science & Artificial<br />Intelligence</a>
              <a href="#" className="hover:text-white transition-colors truncate">Electrical Engineering</a>
              <a href="#" className="hover:text-white transition-colors truncate">Engineering Design</a>
              <a href="#" className="hover:text-white transition-colors">Humanities and Social<br />Sciences</a>
              <a href="#" className="hover:text-white transition-colors truncate">Management Studies</a>
              <a href="#" className="hover:text-white transition-colors truncate">Mechanical Engineering</a>
              <a href="#" className="hover:text-white transition-colors">Medical Science and<br />Technology</a>
              <a href="#" className="hover:text-white transition-colors">Metallurgical and Materials<br />Engineering</a>
              <a href="#" className="hover:text-white transition-colors truncate">Mathematics</a>
              <a href="#" className="hover:text-white transition-colors truncate">Ocean Engineering</a>
              <a href="#" className="hover:text-white transition-colors truncate">Physics</a>
            </div>
          </div>

          {/* Section 4: Policies / Reports */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-bold text-white py-6 border-b border-white/10 text-sm">
            <a href="#" className="hover:text-gray-300 transition-colors">Annual Reports</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Annual Accounts</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Annual Budget</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Act and Statutes</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Quality Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">ISO 9001:2015</a>
          </div>

          {/* Section 5: Brand Identity */}
          <div className="py-6 border-b border-white/10 flex items-center">
            <div className="w-[60px] h-[60px] bg-white rounded-full p-1.5 shrink-0 mr-4 flex items-center justify-center">
              <img src="/assets/image.png" alt="SGSITS Logo" className="w-full h-full object-contain" />
            </div>
            <div className="font-sans">
              <h2 className="text-white font-bold text-lg leading-tight">
                श्री गोविंदराम सेकसरिया प्रौद्योगिकी एवं विज्ञान संस्थान
              </h2>
              <p className="text-white font-medium text-xs mt-0.5 tracking-wide">
                Shri Govindram Seksaria Institute of Technology & Science
              </p>
            </div>
          </div>

          {/* Section 6: Base Footer */}
          <div className="pt-6 pb-2 flex flex-col md:flex-row justify-between items-start text-xs text-[#a49a9a] space-y-4 md:space-y-0 relative">
            <div>
              <div className="space-x-2 mb-1.5">
                <a href="#" className="hover:text-white transition-colors">Accessibility</a> |
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> |
                <a href="#" className="hover:text-white transition-colors">Term of Use</a> |
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
              <p>© {new Date().getFullYear()} SGSITS - All rights reserved</p>
            </div>
            <div className="text-left md:text-right">
              <p className="mb-0">Powered by<br className="hidden md:block" /> <span className="text-white font-medium">SGSITS Developers</span></p>
              <p className="mt-1">Website last updated on: 2026-04-10 20:00:02 PM</p>
            </div>
          </div>

          {/* Back to top button */}
          <button className="absolute bottom-6 right-6 lg:right-12 w-10 h-10 bg-accent text-primary rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.3)]" aria-label="Back to top">
            <ChevronUp size={22} strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </>
  );
}

function ThemeSwitcher()
{
  const [isOpen, setIsOpen]=useState(false);
  const [customColor, setCustomColor]=useState('#0B1F3A');
  const [accentColor, setAccentColor]=useState('#D4AF37');
  const [headingColor, setHeadingColor]=useState('#1f2937');
  const [heroImgUrl, setHeroImgUrl]=useState('/assets/media__1776272596244.png');
  const [navBgDefault, setNavBgDefault]=useState('#ffffff');
  const [navBgSticky, setNavBgSticky]=useState('#0B1F3A');
  const [navTextDefault, setNavTextDefault]=useState('#1f2937');
  const [navTextSticky, setNavTextSticky]=useState('#ffffff');

  const updateCssVar=(name, value) =>
  {
    document.documentElement.style.setProperty(name, value);
  };

  const handlePrimaryChange=(e) =>
  {
    setCustomColor(e.target.value);
    updateCssVar('--color-primary', e.target.value);
  };

  const handleAccentChange=(e) =>
  {
    setAccentColor(e.target.value);
    updateCssVar('--color-accent', e.target.value);
  };

  const handleHeadingChange=(e) =>
  {
    setHeadingColor(e.target.value);
    updateCssVar('--color-heading', e.target.value);
  };

  const handleHeroImgChange=(e) =>
  {
    setHeroImgUrl(e.target.value);
    updateCssVar('--hero-img-url', `url('${e.target.value}')`);
  };

  return (
    <div className="fixed bottom-[108px] right-0 z-[100] flex items-end">
      {isOpen&&(
        <div className="bg-white border border-gray-200 shadow-2xl p-5 flex flex-col space-y-4 rounded-l-lg rounded-tr-none w-72 transition-all max-h-[80vh] overflow-y-auto hidden-scrollbar">
          <div className="border-b pb-2">
            <h4 className="font-bold text-gray-800 text-sm">Advanced Theme Settings</h4>
            <span className="text-[10px] text-gray-500 leading-tight block mt-1">Deeply customize colors and hero imagery to rebrand the website instantly.</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="color" value={customColor} onChange={handlePrimaryChange} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" title="Primary Color" />
              <div className="flex-1 text-xs">
                <label className="font-semibold text-gray-700 block">Overall Primary Color</label>
                <span className="text-gray-500 font-mono text-[10px]">{customColor.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input type="color" value={accentColor} onChange={handleAccentChange} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" title="Accent Color" />
              <div className="flex-1 text-xs">
                <label className="font-semibold text-gray-700 block">Internal Accent (Deep)</label>
                <span className="text-gray-500 font-mono text-[10px]">{accentColor.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input type="color" value={headingColor} onChange={handleHeadingChange} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" title="Heading Color" />
              <div className="flex-1 text-xs">
                <label className="font-semibold text-gray-700 block">Main Heading Overrides</label>
                <span className="text-gray-500 font-mono text-[10px]">{headingColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Nav Bar Colors */}
          <div className="border-t border-gray-100 pt-3 space-y-3">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Nav Bar Colors</p>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2.5">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Default (inline with page)</p>
              <div className="flex items-center space-x-3">
                <input type="color" value={navBgDefault} onChange={(e) => {setNavBgDefault(e.target.value); updateCssVar('--nav-bg-default', e.target.value);}} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" />
                <div className="flex-1 text-xs">
                  <label className="font-semibold text-gray-700 block">Background</label>
                  <span className="text-gray-500 font-mono text-[10px]">{navBgDefault.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input type="color" value={navTextDefault} onChange={(e) => {setNavTextDefault(e.target.value); updateCssVar('--nav-text-default', e.target.value);}} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" />
                <div className="flex-1 text-xs">
                  <label className="font-semibold text-gray-700 block">Text Color</label>
                  <span className="text-gray-500 font-mono text-[10px]">{navTextDefault.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2.5">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Sticky (locked to viewport top)</p>
              <div className="flex items-center space-x-3">
                <input type="color" value={navBgSticky} onChange={(e) => {setNavBgSticky(e.target.value); updateCssVar('--nav-bg-sticky', e.target.value);}} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" />
                <div className="flex-1 text-xs">
                  <label className="font-semibold text-gray-700 block">Background</label>
                  <span className="text-gray-500 font-mono text-[10px]">{navBgSticky.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input type="color" value={navTextSticky} onChange={(e) => {setNavTextSticky(e.target.value); updateCssVar('--nav-text-sticky', e.target.value);}} className="w-8 h-8 border-0 p-0 rounded cursor-pointer shadow-sm shrink-0" />
                <div className="flex-1 text-xs">
                  <label className="font-semibold text-gray-700 block">Text Color</label>
                  <span className="text-gray-500 font-mono text-[10px]">{navTextSticky.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Hero Image Overwrite (URL)</label>
            <input type="text" value={heroImgUrl} onChange={handleHeroImgChange} placeholder="https://..." className="w-full text-xs p-2.5 border border-gray-300 rounded focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" />
          </div>

          <button
            onClick={() =>
            {
              setCustomColor('#0B1F3A'); updateCssVar('--color-primary', '#0B1F3A');
              setAccentColor('#D4AF37'); updateCssVar('--color-accent', '#D4AF37');
              setHeadingColor('#1f2937'); updateCssVar('--color-heading', '#1f2937');
              setHeroImgUrl('/assets/media__1776272596244.png'); updateCssVar('--hero-img-url', "url('/assets/media__1776272596244.png')");
              setNavBgDefault('#ffffff'); updateCssVar('--nav-bg-default', '#ffffff');
              setNavBgSticky('#0B1F3A'); updateCssVar('--nav-bg-sticky', '#0B1F3A');
              setNavTextDefault('#1f2937'); updateCssVar('--nav-text-default', '#1f2937');
              setNavTextSticky('#ffffff'); updateCssVar('--nav-text-sticky', '#ffffff');
            }}
            className="text-[11px] font-bold text-red-600 hover:underline self-start mt-2"
          >
            Reset All Customizations
          </button>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-white border border-gray-200 border-r-0 shadow-[-4px_0_15px_rgba(0,0,0,0.1)] p-3 rounded-l-lg text-primary hover:bg-gray-50 transition-all h-fit my-auto flex items-center justify-center focus:outline-none" title="Theme Settings">
        <span className="sr-only">Theme Settings</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
      </button>
    </div>
  );
}

export function DesktopLayout({children})
{
  const [mobileOpen, setMobileOpen]=useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-sgsits-bg">
      <TopBar />
      <LogoBanner onMobileToggle={() => setMobileOpen(o => !o)} mobileOpen={mobileOpen} />
      <StickyNav mobileOpen={mobileOpen} />
      {/* Announcements Marquee */}
      <div className="w-full bg-[#1a1a1a] text-gray-300 flex items-center shadow-inner border-t border-gray-800">
        <div className="bg-black text-white px-4 lg:px-8 py-2 font-bold text-[11px] sm:text-[13px] uppercase tracking-wider shrink-0 flex items-center sm:relative absolute z-10 left-0 h-full border-r border-[#333]">
          Announcements
        </div>
        <div className="flex-1 overflow-hidden sm:ml-0 ml-[135px] py-2 flex items-center">
          <marquee scrollamount="5" className="text-[13px] sm:text-[14px] font-medium leading-none m-0 pt-[1px] w-full block">
            <span className="mr-8">Institute Day 2025 - Live Streaming</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="mr-8">Rolling Advertisement No SGSITS/R/3/2025 visit https://sgsits.ac.in for applications</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="mr-8">Semester Exams Rescheduled to 30th April</span>
          </marquee>
        </div>
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
      <ThemeSwitcher />
      <Chatbot />
    </div>
  );
}
