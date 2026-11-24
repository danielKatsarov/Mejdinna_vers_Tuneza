import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money, FREE_SHIPPING_FROM } from '../utils/money';

const DELIVERY = [
  { id: 'address', title: 'Куриер до адрес', note: '1–2 работни дни', fee: 6 },
  { id: 'office', title: 'Доставка до офис на куриер', note: '1–2 работни дни', fee: 4 },
  { id: 'store', title: 'Вземане от магазина', note: 'Готова до 24 часа', fee: 0 },
];

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [delivery, setDelivery] = useState('address');
  const [payment, setPayment] = useState('card');

  // Демо форма: нищо не се изпраща.
  // TODO: свържи със Supabase (създаване на поръчка) и с платежен доставчик.
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (items.length === 0) {
    return (
      <section className="wrap section simple-page">
        <span className="eyebrow eyebrow-dark">ПЛАЩАНЕ</span>
        <h1>Няма какво да платиш</h1>
        <p>Количката е празна. Добави инструменти и се върни тук.</p>
        <Link to="/shop" className="btn btn-clay">Към магазина</Link>
      </section>
    );
  }

  const freeShipping = subtotal >= FREE_SHIPPING_FROM;
  const method = DELIVERY.find((d) => d.id === delivery);
  const shipping = freeShipping ? 0 : method.fee;
  const total = subtotal + shipping;

  return (
    <section className="wrap section shop-flow">
      <div className="page-head">
        <span className="eyebrow eyebrow-dark">ПЛАЩАНЕ</span>
        <h1 className="display">Завърши поръчката</h1>
        <p><Link to="/cart" className="back-link">← Обратно към количката</Link></p>
      </div>

      <div className="checkout-grid">
        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
          {/* 1. Контакти */}
          <div className="panel">
            <h2><span className="step-no">1</span>Контакти</h2>
            <div className="form-row">
              <label className="field">
                <span>Име</span>
                <input type="text" name="firstName" autoComplete="given-name" placeholder="Иван" required />
              </label>
              <label className="field">
                <span>Фамилия</span>
                <input type="text" name="lastName" autoComplete="family-name" placeholder="Иванов" required />
              </label>
            </div>
            <div className="form-row">
              <label className="field">
                <span>Имейл</span>
                <input type="email" name="email" autoComplete="email" placeholder="ime@example.com" required />
              </label>
              <label className="field">
                <span>Телефон</span>
                <input type="tel" name="phone" autoComplete="tel" placeholder="0888 123 456" required />
              </label>
            </div>
          </div>

          {/* 2. Доставка */}
          <div className="panel">
            <h2><span className="step-no">2</span>Доставка</h2>
            <div className="opts" role="radiogroup" aria-label="Начин на доставка">
              {DELIVERY.map((d) => (
                <label key={d.id} className={`opt ${delivery === d.id ? 'on' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value={d.id}
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id)}
                  />
                  <span className="opt-text">
                    <b>{d.title}</b>
                    <small>{d.note}</small>
                  </span>
                  <span className="opt-price">
                    {freeShipping || d.fee === 0 ? 'Безплатна' : money(d.fee)}
                  </span>
                </label>
              ))}
            </div>

            {delivery !== 'store' && (
              <>
                <div className="form-row">
                  <label className="field">
                    <span>Град</span>
                    <input type="text" name="city" autoComplete="address-level2" placeholder="София" required />
                  </label>
                  <label className="field">
                    <span>Пощенски код</span>
                    <input type="text" name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="1000" required />
                  </label>
                </div>
                <label className="field">
                  <span>{delivery === 'office' ? 'Офис на куриера' : 'Адрес'}</span>
                  <input
                    type="text"
                    name="address"
                    autoComplete={delivery === 'office' ? 'off' : 'street-address'}
                    placeholder={delivery === 'office' ? 'Избери или напиши офис' : 'ул., №, вх., ет., ап.'}
                    required
                  />
                </label>
              </>
            )}

            {delivery === 'store' && (
              <p className="note">Ще получиш имейл с адреса и работното време на магазина.</p>
            )}
          </div>

          {/* 3. Плащане */}
          <div className="panel">
            <h2><span className="step-no">3</span>Начин на плащане</h2>
            <div className="opts" role="radiogroup" aria-label="Начин на плащане">
              <label className={`opt ${payment === 'card' ? 'on' : ''}`}>
                <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} />
                <span className="opt-text"><b>С карта</b><small>Visa, Mastercard</small></span>
              </label>
              <label className={`opt ${payment === 'cod' ? 'on' : ''}`}>
                <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                <span className="opt-text"><b>Наложен платеж</b><small>Плащаш при получаване</small></span>
              </label>
            </div>

            {payment === 'card' ? (
              <>
                <label className="field">
                  <span>Номер на картата</span>
                  <input type="text" name="cardNumber" autoComplete="cc-number" inputMode="numeric" maxLength={19} placeholder="0000 0000 0000 0000" required />
                </label>
                <label className="field">
                  <span>Име на картодържателя</span>
                  <input type="text" name="cardName" autoComplete="cc-name" placeholder="IVAN IVANOV" required />
                </label>
                <div className="form-row">
                  <label className="field">
                    <span>Валидна до</span>
                    <input type="text" name="cardExp" autoComplete="cc-exp" inputMode="numeric" maxLength={5} placeholder="ММ/ГГ" required />
                  </label>
                  <label className="field">
                    <span>CVC</span>
                    <input type="text" name="cardCvc" autoComplete="cc-csc" inputMode="numeric" maxLength={4} placeholder="123" required />
                  </label>
                </div>
              </>
            ) : (
              <p className="note">Плащаш в брой на куриера при получаване на пратката.</p>
            )}
          </div>

          <label className="check">
            <input type="checkbox" name="terms" required />
            <span>Прочетох и приемам <a href="#">Общите условия</a></span>
          </label>
        </form>

        <aside className="summary">
          <h2 className="display">Твоята поръчка</h2>

          <ul className="mini-list">
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name} <span className="mini-qty">× {item.qty}</span></span>
                <span>{money(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <dl className="sum-rows">
            <div><dt>Междинна сума</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Доставка</dt><dd>{shipping === 0 ? 'Безплатна' : money(shipping)}</dd></div>
          </dl>

          <div className="sum-total">
            <span>Общо</span>
            <strong>{money(total)}</strong>
          </div>

          <button type="submit" form="checkout-form" className="btn btn-clay">
            Потвърди поръчката
          </button>
          <p className="demo-note">Демо форма: плащането още не е свързано и поръчката не се изпраща.</p>
        </aside>
      </div>
    </section>
  );
}