const ORDERS_STORAGE_KEY = 'house-of-dessert-orders';

export function getOrders() {
  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

  if (!storedOrders) {
    return [];
  }

  try {
    const orders = JSON.parse(storedOrders);
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(order) {
  const orders = getOrders();
  const nextOrders = [...orders, order];
  saveOrders(nextOrders);
  return order;
}
