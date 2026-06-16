import { Link } from 'react-router-dom';
import { products } from '../../../services/mockData';

export default function RelatedProducts({ productId, category }) {
  const related = products
    .filter((p) => p.category === category && p.id !== productId)
    .slice(0, 4);

  if (related.length === 0) return null;

  const getCategoryName = (cat) => {
    switch (cat) {
      case 'cakes': return 'كيك';
      case 'eastern': return 'حلويات شرقية';
      case 'chocolate': return 'شوكولاتة';
      default: return cat;
    }
  };

  return (
    <div className="border-t border-stone-200 pt-12 space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-800 font-serif">حلويات مشابهة</h2>
        <Link
          to={`/category/${category}`}
          className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
        >
          عرض الكل
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-stone-150 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group"
          >
            {/* Image */}
            <Link to={`/product/${p.id}`} className="relative overflow-hidden bg-amber-50 block">
              <div className="aspect-[4/3]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              {/* Category Badge */}
              <span className="absolute top-3 right-3 bg-amber-100/90 backdrop-blur-sm text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                {getCategoryName(p.category)}
              </span>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 text-right">
              {/* Name & Price */}
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-base font-bold text-amber-700">{p.price} جنيه</span>
                <h3 className="font-bold text-stone-800 line-clamp-1 ml-2">{p.name}</h3>
              </div>

              {/* CTA Button */}
              <Link
                to={`/product/${p.id}`}
                className="mt-auto w-full block text-center py-2.5 bg-stone-50 hover:bg-amber-50 rounded-xl text-stone-600 hover:text-amber-800 text-xs font-bold transition-all duration-300 border border-stone-100 hover:border-amber-200"
              >
                عرض التفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}