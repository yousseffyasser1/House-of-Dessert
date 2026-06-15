import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../services/mockData';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId) || products[0];

  const getCategoryName = (cat) => {
    switch (cat) {
      case 'cakes': return 'كيك';
      case 'eastern': return 'حلويات شرقية';
      case 'chocolate': return 'شوكولاتة';
      default: return cat;
    }
  };

  // Get similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-right" dir="rtl">
      
      {/* Back Link */}
      <div>
        <Link to={`/category/${product.category}`} className="inline-flex items-center text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors">
          <span className="ml-1">←</span> العودة لقائمة الحلويات
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-amber-50 border border-stone-200/50 shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-950 text-xs font-bold rounded-full">
            {getCategoryName(product.category)}
          </span>

          <h1 className="text-4xl font-extrabold text-stone-850 font-serif leading-tight">
            {product.name}
          </h1>

          <div className="text-2xl font-black text-amber-700">
            {product.price} جنيه
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-3">
            <h4 className="font-bold text-stone-700">وصف المنتج</h4>
            <p className="text-stone-500 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Actions */}
          <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-stone-300 rounded-full bg-white overflow-hidden shadow-sm h-12">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-12 h-full text-lg font-bold text-stone-600 hover:bg-stone-50 transition-colors active:bg-stone-100"
              >
                -
              </button>
              <span className="w-12 text-center font-bold text-stone-800">{quantity}</span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-12 h-full text-lg font-bold text-stone-600 hover:bg-stone-50 transition-colors active:bg-stone-100"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:flex-grow justify-center shadow-md h-12"
              onClick={() => addToCart(product, quantity)}
            >
              أضف إلى سلة المشتريات
            </Button>
          </div>
        </div>
      </div>

      {/* Similar Products (حلويات مشابهة) */}
      {similarProducts.length > 0 && (
        <div className="border-t border-stone-200 pt-12 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-800 font-serif">حلويات مشابهة</h2>
            <Link to={`/category/${product.category}`} className="text-sm font-bold text-amber-600 hover:text-amber-700">
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {similarProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-150 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="aspect-video bg-amber-50 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-amber-700 font-bold">{p.price} جنيه</span>
                    <h4 className="font-bold text-stone-800 line-clamp-1">{p.name}</h4>
                  </div>
                  <Link to={`/product/${p.id}`} className="mt-4 text-center block py-2 bg-stone-50 hover:bg-amber-50 rounded-xl text-stone-600 hover:text-amber-800 text-xs font-bold transition-all border border-stone-100">
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
