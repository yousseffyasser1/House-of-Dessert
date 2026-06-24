import { useMemo, useState } from 'react';
import { getOrders } from '../../features/orders/order.storage';
import { products } from '../../services/mockData';

const STATUS_LABELS = {
  pending: 'قيد الانتظار',
  confirmed: 'مؤكد',
  preparing: 'قيد التحضير',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي',
};

function formatCurrency(value) {
  return new Intl.NumberFormat('ar-EG').format(value);
}

function formatDate(isoString) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return 'تاريخ غير صالح';
  }

  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function AdminDashboard() {
  const [orders] = useState(() => {
    const allOrders = getOrders();
    return [...allOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  const stats = useMemo(() => {
    const revenue = orders.reduce((total, order) => total + Number(order.total || 0), 0);
    const newOrders = orders.filter((order) => order.status === 'pending').length;

    return [
      {
        label: 'إجمالي الطلبات',
        value: orders.length,
        helper: 'كل الطلبات المحفوظة',
        color: 'bg-amber-50 text-amber-700',
      },
      {
        label: 'الإيرادات',
        value: `${formatCurrency(revenue)} جنيه`,
        helper: 'إجمالي قيمة الطلبات',
        color: 'bg-green-50 text-green-700',
      },
      {
        label: 'المنتجات',
        value: products.length,
        helper: 'عدد المنتجات الحالي',
        color: 'bg-stone-100 text-stone-700',
      },
      {
        label: 'طلبات جديدة',
        value: newOrders,
        helper: 'طلبات قيد الانتظار',
        color: 'bg-rose-50 text-rose-700',
      },
    ];
  }, [orders]);

  const latestOrders = orders.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-stone-850 font-serif">مرحباً بك</h1>
        <p className="text-stone-400 text-sm mt-1">
          نظرة سريعة على أداء الطلبات في House Of Dessert
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-5 sm:p-6 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-bold text-stone-500">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-black text-stone-850 mt-2 break-words">
                  {stat.value}
                </p>
              </div>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-6m4 6V7m4 10v-4M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-4">{stat.helper}</p>
          </div>
        ))}
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-850">أحدث الطلبات</h2>
          <p className="text-stone-400 text-sm mt-1">آخر الطلبات المحفوظة في النظام</p>
        </div>

        {latestOrders.length === 0 ? (
          <div className="px-6 sm:px-8 py-16 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-800">لا توجد طلبات</h3>
              <p className="text-stone-400 text-sm max-w-sm leading-relaxed mt-2">
                لم يتم استلام أي طلبات بعد. ستظهر أحدث الطلبات هنا بمجرد حفظها.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-right">
              <thead className="bg-stone-50/80">
                <tr className="text-xs font-bold text-stone-500">
                  <th className="px-6 sm:px-8 py-4">رقم الطلب</th>
                  <th className="px-4 py-4">العميل</th>
                  <th className="px-4 py-4">التاريخ</th>
                  <th className="px-4 py-4">الحالة</th>
                  <th className="px-6 sm:px-8 py-4">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {latestOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-6 sm:px-8 py-4">
                      <span className="text-sm font-bold text-amber-700">{order.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-800 truncate">
                          {order.customer?.name || 'عميل غير معروف'}
                        </p>
                        <p className="text-xs text-stone-400" dir="ltr">
                          {order.customer?.phone || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-stone-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold">
                        {STATUS_LABELS[order.status] || order.status || 'قيد الانتظار'}
                      </span>
                    </td>
                    <td className="px-6 sm:px-8 py-4">
                      <span className="text-sm font-black text-stone-800">
                        {formatCurrency(Number(order.total || 0))} جنيه
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
