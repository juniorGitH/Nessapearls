import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../images/logo2.png";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const WHATSAPP_NUMBER = "22893733150";

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/bijoux", label: "Bijoux" },
    { path: "/montres", label: "Montres" },
    { path: "/bracelets", label: "Bracelets" },
    { path: "/coffrets", label: "Coffrets" },
    { path: "/accessoires", label: "Accessoires" },
  ];

  const handleWhatsAppContact = () => {
    const message = "Bonjour Nessa Pearls ! J'aimerais avoir des informations sur vos bijoux.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-600"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
              <img 
                src={logoImg} 
                alt="Nessa Pearls" 
                className="h-24 w-auto transform hover:scale-105 transition-transform"
              />
              <span className="hidden md:block text-2xl font-black tracking-tighter text-slate-900">
                NESSA <span className="text-indigo-600">PEARLS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons / Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Search */}
              <div className="hidden md:flex items-center relative">
                {isSearchOpen && (
                  <form onSubmit={handleSearch} className="absolute right-10 animate-in fade-in slide-in-from-right-4 duration-300">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher..."
                      autoFocus
                      className="w-48 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-indigo-500 shadow-sm"
                    />
                  </form>
                )}
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <FontAwesomeIcon icon={isSearchOpen ? faTimes : faSearch} />
                </button>
              </div>

              {/* Mobile Search Icon */}
              <button 
                onClick={() => { setIsMenuOpen(true); setIsSearchOpen(true); }}
                className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
                <span className="absolute top-1 right-0 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden bg-white ${
          isMenuOpen ? 'max-h-screen border-b border-slate-100' : 'max-h-0'
        }`}>
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearch} className="relative pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un bijou..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-3 text-slate-400">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleWhatsAppContact}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-full uppercase text-xs tracking-widest"
              >
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavMenu;
