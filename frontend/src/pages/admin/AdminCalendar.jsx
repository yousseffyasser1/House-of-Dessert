import { useState, useMemo } from 'react';
import { getOrders } from '../../features/orders/order.storage';

function AdminCalendar() {
  const [currentMonth] = useState('مايو 2026');
  const [selectedDate, setSelectedDate] = useState('2026-05-08');

  const orders = useMemo(() => getOrders(), []);

  const weekDays = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];

  const getOrdersByDate = (dateStr) => {
    return orders.filter((order) => {
      if (!order.createdAt) return false;
      const orderDate = new Date(order.createdAt);
      if (isNaN(orderDate.getTime())) return false;
      return orderDate.toISOString().split('T')[0] === dateStr;
    });
  };

  const getRevenueByDate = (dateStr) => {
    const dayOrders = getOrdersByDate(dateStr);
    return dayOrders.reduce((total, order) => total + Number(order.total || 0), 0);
  };

  const formatDateArabic = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'تاريخ غير صالح';
    return new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const selectedDayOrders = getOrdersByDate(selectedDate);
  const selectedDayRevenue = getRevenueByDate(selectedDate);

  const calendarDays = [
    { day: 25, date: '2026-04-25', status: 'normal' },
    { day: 26, date: '2026-04-26', status: 'normal' },
    { day: 27, date: '2026-04-27', status: 'normal' },
    { day: 28, date: '2026-04-28', status: 'normal' },
    { day: 29, date: '2026-04-29', status: 'normal' },
    { day: 30, date: '2026-04-30', status: 'normal' },
    { day: 1, date: '2026-05-01', status: 'normal' },
    { day: 2, date: '2026-05-02', status: 'normal' },
    { day: 3, date: '2026-05-03', status: 'normal' },
    { day: 4, date: '2026-05-04', status: 'normal' },
    { day: 5, date: '2026-05-05', status: 'normal' },
    { day: 6, date: '2026-05-06', status: 'normal' },
    { day: 7, date: '2026-05-07', status: 'today' },
    { day: 8, date: '2026-05-08', status: 'selected' },
    { day: 9, date: '2026-05-09', status: 'normal' },
    { day: 10, date: '2026-05-10', status: 'normal' },
    { day: 11, date: '2026-05-11', status: 'normal' },
    { day: 12, date: '2026-05-12', status: 'normal' },
    { day: 13, date: '2026-05-13', status: 'normal' },
    { day: 14, date: '2026-05-14', status: 'normal' },
    { day: 15, date: '2026-05-15', status: 'normal' },
    { day: 16, date: '2026-05-16', status: 'normal' },
    { day: 17, date: '2026-05-17', status: 'normal' },
    { day: 18, date: '2026-05-18', status: 'normal' },
    { day: 19, date: '2026-05-19', status: 'normal' },
    { day: 20, date: '2026-05-20', status: 'normal' },
    { day: 21, date: '2026-05-21', status: 'normal' },
    { day: 22, date: '2026-05-22', status: 'normal' },
    { day: 23, date: '2026-05-23', status: 'normal' },
    { day: 24, date: '2026-05-24', status: 'normal' },
    { day: 25, date: '2026-05-25', status: 'normal' },
    { day: 26, date: '2026-05-26', status: 'normal' },
    { day: 27, date: '2026-05-27', status: 'normal' },
    { day: 28, date: '2026-05-28', status: 'normal' },
    { day: 29, date: '2026-05-29', status: 'normal' },
    { day: 30, date: '2026-05-30', status: 'normal' },
    { day: 31, date: '2026-05-31', status: 'normal' },
    { day: 1, date: '2026-06-01', status: 'normal' },
    { day: 2, date: '2026-06-02', status: 'normal' },
    { day: 3, date: '2026-06-03', status: 'normal' },
    { day: 4, date: '2026-06-04', status: 'normal' },
    { day: 5, date: '2026-06-05', status: 'normal' },
  ];

  const getDayClass = (dateStr, status) => {
    const hasOrders = getOrdersByDate(dateStr).length > 0;
    const isSelected = selectedDate === dateStr;

    if (isSelected) {
      return 'bg-amber-200 text-amber-900 font-bold';
    }
    if (status === 'today') {
      return 'bg-amber-100 text-amber-800 font-bold';
    }
    if (hasOrders) {
      return 'bg-amber-50 text-amber-700 font-medium';
    }
    return 'text-stone-700 hover:bg-stone-50';
  };

  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-stone-850 font-serif">تقويم التسليم</h1>
        <p className="text-stone-400 text-sm mt-1">
          تتبع مواعيد تسليم الطلبات وخطط يوماً بيوم
        </p>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-500">اليوم</p>
              <p className="text-2xl sm:text-3xl font-black text-stone-850 mt-2">0</p>
            </div>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-500">غداً</p>
              <p className="text-2xl sm:text-3xl font-black text-stone-850 mt-2">0</p>
            </div>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-amber-50 text-amber-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-500">خلال 7 أيام</p>
              <p className="text-2xl sm:text-3xl font-black text-stone-850 mt-2">0</p>
            </div>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-rose-50 text-rose-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-500">إيراد الشهر</p>
              <p className="text-2xl sm:text-3xl font-black text-stone-850 mt-2">0</p>
            </div>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-green-50 text-green-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Cards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Selected Day Card */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-500">اليوم المحدد</h3>
                <p className="text-lg font-black text-stone-850 mt-1">{formatDateArabic(selectedDate)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100">
                <p className="text-xs font-bold text-stone-500 mb-2">الطلبات</p>
                <p className="text-2xl font-black text-stone-850">{selectedDayOrders.length}</p>
              </div>
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <p className="text-xs font-bold text-stone-500 mb-2">الإيراد</p>
                <p className="text-2xl font-black text-stone-850">{selectedDayRevenue} جنيه</p>
              </div>
            </div>
          </div>

          {/* Today's Orders Card */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6">
            <h3 className="text-lg font-bold text-stone-850 mb-4">طلبات اليوم</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-stone-500">لا توجد طلبات في هذا اليوم</p>
            </div>
          </div>

          {/* Upcoming Orders Card */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6">
            <h3 className="text-lg font-bold text-stone-850 mb-4">طلبات قادمة</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-stone-500">لا توجد طلبات قادمة</p>
            </div>
          </div>
        </div>

        {/* Calendar Container */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 sm:p-8">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-stone-850">{currentMonth}</h2>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="px-4 py-2 rounded-xl bg-stone-850 text-white text-sm font-bold hover:bg-stone-800 transition-colors">
                  اليوم
                </button>
                <button className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-6">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-sm font-bold text-stone-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleDayClick(item.date)}
                    className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium cursor-pointer transition-all ${getDayClass(item.date, item.status)}`}
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-100 border-2 border-amber-300"></div>
                <span className="font-medium">اليوم</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-stone-800"></div>
                <span className="font-medium">محدد</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-200 border-2 border-amber-300"></div>
                <span className="font-medium">يوجد طلب</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCalendar;