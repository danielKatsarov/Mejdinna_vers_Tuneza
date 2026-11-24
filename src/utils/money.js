// Форматиране на цени: 350 -> "350,00 €"
export const money = (n) =>
  n.toLocaleString('bg-BG', { style: 'currency', currency: 'EUR' });

// Безплатна доставка над тази сума (както в хедъра: "над 150€")
export const FREE_SHIPPING_FROM = 150;