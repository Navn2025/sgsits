import {Calendar, ChevronRight, Download, BookOpen, GraduationCap, Microscope, Award, Users, Building, FileText, ArrowRight, FlaskConical, Rocket, Newspaper, Landmark} from 'lucide-react';

export default function Home()
{
  const heroTiles=[
    {
      title: 'Research',
      subtitle: 'Mapping the Innovations',
      icon: FlaskConical,
      dark: false,
    },
    {
      title: 'Startups',
      subtitle: 'Success stories of researchers',
      icon: Rocket,
      dark: true,
    },
    {
      title: 'News',
      subtitle: 'Panorama of Events',
      icon: Newspaper,
      dark: true,
    },
    {
      title: 'SGSITS Outreach',
      subtitle: 'Innovate. Inspire. Transform. Discover',
      icon: Landmark,
      dark: false,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* STICKY HERO — starts in normal flow (below headers) but sticks to top when scrolling down, allowing relative content to scroll over it */}
      <div className="sticky top-0 w-full h-[360px] sm:h-[440px] md:h-[560px] z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'var(--hero-img-url)',
            backgroundPosition: 'center 28%',
            filter: 'brightness(0.98) contrast(1.04) saturate(1.0)',
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{backgroundColor: 'rgba(0, 0, 0, var(--hero-overlay-opacity, 0.45))'}}
        ></div>
        <div className="relative z-10 h-full flex items-center justify-center px-4 text-center">
          <div className="max-w-5xl">
            <p className="text-white/85 uppercase tracking-[0.3em] text-[8px] sm:text-[9px] mb-2 font-semibold">Shri G. S. Institute of Technology and Science</p>
            <h1 className="text-white uppercase font-serif font-semibold text-2xl sm:text-4xl md:text-5xl leading-[1.08] tracking-[0.06em] drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
              Welcome To SGSITS<br />
              <span className="text-accent">Indore</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Tiles strip - transparent, fully overlapping hero so hero image remains visible behind it */}
      <div className="relative z-10 mt-[-48px] sm:mt-[-128px] md:mt-[-150px] pb-0 bg-transparent">
        <div className="relative mx-auto max-w-[1400px] px-4 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 shadow-[0_14px_40px_rgba(0,0,0,0.18)] rounded-t-lg overflow-hidden border border-gray-200/50">
            {heroTiles.map((tile) => {
              const Icon = tile.icon;
              let baseClass = tile.dark
                ? 'bg-primary text-white border-r border-[#1a3857] hover:bg-[#08172c]'
                : 'bg-white text-primary border-r border-gray-100 hover:bg-gray-50';

              if (tile.title === 'News') {
                baseClass = 'bg-primary text-white border-r border-[#1a3857] hover:bg-[#08172c] sm:bg-white sm:text-primary sm:border-gray-100 sm:hover:bg-gray-50';
              }
              if (tile.title === 'SGSITS Outreach') {
                baseClass = 'bg-white text-primary border-r-0 border-gray-100 hover:bg-gray-50 sm:bg-primary sm:text-white sm:border-[#1a3857] sm:hover:bg-[#08172c]';
              }

              return (
                <div
                  key={tile.title}
                  className={`min-h-[118px] sm:h-[128px] md:h-[150px] flex flex-col items-center justify-center text-center px-3 py-4 sm:px-4 transition-all duration-300 hover:z-20 ${baseClass}`}
                >
                  <p className="font-bold uppercase text-[10px] sm:text-sm md:text-base tracking-[0.18em] mb-1 sm:mb-2">{tile.title}</p>
                  <Icon size={28} className="mb-1 sm:mb-2 sm:!w-[36px] sm:!h-[36px]" strokeWidth={2} />
                  <p className="text-[9px] sm:text-[11px] md:text-[13px] leading-snug max-w-[210px] opacity-90 text-balance">{tile.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* COMBINED ABOUT, DIRECTOR, AND NOTIFICATION SECTION */}
      <section className="bg-white py-12 md:py-16 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Side: About & Director (stacked) */}
          <div className="lg:col-span-2 flex flex-col space-y-12">

            {/* About Institute */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-heading tracking-tight uppercase mb-2">ABOUT <span className="font-bold text-primary">SGSITS INDORE</span></h2>
              <div className="w-12 h-[3px] bg-primary mb-6"></div>

              <p className="text-gray-600 leading-relaxed text-[15px] mb-6 text-justify">
                Shri Govindram Seksaria Institute of Technology and Science (SGSITS) is one of the premier technical institutions created to be Centres of Excellence for training, research and development in science, engineering and technology in India. Established as College of Engineering in 1952, the Institute was later declared as an autonomous Institution of National standing. It was then accorded the status of a Government Aided self-reliant Institute with powers to decide its own academic policy, to conduct its own examinations, and to award its own degrees...
              </p>

              <div className="flex space-x-3">
                <button className="px-5 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-[13px]">Read more</button>
                <button className="px-5 py-2 bg-primary text-white hover:opacity-90 transition-opacity text-[13px] font-medium shadow-sm">Newsletter</button>
              </div>
            </div>

            {/* Director's Corner */}
            <div className="bg-white p-6 lg:p-8 border border-gray-100 shadow-sm relative">
              <h2 className="text-2xl md:text-3xl font-light text-heading tracking-tight uppercase mb-2">DIRECTOR'S <span className="font-bold text-primary">CORNER</span></h2>
              <div className="w-12 h-[3px] bg-primary mb-6"></div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-[170px] shrink-0 border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <img src="/assets/image copy.png" alt="Director" className="w-full h-full object-cover grayscale-[20%] opacity-95 object-top" />
                </div>
                <div className="text-[14.5px] leading-relaxed text-gray-600 font-serif">
                  <h3 className="font-bold text-black text-base mb-2 font-sans">Prof. Neetesh Purohit</h3>
                  <p className="mb-4">
                    Prof. Neetesh Purohit has taken over the charge as Director, Shri Govindram Seksaria Institute of Technology and Science (SGSITS Indore) with effect from the forenoon of 15th February, 2024.
                  </p>
                  <button className="px-4 py-1.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-[13px] font-sans">Read more</button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Notification Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 h-full flex flex-col shadow-sm">
              <div className="bg-primary text-white p-4 flex items-center justify-between">
                <h3 className="font-bold text-lg tracking-wide uppercase flex items-center">
                  <Calendar size={18} className="mr-2" /> Notifications
                </h3>
                <span className="bg-accent text-primary text-[10px] uppercase font-bold px-2 py-1 rounded animate-pulse">Live</span>
              </div>

              <div className="p-0 flex-1 overflow-y-auto max-h-[500px]">
                <ul className="divide-y divide-gray-100">
                  {[
                    {title: 'Information Bulletin regarding B.Tech Admissions 2024-25', date: 'New', highlight: true},
                    {title: 'Result of MBA (Financial Administration) II Sem Examination', date: 'May 10, 2024'},
                    {title: 'Revised Academic Calendar for UG & PG classes', date: 'May 08, 2024'},
                    {title: 'Schedule of Internal Assessment Tests (Even Semester)', date: 'May 02, 2024'},
                    {title: 'Instruction for students regarding uniform and general discipline', date: 'Apr 28, 2024'},
                    {title: 'Tender notice for laboratory equipment procurement', date: 'Apr 20, 2024'},
                    {title: 'Notice regarding hostel fee payment deadlines for current students', date: 'Apr 15, 2024'},
                  ].map((item, i) => (
                    <li key={i} className="p-4 hover:bg-gray-50 transition-colors group cursor-pointer border-l-4 border-transparent hover:border-primary">
                      <div className="flex space-x-3">
                        <div className="shrink-0 mt-0.5">
                          <ChevronRight size={16} className="text-accent-blue group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div>
                          <p className="text-gray-800 text-[14px] leading-snug group-hover:text-primary transition-colors font-medium">
                            {item.title}
                          </p>
                          <div className="mt-1.5 flex items-center">
                            {item.highlight? (
                              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">New update</span>
                            ):(
                              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{item.date}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center mt-auto">
                <button className="text-accent-blue text-sm font-semibold hover:underline flex items-center">View All Notifications <ChevronRight size={14} className="ml-1" /></button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CAMPUS NEWS SECTION (Stanford Style) */}
      <section className="bg-[#f5f7fa] py-16 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-heading tracking-tight mb-3">Campus News</h2>
            <p className="text-gray-700 text-lg">Stories about people, research, and innovation across the institute</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 (Row 1, Col 1-2) */}
            <div className="md:col-span-2 relative overflow-hidden group cursor-pointer bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-end min-h-[360px]">
              <img src="https://picsum.photos/seed/sgsitsmain/800/800" alt="Research" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="relative p-6 md:p-8 z-10">
                <span className="text-white/90 text-sm font-bold tracking-wide uppercase mb-2 block">IN THE SPOTLIGHT</span>
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">Why research matters</h3>
              </div>
            </div>

            {/* Card 2 (Row 1, Col 3) */}
            <div className="bg-white group cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col min-h-[360px]">
              <div className="h-48 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/sgsitsai/400/300" alt="AI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <span className="text-red-700 text-xs font-bold tracking-wider uppercase mb-2">ARTIFICIAL INTELLIGENCE</span>
                <h3 className="text-black font-bold text-lg leading-tight">AI's big productivity boost? It's happening from the sofa</h3>
              </div>
            </div>

            {/* Card 3 (Row 1, Col 4) */}
            <div className="bg-white group cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col min-h-[360px]">
              <div className="h-48 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/sgsitshealth/400/300" alt="Health" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <span className="text-red-700 text-xs font-bold tracking-wider uppercase mb-2">HEALTH & MEDICINE</span>
                <h3 className="text-black font-bold text-lg leading-tight">Is "The Pitt" realistic? A Stanford medical expert weighs in</h3>
              </div>
            </div>

            {/* Card 4 (Row 2, Col 1) */}
            <div className="bg-white group cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col min-h-[360px]">
              <div className="h-48 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/sgsitsbiz/400/300" alt="Business" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <span className="text-red-700 text-xs font-bold tracking-wider uppercase mb-2">BUSINESS</span>
                <h3 className="text-black font-bold text-lg leading-tight">How Latino business owners are navigating growth, AI, and inflation</h3>
              </div>
            </div>

            {/* Card 5 (Row 2, Col 2) */}
            <div className="bg-white group cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col min-h-[360px]">
              <div className="h-48 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/sgsitsacad/400/300" alt="Academics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <span className="text-red-700 text-xs font-bold tracking-wider uppercase mb-2">ACADEMICS</span>
                <h3 className="text-black font-bold text-lg leading-tight">In this history class, the final project is a pop song</h3>
              </div>
            </div>

            {/* Card 6 (Row 2, Col 3-4) */}
            <div className="md:col-span-2 relative overflow-hidden group cursor-pointer bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-end min-h-[360px]">
              <img src="https://picsum.photos/seed/sgsitsengg/800/400" alt="Engineering" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative p-6 md:p-8 z-10">
                <span className="text-white/90 text-xs font-bold tracking-wide uppercase mb-2 block">SCIENCE & ENGINEERING</span>
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">Researchers prepare robots for an aging society</h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. ACADEMICS SECTION */}
      <section className="bg-white py-16 border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Academic Programs</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-200 hover:border-primary transition-colors group">
              <div className="w-16 h-16 bg-blue-50 text-primary mx-auto flex items-center justify-center rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Undergraduate</h3>
              <p className="text-gray-600 text-sm mb-6">Offering comprehensive B.Tech and B.Pharm programs across various disciplines with a focus on practical knowledge.</p>
              <a href="#" className="text-accent-blue font-medium text-sm group-hover:underline">Explore UG Programs</a>
            </div>

            <div className="text-center p-8 border border-gray-200 hover:border-primary transition-colors group">
              <div className="w-16 h-16 bg-blue-50 text-primary mx-auto flex items-center justify-center rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Postgraduate</h3>
              <p className="text-gray-600 text-sm mb-6">Advanced M.Tech, M.E., MBA, and MCA programs designed to develop specialized expertise and critical thinking.</p>
              <a href="#" className="text-accent-blue font-medium text-sm group-hover:underline">Explore PG Programs</a>
            </div>

            <div className="text-center p-8 border border-gray-200 hover:border-primary transition-colors group">
              <div className="w-16 h-16 bg-blue-50 text-primary mx-auto flex items-center justify-center rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Microscope size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Research</h3>
              <p className="text-gray-600 text-sm mb-6">Robust Ph.D. programs fostering innovation and original research under the guidance of experienced faculty.</p>
              <a href="#" className="text-accent-blue font-medium text-sm group-hover:underline">Explore Research</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT AND DIRECTOR SECTIONS MOVED UP */}

      {/* 7. DEPARTMENTS */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-2">Departments</h2>
              <p className="text-gray-500">Explore our diverse academic departments</p>
            </div>
            <a href="#" className="text-accent-blue font-medium hover:underline text-sm hidden md:block">
              View All Departments
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              'Computer Engineering', 'Information Technology', 'Civil Engineering',
              'Mechanical Engineering', 'Electrical Engineering', 'Electronics & Instrumentation',
              'Electronics & Telecommunication', 'Industrial & Production', 'Applied Physics',
              'Applied Chemistry', 'Applied Mathematics', 'Pharmacy'
            ].map((dept, idx) => (
              <a key={idx} href="#" className="p-5 border border-gray-200 flex items-center hover:shadow-md hover:border-primary transition-all group bg-gray-50">
                <div className="w-10 h-10 bg-white border border-gray-100 flex items-center justify-center mr-4 shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Building size={18} />
                </div>
                <span className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">
                  {dept}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PLACEMENTS / STATISTICS */}
      <section className="bg-primary text-white py-12 border-t-4 border-accent relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex justify-center mb-4"><Award size={40} className="text-accent" /></div>
              <div className="text-3xl md:text-5xl font-bold mb-2">50 LPA</div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Highest Package</div>
            </div>
            <div>
              <div className="flex justify-center mb-4"><Award size={40} className="text-accent" /></div>
              <div className="text-3xl md:text-5xl font-bold mb-2">12+ LPA</div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Average Package</div>
            </div>
            <div>
              <div className="flex justify-center mb-4"><Building size={40} className="text-accent" /></div>
              <div className="text-3xl md:text-5xl font-bold mb-2">350+</div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Recruiters Visited</div>
            </div>
            <div>
              <div className="flex justify-center mb-4"><Users size={40} className="text-accent" /></div>
              <div className="text-3xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CAMPUS LIFE */}
      <section className="py-16 bg-sgsits-bg relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Campus Life</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience a vibrant campus life that balances rigorous academics with rich extracurricular engagements.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {title: 'Central Library', desc: 'Over 1 Lakh volumes, e-journals, and digital resources spanning two massive floors.', icon: BookOpen, img: 'https://picsum.photos/seed/sgslib/600/400'},
              {title: 'Innovation Labs', desc: 'State-of-the-art laboratories equipped with modern machinery and software for hands-on learning.', icon: Microscope, img: 'https://picsum.photos/seed/sgslab/600/400'},
              {title: 'Sports Complex', desc: 'Extensive facilities for cricket, football, basketball, badminton, and a gymnasium.', icon: Users, img: 'https://picsum.photos/seed/sgssports/600/400'},
              {title: 'Student Clubs', desc: 'Technical, cultural, and literary clubs nurturing talents beyond academics.', icon: Users, img: 'https://picsum.photos/seed/sgsclubs/600/400'},
              {title: 'Hostel Facilities', desc: 'Comfortable accommodation with all essential amenities ensuring a home away from home.', icon: Building, img: 'https://picsum.photos/seed/sgshostel/600/400'},
              {title: 'Auditorium', desc: 'A massive modern auditorium hosting conventions, seminars, and cultural fests.', icon: FileText, img: 'https://picsum.photos/seed/sgsaudi/600/400'}
            ].map((facility, idx) => (
              <div key={idx} className="bg-white group cursor-pointer hover:shadow-lg transition-all">
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img src={facility.img} alt={facility.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="p-6 border border-t-0 border-gray-100">
                  <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
                    <facility.icon size={18} className="mr-2 text-accent-blue" />
                    {facility.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
