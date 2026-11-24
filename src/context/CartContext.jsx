import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

// Примерни продукти, за да има какво да се види.
// TODO: по-късно количката ще се пълни от бутоните "В количката" и ще се пази в Supabase.
const DEMO_ITEMS = [
  { id: 'n1', kind: 'guitar', tint: 0, meta: 'КИТАРИ', name: 'Електрическа китара, 22 прага', price: 350, qty: 1 },
  { id: 'n2', kind: 'keys', tint: 1, meta: 'КЛАВИШНИ', name: 'Дигитално пиано, 88 клавиша', price: 600, qty: 1 },
  { id: 'n3', kind: 'amp', tint: 2, meta: 'УСИЛВАТЕЛИ', name: 'Комбо усилвател за китара, 30 W', price: 165, qty: 2 },
];

const MAX_QTY = 10;

export function CartProvider({ children }) {
  const [items, setItems] = useState(DEMO_ITEMS);

  // product: { id, kind, tint, meta, name, price } (price е число в евро)
  const addItem = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

  const setQty = (id, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, Math.max(1, qty)) } : i))
    );

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, addItem, setQty, removeItem, MAX_QTY }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);