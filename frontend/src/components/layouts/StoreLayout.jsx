import { Link, Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo.png';

export default function StoreLayout() {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-stone-800 font-sans" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FCFBF8]/95 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-amber-950 font-serif">
                House Of Dessert
              </span>
              <img src={logo} alt="House Of Dessert" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-stone-600 font-medium">
            <Link to="/" className="hover:text-amber-700 transition-colors">الرئيسية</Link>
            <Link to="/category/cakes" className="hover:text-amber-700 transition-colors">كيك</Link>
            <Link to="/category/eastern" className="hover:text-amber-700 transition-colors">حلويات شرقية</Link>
            <Link to="/category/chocolate" className="hover:text-amber-700 transition-colors">شوكولاتة</Link>
            <Link to="/contact" className="hover:text-amber-700 transition-colors">تواصل معنا</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search (Icon placeholder) */}
            <button className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

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

            {/* CTA Button */}
            <Link to="/category/cakes" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded-full transition-all duration-300 shadow-sm text-sm">
              ابدأ الطلب
            </Link>
          </div>

        </div>
      </header>

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
