import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, MapPin, Phone, Mail, Instagram, Linkedin } from 'lucide-react';

const MaisonDelvaux = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBlogContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Generate 3 luxury blog post titles and excerpts. Format as JSON: title, excerpt (2 sent), date, category. Return ONLY valid JSON.`
          }]
        })
      });
      const data = await response.json();
      const content = data.content[0].text;
      const cleanJson = content.replace(/```json|```/g, '').trim();
      setBlogPosts(JSON.parse(cleanJson));
    } catch (error) {
      setBlogPosts([
        { title: 'Private Yacht Escapes in the French Riviera', excerpt: 'Discover our curated selection of superyacht charters with bespoke itineraries. From Antibes to Saint-Tropez, we secure exclusive access to the Mediterranean\'s most coveted destinations.', date: 'April 2025', category: 'Travel' },
        { title: 'The Art of Michelin Star Dining', excerpt: 'How we orchestrate dining experiences at the world\'s most exclusive restaurants. Our concierge secures tables months in advance at establishments with decades-long waiting lists.', date: 'March 2025', category: 'Dining' },
        { title: 'Bespoke Luxury: The Philosophy of Service', excerpt: 'The cornerstone of exceptional concierge work. We reveal how anticipating needs before they\'re articulated defines true luxury service excellence.', date: 'February 2025', category: 'Lifestyle' }
      ]);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `List 6 luxury concierge services. Format as JSON array: {name, description, locations}. Return ONLY valid JSON.`
          }]
        })
      });
      const data = await response.json();
      const content = data.content[0].text;
      const cleanJson = content.replace(/```json|```/g, '').trim();
      setServices(JSON.parse(cleanJson));
    } catch (error) {
      setServices([
        { name: 'Luxury Hotel Reservations', description: 'Exclusive access to the world\'s most prestigious properties with VIP amenities, room upgrades, and bespoke welcome experiences.', locations: ['Dubai', 'Monaco', 'London', 'Tokyo', 'Miami', 'Paris', 'Hong Kong', 'Barcelona'] },
        { name: 'Michelin Dining Experience', description: 'Reservations at three-star establishments and invitation-only restaurants. We secure tables months in advance at establishments where reservations are typically impossible.', locations: ['Paris', 'Tokyo', 'New York', 'London', 'Barcelona', 'Singapore', 'Los Angeles', 'Geneva'] },
        { name: 'Superyacht & Yacht Charters', description: 'Access to the world\'s finest superyachts with crew, provisioning, and custom itineraries across all continents and exclusive anchorages.', locations: ['Mediterranean', 'Caribbean', 'Southeast Asia', 'Pacific', 'Norwegian Fjords', 'Adriatic', 'Aegean', 'Indian Ocean'] },
        { name: 'Private Jet & Aviation', description: 'Seamless coordination of charter flights, private terminals, and ground transportation. Empty leg deals and subscription services for frequent flyers.', locations: ['Global Network', 'USA', 'Europe', 'Asia', 'Middle East', 'Africa', 'South America', 'Oceania'] },
        { name: 'Haute Couture & Shopping', description: 'Personal shopping services, early collection previews, private showings, and direct relationships with luxury ateliers and exclusive boutiques worldwide.', locations: ['Paris', 'Milan', 'London', 'New York', 'Tokyo', 'Hong Kong', 'Dubai', 'Los Angeles'] },
        { name: 'Wellness & Retreats', description: 'Bespoke wellness experiences including private spa consultations, meditation retreats, and health optimization programs at elite destinations.', locations: ['Bali', 'Switzerland', 'Costa Rica', 'Maldives', 'Thailand', 'Seychelles', 'Mauritius', 'Morocco'] }
      ]);
    }
  };

  useEffect(() => {
    if (currentPage === 'blog') fetchBlogContent();
    if (currentPage === 'services') fetchServices();
  }, [currentPage]);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Insights', id: 'blog' },
    { name: 'Contact', id: 'contact' }
  ];

  // ===== HOME PAGE =====
  const HomePage = () => (
    <div>
      {/* Hero with Video */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.28) contrast(1.15)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <source src="https://videos.pexels.com/video-files/3044652/3044652-hd_1920_1080_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/2873333/2873333-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3046923/3046923-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mb-12" />
          </div>
          
          <h1 className="font-display text-8xl md:text-9xl text-stone-50 mb-2 font-light tracking-tighter leading-none">
            Maison
          </h1>
          <h1 className="font-display text-7xl md:text-8xl text-stone-300 mb-12 font-light tracking-tighter">
            DELVAUX
          </h1>
          
          <p className="text-sm md:text-base text-stone-300 font-light mb-6 tracking-widest uppercase">
            Concierge Excellence
          </p>
          <p className="text-2xl md:text-3xl text-stone-200 font-light mb-16 tracking-wide max-w-3xl mx-auto leading-relaxed">
            Where Discerning Tastes Meet Impeccable Execution
          </p>
          
          <button
            onClick={() => {
              setCurrentPage('contact');
              setMobileMenuOpen(false);
            }}
            className="inline-block px-12 py-4 bg-amber-700 hover:bg-amber-800 text-stone-50 font-light tracking-widest uppercase text-sm transition-all duration-500 shadow-xl"
          >
            Begin
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent" />

      {/* Philosophy */}
      <section className="py-40 px-4 bg-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700/5 rounded-full -mr-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="mb-10">
                <div className="w-16 h-0.5 bg-amber-700 mb-8" />
                <span className="text-amber-700 text-xs font-light tracking-widest uppercase">Philosophy</span>
              </div>
              
              <h2 className="font-display text-7xl md:text-8xl text-stone-900 mb-10 font-light tracking-tight leading-tight">
                Refined <span className="text-amber-700">Elegance</span>
              </h2>
              
              <p className="text-stone-800 text-lg leading-relaxed mb-8 font-light">
                Maison Delvaux represents a tradition of impeccable service refined through decades of excellence. We orchestrate the finest experiences with understated sophistication and absolute discretion.
              </p>
              
              <p className="text-stone-700 text-base leading-relaxed font-light mb-12">
                From Monaco to Tokyo, from Dubai to London, we maintain unparalleled relationships with the world's most exclusive establishments. Your wishes become reality with seamless grace.
              </p>

              <div className="grid grid-cols-3 gap-10 py-12 border-t border-b border-stone-300">
                <div>
                  <p className="text-4xl font-light text-amber-700 mb-2">24/7</p>
                  <p className="text-xs text-stone-600 font-light tracking-widest">GLOBAL</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-amber-700 mb-2">6</p>
                  <p className="text-xs text-stone-600 font-light tracking-widest">CONTINENTS</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-amber-700 mb-2">∞</p>
                  <p className="text-xs text-stone-600 font-light tracking-widest">POSSIBILITIES</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-full md:min-h-screen overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512453475868-bada1adc6f21?w=800&h=1200&fit=crop&q=90"
                alt="Luxury penthouse"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateY(${scrollY * 0.3}px)`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent" />

      {/* Our Services */}
      <section className="py-40 px-4 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="w-16 h-0.5 bg-amber-700 mx-auto mb-8" />
            <h2 className="font-display text-7xl md:text-8xl text-stone-900 mb-8 font-light tracking-tight">
              Our Services
            </h2>
            <p className="text-xl text-stone-700 font-light max-w-3xl mx-auto">
              Exceptional offerings refined to the highest standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Luxury Hotels', desc: 'Access to the world\'s most prestigious properties', icon: '🏨' },
              { title: 'Fine Dining', desc: 'Tables at the most exclusive establishments', icon: '🍽️' },
              { title: 'Private Aviation', desc: 'Seamless charter services worldwide', icon: '✈️' },
              { title: 'Superyacht Charters', desc: 'Command of the finest maritime vessels', icon: '🛥️' },
              { title: 'Haute Couture', desc: 'Direct access to luxury collections', icon: '👗' },
              { title: 'Wellness Retreats', desc: 'Bespoke rejuvenation programs', icon: '🧘' }
            ].map((service, idx) => (
              <div 
                key={idx}
                className="group relative p-12 border border-stone-300 hover:border-amber-700 transition-all duration-500 bg-stone-100/50 hover:bg-white cursor-pointer overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
                  <h3 className="font-display text-3xl text-stone-900 mb-4 font-light group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-stone-700 font-light text-base leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent" />

      {/* Global Presence */}
      <section className="py-40 px-4 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="w-16 h-0.5 bg-amber-700 mx-auto mb-8" />
            <h2 className="font-display text-7xl md:text-8xl text-stone-900 mb-6 font-light tracking-tight">
              Global Presence
            </h2>
            <p className="text-xl text-stone-700 font-light">Service across six continents</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['Dubai', 'Monaco', 'London', 'Tokyo', 'Miami', 'Paris', 'Hong Kong', 'Barcelona', 'New York', 'Maldives'].map((city, idx) => (
              <div 
                key={idx}
                className="relative p-8 border border-stone-300 hover:border-amber-700 transition-all duration-300 overflow-hidden group h-40 flex items-center justify-center"
              >
                <img 
                  src={[
                    'https://images.unsplash.com/photo-1518684192647-7a0ee3d2714f?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1540959375944-7049f642e9c1?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1470679324425-cc1491e175c7?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=600&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop&q=80'
                  ][idx]}
                  alt={city}
                  className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50/40" />
                <p className="relative z-10 text-stone-700 font-light tracking-widest uppercase text-sm font-semibold text-center">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent" />

      {/* CTA */}
      <section className="py-40 px-4 bg-gradient-to-br from-stone-900 via-stone-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-16 h-0.5 bg-amber-700 mx-auto mb-10" />
          <h2 className="font-display text-7xl md:text-8xl text-stone-50 mb-8 font-light tracking-tight">
            Your Desires,<br /><span className="text-amber-700">Our Reality</span>
          </h2>
          <p className="text-xl text-stone-300 mb-14 font-light leading-relaxed">
            Every experience curated with precision and grace
          </p>
          <button
            onClick={() => {
              setCurrentPage('contact');
              setMobileMenuOpen(false);
            }}
            className="inline-block px-14 py-5 bg-amber-700 hover:bg-amber-800 text-stone-50 font-light tracking-widest uppercase text-sm transition-all duration-500 shadow-xl"
          >
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );

  // ===== SERVICES PAGE =====
  const ServicesPage = () => (
    <div>
      <div className="pt-40 pb-24 px-4 bg-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700/5 rounded-full -mr-48 -mt-48" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="w-16 h-0.5 bg-amber-700 mb-8" />
          <h1 className="font-display text-8xl md:text-9xl text-stone-900 mb-6 font-light tracking-tight">
            Services
          </h1>
          <p className="text-2xl text-stone-700 font-light max-w-3xl">
            Comprehensive luxury solutions orchestrated with precision
          </p>
        </div>
      </div>

      <section className="py-40 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-stone-600 py-24 text-2xl">Loading services...</p>
          ) : (
            <div className="space-y-32">
              {services.map((service, idx) => (
                <div 
                  key={idx}
                  className="grid md:grid-cols-2 gap-20 items-center pb-32 border-b border-stone-300 last:border-0"
                >
                  <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="mb-10">
                      <div className="w-12 h-0.5 bg-amber-700 mb-6" />
                      <span className="text-amber-700 text-xs font-light tracking-widest uppercase">Experience</span>
                    </div>
                    
                    <h3 className="font-display text-6xl text-stone-900 mb-10 font-light">
                      {service.name}
                    </h3>
                    <p className="text-stone-800 text-lg leading-relaxed mb-12 font-light">
                      {service.description}
                    </p>
                    
                    <div className="space-y-6">
                      <p className="text-xs text-stone-600 font-light tracking-widest uppercase mb-8">Available Locations</p>
                      <div className="flex flex-wrap gap-3">
                        {service.locations.map((loc, i) => (
                          <span 
                            key={i} 
                            className="text-sm text-stone-700 bg-white px-6 py-3 font-light border border-stone-300 hover:border-amber-700 transition-colors cursor-default"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`h-96 md:h-full md:min-h-96 overflow-hidden shadow-xl ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                    <img 
                      src={[
                        'https://images.unsplash.com/photo-1631049307038-da31bc36cb4e?w=700&h=900&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1504674900481-b60b27e2804d?w=700&h=900&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1539416506778-42a0b0ea3a62?w=700&h=900&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&h=900&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1556821552-5f4a61f8e3d6?w=700&h=900&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1544161515-81aae3ff8d23?w=700&h=900&fit=crop&q=90'
                      ][idx]}
                      alt={service.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-40 px-4 bg-stone-900 text-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700/10 rounded-full -mr-48" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="w-16 h-0.5 bg-amber-700 mx-auto mb-8" />
            <h2 className="font-display text-7xl md:text-8xl text-stone-50 mb-8 font-light tracking-tight">
              Our Process
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { title: 'Listen', desc: 'Understanding your vision and preferences' },
              { title: 'Curate', desc: 'Sourcing exclusive options aligned with you' },
              { title: 'Orchestrate', desc: 'Seamless coordination of every element' },
              { title: 'Deliver', desc: 'Experiences executed with precision' }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <h3 className="font-display text-3xl text-stone-50 mb-4 font-light">{step.title}</h3>
                <p className="text-stone-400 font-light text-base leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // ===== BLOG PAGE =====
  const BlogPage = () => (
    <div>
      <div className="pt-40 pb-24 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="w-16 h-0.5 bg-amber-700 mb-8" />
          <h1 className="font-display text-8xl md:text-9xl text-stone-900 mb-6 font-light tracking-tight">
            Insights
          </h1>
          <p className="text-2xl text-stone-700 font-light">
            Perspectives on luxury living and exclusive moments
          </p>
        </div>
      </div>

      <section className="py-40 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-stone-600 py-24 text-2xl">Loading insights...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-12">
              {blogPosts.map((post, idx) => (
                <article key={idx} className="group cursor-pointer">
                  <div className="aspect-square bg-stone-300 mb-10 overflow-hidden shadow-lg relative">
                    <img 
                      src={[
                        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&h=700&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&h=700&fit=crop&q=90',
                        'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=700&h=700&fit=crop&q=90'
                      ][idx]}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-amber-700 text-xs font-light tracking-widest uppercase">
                      {post.category} • {post.date}
                    </p>
                    <h3 className="font-display text-3xl text-stone-900 leading-tight group-hover:text-amber-700 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-stone-700 font-light text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    <button className="text-amber-700 text-sm font-light tracking-widest uppercase hover:gap-3 flex items-center gap-1 transition-all group">
                      Read More <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-40 px-4 bg-stone-900 text-stone-50 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-16 h-0.5 bg-amber-700 mx-auto mb-8" />
          <h2 className="font-display text-6xl md:text-7xl text-stone-50 mb-6 font-light tracking-tight">
            Stay Connected
          </h2>
          <p className="text-stone-400 mb-12 font-light text-lg">
            Receive curated insights on luxury living
          </p>
          <div className="flex flex-col sm:flex-row gap-1 bg-stone-800/50 p-1 backdrop-blur-sm border border-stone-700">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 px-8 py-5 bg-transparent text-stone-50 font-light placeholder-stone-600 focus:outline-none"
            />
            <button className="px-10 py-5 bg-amber-700 hover:bg-amber-800 text-stone-50 font-light tracking-widest uppercase text-sm transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // ===== CONTACT PAGE =====
  const ContactPage = () => (
    <div>
      <div className="pt-40 pb-24 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="w-16 h-0.5 bg-amber-700 mb-8" />
          <h1 className="font-display text-8xl md:text-9xl text-stone-900 mb-6 font-light tracking-tight">
            Contact
          </h1>
          <p className="text-2xl text-stone-700 font-light">
            Begin with a conversation
          </p>
        </div>
      </div>

      <section className="py-40 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
          <div>
            <div className="mb-12">
              <div className="w-12 h-0.5 bg-amber-700 mb-6" />
              <h2 className="font-display text-5xl text-stone-900 mb-4 font-light">Send a Message</h2>
              <p className="text-stone-700 font-light text-lg">Response within 5 minutes</p>
            </div>
            
            <form className="space-y-8">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-0 py-4 border-b-2 border-stone-300 bg-transparent text-stone-900 font-light placeholder-stone-500 focus:outline-none focus:border-amber-700 transition-colors text-lg"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-0 py-4 border-b-2 border-stone-300 bg-transparent text-stone-900 font-light placeholder-stone-500 focus:outline-none focus:border-amber-700 transition-colors text-lg"
              />
              <input 
                type="text" 
                placeholder="Phone" 
                className="w-full px-0 py-4 border-b-2 border-stone-300 bg-transparent text-stone-900 font-light placeholder-stone-500 focus:outline-none focus:border-amber-700 transition-colors text-lg"
              />
              <textarea 
                placeholder="Your Message..." 
                rows="7"
                className="w-full px-0 py-4 border-b-2 border-stone-300 bg-transparent text-stone-900 font-light placeholder-stone-500 focus:outline-none focus:border-amber-700 transition-colors resize-none text-lg"
              />
              <button 
                type="submit"
                className="w-full px-10 py-5 bg-stone-900 text-stone-50 font-light tracking-widest uppercase text-sm hover:bg-stone-800 transition-all duration-300 mt-10 shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="bg-stone-100 p-16 border border-stone-300">
            <div className="mb-16">
              <div className="w-12 h-0.5 bg-amber-700 mb-6" />
              <h2 className="font-display text-5xl text-stone-900 mb-4 font-light">Information</h2>
              <p className="text-stone-700 font-light text-lg">Available 24/7</p>
            </div>
            
            <div className="space-y-16">
              <div className="flex gap-8">
                <div className="text-amber-700 mt-2 flex-shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="font-light text-stone-900 mb-2 text-xl">Dubai</p>
                  <p className="text-stone-700 font-light text-lg">Jumeirah, Dubai, UAE</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-amber-700 mt-2 flex-shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="font-light text-stone-900 mb-2 text-xl">Support</p>
                  <p className="text-stone-700 font-light text-lg">+971 4 XXX XXXX</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-amber-700 mt-2 flex-shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="font-light text-stone-900 mb-2 text-xl">Email</p>
                  <p className="text-stone-700 font-light text-lg">hello@maisondelvaux.ae</p>
                </div>
              </div>

              <div className="pt-8 border-t-2 border-stone-300">
                <p className="text-base text-stone-700 font-light mb-6">Follow</p>
                <div className="flex gap-8">
                  <a href="#" className="text-stone-700 hover:text-amber-700 transition-colors">
                    <Instagram size={28} />
                  </a>
                  <a href="#" className="text-stone-700 hover:text-amber-700 transition-colors">
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&h=700&fit=crop&q=90"
            alt="Global presence"
            className="w-full h-auto object-cover shadow-lg"
          />
        </div>
      </section>
    </div>
  );

  // ===== LEGAL PAGES =====
  const LegalPage = ({ type }) => {
    const titles = {
      legal: 'Terms of Service',
      privacy: 'Privacy Policy',
      data: 'Data Protection'
    };

    const contents = {
      legal: `Maison Delvaux operates under the highest standards. All services are provided in accordance with applicable international regulations and local laws.`,
      privacy: `Your privacy is paramount. We collect only essential information. All data is encrypted and secured.`,
      data: `We comply with GDPR, CCPA, and international standards. Bank-level encryption protects all data.`
    };

    return (
      <div className="pt-40 pb-24 px-4 bg-stone-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-0.5 bg-amber-700 mb-8" />
          <h1 className="font-display text-7xl md:text-8xl text-stone-900 mb-10 font-light tracking-tight">
            {titles[type]}
          </h1>
          
          <p className="text-stone-800 font-light leading-relaxed text-lg mb-10 border-l-4 border-amber-700 pl-8 py-4">
            {contents[type]}
          </p>
          
          <p className="text-stone-700 font-light text-base">
            Last updated: April 2025
          </p>
        </div>
      </div>
    );
  };

  // ===== MAIN LAYOUT =====
  return (
    <div className="bg-stone-50 text-stone-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=EB+Garamond:wght@400;500;600&display=swap');
        
        body {
          font-family: 'EB Garamond', serif;
          letter-spacing: 0.2px;
          background-color: #fafaf8;
          color: #1c1917;
        }

        .font-display {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          letter-spacing: -1px;
        }

        html {
          scroll-behavior: smooth;
        }

        input, textarea {
          font-family: 'EB Garamond', serif;
        }

        button {
          cursor: pointer;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-xl border-b border-stone-300">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <button
            onClick={() => {
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
            className="font-display text-3xl font-light tracking-wider text-stone-900 hover:text-amber-700 transition-all duration-300"
          >
            DELVAUX
          </button>

          <nav className="hidden md:flex gap-14 items-center">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`font-light text-sm tracking-widest uppercase transition-all duration-300 pb-2 border-b-2 ${
                  currentPage === item.id 
                    ? 'text-amber-700 border-amber-700' 
                    : 'text-stone-700 hover:text-stone-900 border-transparent'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden hover:text-amber-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-300 bg-stone-50/95 backdrop-blur-xl">
            <nav className="flex flex-col">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-5 text-left font-light text-sm tracking-widest uppercase border-b border-stone-200 transition-all ${
                    currentPage === item.id 
                      ? 'text-amber-700 bg-stone-100' 
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="pt-20">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'legal' && <LegalPage type="legal" />}
        {currentPage === 'privacy' && <LegalPage type="privacy" />}
        {currentPage === 'data' && <LegalPage type="data" />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-50 py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700/10 rounded-full -mr-96 -mt-96" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div>
              <h4 className="font-display text-3xl mb-6 font-light text-stone-50">DELVAUX</h4>
              <p className="text-stone-400 text-base font-light leading-relaxed">
                Luxury concierge excellence through discretion and precision.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-light tracking-widest uppercase mb-8 text-stone-50">Services</h4>
              <ul className="space-y-4 text-sm text-stone-400 font-light">
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-amber-700 transition-colors">Hotels</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-amber-700 transition-colors">Dining</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-amber-700 transition-colors">Aviation</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-amber-700 transition-colors">Yachts</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-light tracking-widest uppercase mb-8 text-stone-50">Company</h4>
              <ul className="space-y-4 text-sm text-stone-400 font-light">
                <li><button onClick={() => setCurrentPage('blog')} className="hover:text-amber-700 transition-colors">Insights</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-amber-700 transition-colors">Contact</button></li>
                <li><button onClick={() => setCurrentPage('legal')} className="hover:text-amber-700 transition-colors">Legal</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-light tracking-widest uppercase mb-8 text-stone-50">Connect</h4>
              <p className="text-stone-400 text-sm font-light mb-4">24/7 Global</p>
              <p className="text-stone-400 font-light text-base hover:text-amber-700 transition-colors cursor-pointer">
                hello@maisondelvaux.ae
              </p>
            </div>
          </div>

          <div className="border-t border-stone-700 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <p className="text-xs text-stone-600 font-light">&copy; 2025 Maison Delvaux</p>
              <div className="flex gap-10">
                <button onClick={() => setCurrentPage('legal')} className="text-xs text-stone-600 hover:text-amber-700 font-light transition-colors">Terms</button>
                <button onClick={() => setCurrentPage('privacy')} className="text-xs text-stone-600 hover:text-amber-700 font-light transition-colors">Privacy</button>
                <button onClick={() => setCurrentPage('data')} className="text-xs text-stone-600 hover:text-amber-700 font-light transition-colors">Data</button>
              </div>
            </div>

            <div className="flex justify-center gap-8 pt-8 border-t border-stone-700">
              <a href="#" className="text-stone-700 hover:text-amber-700 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-stone-700 hover:text-amber-700 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaisonDelvaux;