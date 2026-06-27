import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../services/mockData';
import logo from '../../assets/logo.png';

export default function StoreLayout() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle search using useMemo to avoid cascading renders
  const searchResults = useMemo(() => {
    if (searchQuery.trim() === '') {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleSearchResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/category/cakes', label: 'كيك' },
    { to: '/category/eastern', label: 'حلويات شرقية' },
    { to: '/category/chocolate', label: 'شوكولاتة' },
    { to: '/contact', label: 'تواصل معنا' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-stone-800 font-sans" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FCFBF8]/95 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="House Of Dessert" className="h-15 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-stone-600 font-medium">
            <Link to="/" className="hover:text-amber-700 transition-colors">الرئيسية</Link>
            <Link to="/category/cakes" className="hover:text-amber-700 transition-colors">كيك</Link>
            <Link to="/category/eastern" className="hover:text-amber-700 transition-colors">حلويات شرقية</Link>
            <Link to="/category/chocolate" className="hover:text-amber-700 transition-colors">شوكولاتة</Link>
            <Link to="/contact" className="hover:text-amber-700 transition-colors">تواصل معنا</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon/Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن منتج..."
                    className="w-40 sm:w-64 px-4 py-2 bg-white border border-stone-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    dir="rtl"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchResultClick(product.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 text-right">
                        <p className="text-sm font-medium text-stone-800">{product.name}</p>
                        <p className="text-xs text-stone-500">{product.price} ج.م</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {isSearchOpen && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-6 text-center z-50">
                  <p className="text-stone-500 text-sm">لا توجد نتائج</p>
                </div>
              )}
            </div>

            {/* Cart Link with Badge */}
            <Link to="/cart" className="relative p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-amber-500 text-amber-950 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#FCFBF8] shadow-sm animate-scale">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Desktop CTA Button */}
            <Link to="/category/cakes" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded-full transition-all duration-300 shadow-sm text-sm">
              ابدأ الطلب
            </Link>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-sm bg-[#FCFBF8] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-xl font-bold text-amber-950 font-serif">القائمة</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-all"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all font-medium text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-stone-200 mt-4">
                <Link
                  to="/cart"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all font-medium text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  السلة
                  {cartCount > 0 && (
                    <span className="mr-auto bg-amber-500 text-amber-950 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-stone-200">
            <Link
              to="/category/cakes"
              onClick={handleLinkClick}
              className="block w-full text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded-full transition-all duration-300 shadow-sm"
            >
              ابدأ الطلب
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#2D1B13] text-stone-300 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-amber-400 font-serif">House Of Dessert</h3>
              <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
                حلويات منزلية فاخرة مصنوعة بحب وشغف. نقدم أجود أنواع الكيك والحلويات الشرقية والشوكولاتة الفاخرة للعملاء المميزين.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {/* Social media icons */}
                <a href="#" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                  f
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                  t
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                  in
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">روابط سريعة</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link></li>
                <li><Link to="/category/cakes" className="hover:text-amber-400 transition-colors">منتجاتنا</Link></li>
                <li><Link to="/contact" className="hover:text-amber-400 transition-colors">تواصل معنا</Link></li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">تواصل معنا</h4>
              <p className="text-stone-400 text-sm leading-relaxed">
                يسعدنا تواصلكم معنا عبر النموذج أو مباشرة من خلال الواتساب.
              </p>
              <p className="text-stone-400 text-sm">
                الهاتف: +20 123456789
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} House Of Dessert</p>
          </div>
        </div>
      </footer>
    </div>
  );
}