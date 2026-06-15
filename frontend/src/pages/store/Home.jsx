import React, { useState } from 'react';
import { products, reviews, categories } from '../../services/mockData';
import DessertCard from '../../features/store/components/DessertCard';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';


export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cakes');
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [localReviews, setLocalReviews] = useState(reviews);

  // Filter products by category
  const filteredProducts = products.filter(p => p.category === activeCategory);

  // Handle Review Submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewText) return;

    const newReview = {
      id: Date.now().toString(),
      name: reviewName,
      comment: reviewText,
      rating: Number(rating),
    };

    setLocalReviews([newReview, ...localReviews]);
    setReviewName('');
    setReviewText('');
    setRating(5);
  };

  return (
    <div className="space-y-20 pb-20 text-right" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 to-stone-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Collage / Image (Left in RTL, Right in standard) */}
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-amber-500/10 flex items-center justify-center p-4 border border-amber-500/20 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"
                alt="Dessert Collage"
                className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-2xl shadow-md border border-stone-100 flex items-center gap-2">
                <span className="text-amber-500 text-lg">★</span>
                <span className="font-bold text-stone-800">طازج يومياً</span>
              </div>
            </div>
          </div>

          {/* Texts & CTA */}
          <div className="order-1 md:order-2 space-y-6">
            <span className="inline-flex items-center px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-bold shadow-sm">
              الفاخرة
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 font-serif leading-tight">
              تذوق <span className="text-amber-600">ألذ</span> الحلويات
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-lg">
              كيك فاخر وحلويات شرقية وشوكولاتة طازجة. نحن متميزون بتقديم أفضل ما تحبونه من نكهات منزلية أصلية!
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" className="px-8 shadow-md">
                اطلب الآن
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Section (جرعتك الوحيدة من اللذة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 md:p-12 border border-stone-200/50 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Side */}
          <div className="space-y-5">
            <span className="text-amber-600 font-bold text-sm">المنتج المميز</span>
            <h2 className="text-3xl font-extrabold text-stone-800 font-serif">جرعتك الوحيدة من اللذة</h2>
            <div className="bg-white p-6 rounded-2xl border border-stone-100 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="font-bold text-stone-800">كيكة الشوكولاتة</h4>
                <p className="text-stone-400 text-xs mt-1">كيكة شوكولاتة غنية بالغاناش الداكن...</p>
              </div>
              <span className="text-xl font-black text-amber-700">85 جنيه</span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">
              يجب أن تحتوي كل سلة حلويات على كعكة الشوكولاتة. وهذه واحدة من مفضلاتنا لمحبي المخبوزات الحقيقية والمذاق الأصلي.
            </p>
          </div>
          {/* Image Side */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
              alt="Featured Pastry"
              className="w-72 h-72 object-cover rounded-2xl shadow-md border border-stone-100"
            />
          </div>
        </div>
      </section>

      {/* 3. Products List / Category Tabs (منتجاتنا التي نقدمها) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center md:text-right space-y-2">
          <h2 className="text-3xl font-extrabold text-stone-800 font-serif">منتجاتنا التي نقدمها~</h2>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-start gap-3 border-b border-stone-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-900'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {cat.name} <span className="opacity-70 text-xs ml-1">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <DessertCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Testimonials (لماذا حلوياتنا مميزة للعملاء؟) */}
      <section className="bg-stone-50 py-16 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl font-extrabold text-stone-800 font-serif">لماذا حلوياتنا مميزة للعملاء؟ 🍪</h2>
            <Button variant="outline" className="px-6 font-bold shadow-sm">
              تسوق الآن
            </Button>
          </div>

          {/* Add Review Form */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/50 shadow-sm max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-stone-800 border-b border-stone-100 pb-3">أضف تقييمك</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <Input
                label="اسمك"
                name="name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="أدخل اسمك الكريم"
                required
              />

              <Input
                label="اكتب تقييمك..."
                name="comment"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="شاركنا رأيك في منتجاتنا وتجربتك معنا"
                textarea
                required
              />

              {/* Star Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-stone-700">التقييم:</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${
                        star <= rating ? 'text-amber-500' : 'text-stone-200'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-left">
                <Button type="submit" variant="primary">
                  إرسال التقييم
                </Button>
              </div>
            </form>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {localReviews.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">{rev.name}</span>
                  <div className="text-amber-500 text-sm">
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
