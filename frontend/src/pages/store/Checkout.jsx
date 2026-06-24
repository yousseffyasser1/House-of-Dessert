import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';
import { addOrder } from '../../features/orders/order.storage';

const PAYMENT_NUMBER = '01206668841';

const createOrderId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `ORD-${crypto.randomUUID()}`;
  }

  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    notes: '',
    paymentMethod: '',
    walletProvider: '',
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (cart.length === 0) {
      newErrors.cart = 'السلة فارغة';
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'يرجى إدخال الاسم';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else if (!/^[\d+\- ]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'يرجى إدخال العنوان';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'يرجى اختيار طريقة الدفع';
    }

    if (formData.paymentMethod === 'wallet') {
      if (!formData.walletProvider) {
        newErrors.walletProvider = 'يرجى اختيار المحفظة الإلكترونية';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place order handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const paymentMethod = formData.paymentMethod === 'cod'
      ? 'cash_on_delivery'
      : formData.paymentMethod;

    const shouldStoreTransferNumber = paymentMethod === 'instapay' || paymentMethod === 'wallet';

    // Create order object
    const order = {
      id: createOrderId(),
      customer: {
        name: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      },
      deliveryMethod: formData.deliveryMethod,
      payment: {
        method: paymentMethod,
        provider: paymentMethod === 'wallet' ? formData.walletProvider : paymentMethod,
        transferNumber: shouldStoreTransferNumber ? PAYMENT_NUMBER : '',
      },
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString(),
    };

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Save order to localStorage (orders history)
        addOrder(order);

        // Clear cart only after the order is saved successfully
        clearCart();

        setIsSubmitting(false);
        setIsSuccess(true);
      } catch (error) {
        console.error('Failed to save order', error);
        setIsSubmitting(false);
      }
    }, 800);
  };

  // --- Success State ---
  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-6" dir="rtl">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-stone-800">تم إرسال الطلب بنجاح</h1>
        <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
          شكراً لك! تم استلام طلبك وسيتم التواصل معك قريباً لتأكيد التفاصيل.
        </p>

        <div className="pt-4">
          <Link to="/">
            <Button variant="secondary" className="px-10 font-bold h-12 text-base">
              العودة إلى الرئيسية
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- Empty Cart State ---
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-6" dir="rtl">
        <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-stone-800">السلة فارغة</h1>
        <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
          لا يمكن إتمام الطلب لأن سلتك فارغة. أضف بعض المنتجات أولاً.
        </p>

        <div className="pt-2">
          <Link to="/">
            <Button variant="secondary" className="px-8 font-bold h-12">
              تصفح المنتجات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- Checkout Form ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-stone-850 font-serif mb-10">
        إتمام الطلب
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column - Customer Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-stone-850 mb-2">
                معلومات التوصيل
              </h2>

              {/* Customer Name */}
              <div>
                <label htmlFor="customerName" className="block text-sm font-bold text-stone-700 mb-1.5">
                  الاسم الكامل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  className={`w-full px-4 py-3 rounded-2xl border text-stone-800 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400 text-sm ${
                    errors.customerName ? 'border-rose-300 bg-rose-50/50' : 'border-stone-200'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-rose-500 text-xs mt-1.5 mr-1">{errors.customerName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-stone-700 mb-1.5">
                  رقم الهاتف <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخل رقم هاتفك"
                  className={`w-full px-4 py-3 rounded-2xl border text-stone-800 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400 text-sm ${
                    errors.phone ? 'border-rose-300 bg-rose-50/50' : 'border-stone-200'
                  }`}
                />
                {errors.phone && (
                  <p className="text-rose-500 text-xs mt-1.5 mr-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-bold text-stone-700 mb-1.5">
                  العنوان <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="أدخل عنوان التوصيل بالتفصيل (الشارع، المنطقة، المدينة)"
                  className={`w-full px-4 py-3 rounded-2xl border text-stone-800 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400 text-sm resize-none ${
                    errors.address ? 'border-rose-300 bg-rose-50/50' : 'border-stone-200'
                  }`}
                />
                {errors.address && (
                  <p className="text-rose-500 text-xs mt-1.5 mr-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Delivery Method Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-850 mb-1">
                طريقة التوصيل
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.deliveryMethod === 'delivery'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={formData.deliveryMethod === 'delivery'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.deliveryMethod === 'delivery' ? 'border-amber-500' : 'border-stone-300'
                  }`}>
                    {formData.deliveryMethod === 'delivery' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 text-sm">توصيل للمنزل</span>
                    <p className="text-xs text-stone-400 mt-0.5">يتم التوصيل إلى عنوانك</p>
                  </div>
                </label>

                <label
                  className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.deliveryMethod === 'pickup'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.deliveryMethod === 'pickup' ? 'border-amber-500' : 'border-stone-300'
                  }`}>
                    {formData.deliveryMethod === 'pickup' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 text-sm">استلام من المحل</span>
                    <p className="text-xs text-stone-400 mt-0.5">تأتي لاستلام طلبك بنفسك</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-850 mb-1">
                طريقة الدفع <span className="text-rose-500">*</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* InstaPay */}
                <label
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'instapay'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="instapay"
                    checked={formData.paymentMethod === 'instapay'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.paymentMethod === 'instapay' ? 'border-amber-500' : 'border-stone-300'
                  }`}>
                    {formData.paymentMethod === 'instapay' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <span className="font-bold text-stone-800 text-sm text-center">إنستا باي</span>
                </label>

                {/* Electronic Wallet */}
                <label
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'wallet'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={formData.paymentMethod === 'wallet'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.paymentMethod === 'wallet' ? 'border-amber-500' : 'border-stone-300'
                  }`}>
                    {formData.paymentMethod === 'wallet' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <span className="font-bold text-stone-800 text-sm text-center">محفظة إلكترونية</span>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.paymentMethod === 'cod' ? 'border-amber-500' : 'border-stone-300'
                  }`}>
                    {formData.paymentMethod === 'cod' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <span className="font-bold text-stone-800 text-sm text-center">الدفع عند الاستلام</span>
                </label>
              </div>

              {errors.paymentMethod && (
                <p className="text-rose-500 text-xs mt-1.5 mr-1">{errors.paymentMethod}</p>
              )}

              {/* Payment Instructions - shown for InstaPay or Electronic Wallet */}
              {(formData.paymentMethod === 'instapay' || formData.paymentMethod === 'wallet') && (
                <div className="mt-4 p-5 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-3">
                  <p className="text-sm font-bold text-stone-800">
                    لإتمام الطلب، يرجى تحويل المبلغ على الرقم التالي:
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-500">رقم التحويل:</span>
                      <span className="text-lg font-black text-amber-700 tracking-wide">{PAYMENT_NUMBER}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(PAYMENT_NUMBER);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:border-amber-300 hover:text-amber-700 transition-all"
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          تم نسخ الرقم
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          نسخ
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed">
                    ثم احتفظ بإثبات التحويل وسيتم التواصل معك لتأكيد الطلب.
                  </p>

                  {formData.paymentMethod === 'wallet' && (
                    <p className="text-xs font-bold text-stone-700 bg-white/60 rounded-lg px-3 py-2 inline-block">
                      طريقة الدفع: محفظة إلكترونية
                    </p>
                  )}
                  {formData.paymentMethod === 'instapay' && (
                    <p className="text-xs font-bold text-stone-700 bg-white/60 rounded-lg px-3 py-2 inline-block">
                      طريقة الدفع: إنستا باي
                    </p>
                  )}
                </div>
              )}

              {/* Wallet Provider Selection - shown only when wallet is selected */}
              {formData.paymentMethod === 'wallet' && (
                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    اختر المحفظة الإلكترونية <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.walletProvider === 'vodafone'
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="walletProvider"
                        value="vodafone"
                        checked={formData.walletProvider === 'vodafone'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.walletProvider === 'vodafone' ? 'border-amber-500' : 'border-stone-300'
                      }`}>
                        {formData.walletProvider === 'vodafone' && (
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <span className="font-bold text-stone-800 text-sm">فودافون كاش</span>
                    </label>

                    <label
                      className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.walletProvider === 'orange'
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="walletProvider"
                        value="orange"
                        checked={formData.walletProvider === 'orange'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.walletProvider === 'orange' ? 'border-amber-500' : 'border-stone-300'
                      }`}>
                        {formData.walletProvider === 'orange' && (
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <span className="font-bold text-stone-800 text-sm">أورانج كاش</span>
                    </label>
                  </div>
                  {errors.walletProvider && (
                    <p className="text-rose-500 text-xs mt-1.5 mr-1">{errors.walletProvider}</p>
                  )}
                </div>
              )}
            </div>

            {/* Order Notes Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-850 mb-1">
                ملاحظات الطلب
              </h2>
              <div>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="أي ملاحظات إضافية (اختياري)"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-stone-800 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-stone-200/50 shadow-sm space-y-5 sticky top-28">
              <h2 className="text-xl font-bold text-stone-850 border-b border-stone-200 pb-3">
                ملخص الطلب
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl bg-amber-50 border border-stone-100 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-stone-800 truncate">{item.name}</p>
                      <p className="text-xs text-stone-400">
                        {item.price} جنيه × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-stone-700 flex-shrink-0">
                      {item.price * item.quantity} جنيه
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-stone-200 pt-4 flex justify-between items-baseline">
                <span className="font-bold text-stone-800">المجموع</span>
                <span className="text-2xl font-black text-amber-700">{cartTotal} جنيه</span>
              </div>

              {/* Delivery Fee Note */}
              <p className="text-xs text-stone-400 text-center">
                * قد تختلف رسوم التوصيل حسب المنطقة
              </p>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="w-full justify-center h-12 shadow-sm text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  'تأكيد الطلب'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
