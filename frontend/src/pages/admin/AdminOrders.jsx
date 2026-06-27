import { useState, useMemo } from 'react';
import { getOrders, saveOrders } from '../../features/orders/order.storage';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'confirmed', label: 'مؤكد', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'preparing', label: 'قيد التحضير', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'delivered', label: 'تم التوصيل', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'cancelled', label: 'ملغي', color: 'bg-rose-100 text-rose-800 border-rose-200' },
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'الكل' },
  { value: 'pending', label: 'جديد' },
  { value: 'preparing', label: 'قيد التحضير' },
  { value: 'delivered', label: 'تم التوصيل' },
  { value: 'cancelled', label: 'ملغي' },
];

const PAYMENT_LABELS = {
  cash_on_delivery: 'الدفع عند الاستلام',
  instapay: 'إنستا باي',
  wallet: 'محفظة إلكترونية',
};

const DELIVERY_LABELS = {
  delivery: 'توصيل للمنزل',
  pickup: 'استلام من المحل',
};

function formatDate(isoString) {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return 'تاريخ غير صالح';
  }
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function AdminOrders() {
  const [allOrders, setAllOrders] = useState(() => {
    return getOrders();
  });
  const [updatingId, setUpdatingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const reloadOrders = () => {
    const freshOrders = getOrders();
    setAllOrders(freshOrders);
  };

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...allOrders];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((order) => {
        const orderId = order.id.toLowerCase();
        const customerName = order.customer.name.toLowerCase();
        const phoneNumber = order.customer.phone.toLowerCase();
        return (
          orderId.includes(query) ||
          customerName.includes(query) ||
          phoneNumber.includes(query)
        );
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [allOrders, searchQuery, statusFilter, sortOrder]);

  const handleStatusChange = (orderId, newStatus) => {
    setUpdatingId(orderId);
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setAllOrders(updatedOrders);
    saveOrders(updatedOrders);
    setUpdatingId(null);
  };

  const getStatusConfig = (statusValue) => {
    return STATUS_OPTIONS.find((s) => s.value === statusValue) || STATUS_OPTIONS[0];
  };

  // --- Empty State (No orders at all) ---
  if (allOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-stone-800">لا توجد طلبات</h1>
        <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
          لم يتم استلام أي طلبات بعد. ستظهر الطلبات هنا بمجرد إتمام العملاء للطلب.
        </p>
      </div>
    );
  }

  // --- Empty State (No matching orders) ---
  if (filteredAndSortedOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-stone-800">لا توجد طلبات مطابقة</h1>
        <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
          لم يتم العثور على طلبات تطابق معايير البحث والفلتر المحددة.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-850 font-serif">إدارة الطلبات</h1>
            <p className="text-stone-400 text-sm mt-1">
              إجمالي الطلبات: <span className="font-bold text-stone-700">{allOrders.length}</span>
            </p>
          </div>
          <button
            onClick={reloadOrders}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-full text-sm font-bold text-stone-700 hover:border-amber-300 hover:text-amber-700 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            تحديث القائمة
          </button>
        </div>

        {/* Search, Filter, and Sort Controls */}
        <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-4 sm:p-6 mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="البحث برقم الطلب، اسم العميل، أو رقم الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter and Sort Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-500 mb-2">فلتر الحالة</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer"
                >
                  {FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Sort Order */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-500 mb-2">ترتيب حسب</label>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="newest">الأحدث أولاً</option>
                  <option value="oldest">الأقدم أولاً</option>
                </select>
                <svg
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-2 border-t border-stone-100">
            <p className="text-xs text-stone-500">
              عرض <span className="font-bold text-stone-700">{filteredAndSortedOrders.length}</span> من أصل <span className="font-bold text-stone-700">{allOrders.length}</span> طلب
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredAndSortedOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const isUpdating = updatingId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="px-6 sm:px-8 py-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-sm font-bold text-stone-800">
                    رقم الطلب: <span className="text-amber-700 font-mono">{order.id}</span>
                  </span>
                    <span className="text-xs text-stone-400">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  {/* Status Selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-stone-500">الحالة:</label>
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={isUpdating}
                        className={`appearance-none pl-8 pr-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                          statusConfig.color
                        } ${isUpdating ? 'opacity-60' : ''}`}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="px-6 sm:px-8 py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Customer Info - spans 4 cols */}
                    <div className="lg:col-span-4 space-y-4">
                      <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider">
                        معلومات العميل
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">الاسم</p>
                            <p className="text-sm font-bold text-stone-800">{order.customer.name}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">رقم الهاتف</p>
                            <p className="text-sm font-bold text-stone-800" dir="ltr">
                              {order.customer.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">العنوان</p>
                            <p className="text-sm font-bold text-stone-800 leading-relaxed">
                              {order.customer.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details - spans 4 cols */}
                    <div className="lg:col-span-4 space-y-4">
                      <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider">
                        تفاصيل الطلب
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-stone-400">طريقة التوصيل</span>
                          <span className="text-sm font-bold text-stone-800">
                            {DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-stone-400">طريقة الدفع</span>
                          <span className="text-sm font-bold text-stone-800">
                            {PAYMENT_LABELS[order.payment.method] || order.payment.method}
                          </span>
                        </div>
                        {order.payment.transferNumber && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-stone-400">رقم التحويل</span>
                            <span className="text-sm font-bold text-amber-700" dir="ltr">
                              {order.payment.transferNumber}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                          <span className="text-xs text-stone-400">المجموع</span>
                          <span className="text-lg font-black text-amber-700">
                            {order.total} جنيه
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Products - spans 4 cols */}
                    <div className="lg:col-span-4 space-y-4">
                      <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider">
                        المنتجات ({order.items.length})
                      </h3>
                      <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50/60 border border-stone-100"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-xl bg-amber-50 border border-stone-100 flex-shrink-0"
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
                    </div>
                  </div>

                  {/* Notes - full width */}
                  {order.notes && (
                    <div className="mt-5 pt-5 border-t border-stone-100">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-stone-400 mb-1">ملاحظات الطلب</p>
                          <p className="text-sm text-stone-700 leading-relaxed">{order.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
}

export default AdminOrders;