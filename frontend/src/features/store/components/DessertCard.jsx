import React from 'react';
import { useCart } from '../../../context/CartContext';
import Button from '../../../components/common/Button';

export default function DessertCard({ product }) {
  const { addToCart } = useCart();
  const { name, price, description, image, category } = product;

  const getCategoryName = (cat) => {
    switch (cat) {
      case 'cakes': return 'كيك';
      case 'eastern': return 'حلويات شرقية';
      case 'chocolate': return 'شوكولاتة';
      default: return cat;
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col text-right h-full group">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-video bg-amber-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Tag */}
        <span className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {getCategoryName(category)}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Price & Name */}
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-lg font-bold text-amber-900">{price} جنيه</span>
          <h3 className="text-xl font-bold text-stone-800 font-serif line-clamp-1">{name}</h3>
        </div>

        {/* Description */}
        <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          className="w-full justify-center"
          onClick={() => addToCart(product)}
        >
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          أضف للسلة
        </Button>
      </div>
    </div>
  );
}
