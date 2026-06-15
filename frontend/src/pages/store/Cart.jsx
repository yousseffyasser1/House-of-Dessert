import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // If cart is empty, render the design matching Group 9.png
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-6" dir="rtl">
        {/* Shopping Cart Icon */}
        <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-stone-800">السلة فارغة</h1>
        <p className="text-stone-400 text-sm max-w-sm">
          لم تضف أي منتجات بعد إلى سلتك. تصفح حلوياتنا اللذيذة واختر ما يعجبك!
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="secondary" className="px-8 font-bold">
              تصفح المنتجات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right" dir="rtl">
      
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-stone-850 font-serif mb-10">
        السلة ({cart.reduce((a, b) => a + b.quantity, 0)})
      </h1>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Items List (Left/Main in RTL) */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              {/* Product Info & Image */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-2xl bg-amber-50 border border-stone-100 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-stone-800 text-lg">{item.name}</h3>
                  <span className="text-stone-400 text-xs mt-1 block">
                    سعر القطعة: {item.price} جنيه
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Total & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                
                {/* Quantity buttons */}
                <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 overflow-hidden h-10">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-full text-stone-500 hover:bg-stone-100 font-bold transition-all"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-stone-700 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-full text-stone-500 hover:bg-stone-100 font-bold transition-all"
                  >
                    +
                  </button>
                </div>

                {/* Total Item Price */}
                <span className="font-bold text-amber-900 text-lg w-24 text-left">
                  {item.price * item.quantity} جنيه
                </span>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                  title="حذف"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-stone-200/50 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-stone-850 border-b border-stone-200 pb-3">
            ملخص الطلب
          </h2>

          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-stone-500">
                <span>{item.name} × {item.quantity}</span>
                <span>{item.price * item.quantity} جنيه</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-4 flex justify-between items-baseline">
            <span className="font-bold text-stone-800">المجموع</span>
            <span className="text-2xl font-black text-amber-700">{cartTotal} جنيه</span>
          </div>

          <div className="pt-2">
            <Button variant="secondary" className="w-full justify-center h-12 shadow-sm">
              إتمـام الطلب
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
