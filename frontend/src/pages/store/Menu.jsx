import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../../services/mockData';
import DessertCard from '../../features/store/components/DessertCard';

export default function Menu() {
  const { categoryId } = useParams();

  const activeCategory = categories.find(c => c.id === categoryId) || categories[0];
  const filteredProducts = products.filter(p => p.category === activeCategory.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-right" dir="rtl">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-stone-900 font-serif">
          {activeCategory.name}
        </h1>
        <p className="text-stone-500 text-sm">نصنع السعادة يدوياً لأجلك</p>
      </div>

      {/* Category Selection Sidebar/Top bar */}
      <div className="flex items-center justify-start gap-4 border-b border-stone-200 pb-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
              activeCategory.id === cat.id
                ? 'bg-amber-500 text-stone-900'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <DessertCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-300">
          <p className="text-stone-500">لا توجد منتجات متوفرة حالياً في هذا القسم.</p>
        </div>
      )}

    </div>
  );
}
