import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { useCart } from '../context/CartContext';
import { money, FREE_SHIPPING_FROM } from '../utils/money';

const TINTS = [
  'linear-gradient(135deg, #f1dca7, #ffcb69)',
  'linear-gradient(135deg, #ffffff, #f1dca7)',
  'linear-gradient(135deg, #d9ae94, #f1dca7)',
  'linear-gradient(135deg, #ffcb69, #e8ac65)',
];

export default function Cart() {
  const { items, count, subtotal, setQty, removeItem, MAX_QTY } = useCart();

  if (items.length === 0) {
    return (
      <section className="wrap section simple-page">
        <span className="eyebrow eyebrow-dark">КОЛИЧКА</span>
        <h1>Количката е празна</h1>
        <p>Добави инструменти от магазина или от Marketplace.</p>
        <Link to="/shop" className="btn btn-clay">Към магазина</Link>
      </section>
    );
  }

  const left = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  return (
    <section className="wrap section shop-flow">
      <div className="page-head">
        <span className="eyebrow eyebrow-dark">КОЛИЧКА</span>
        <h1 className="display">Твоята количка</h1>
        <p>{count} {count === 1 ? 'продукт' : 'продукта'}</p>
      </div>

      <div className="cart-grid">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-thumb" style={{ background: TINTS[item.tint % TINTS.length] }}>
                <Icon name={item.kind} size={56} />
              </div>

              <div className="cart-info">
                <span className="card-meta">{item.meta}</span>
                <h3 className="cart-name">{item.name}</h3>
                <span className="cart-unit">{money(item.price)} / бр.</span>
                <button type="button" className="link-btn" onClick={() => removeItem(item.id)}>
                  Премахни
                </button>
              </div>

              <div className="cart-buy">
                <div className="qty" role="group" aria-label={`Количество: ${item.name}`}>
                  <button
                    type="button"
                    aria-label="Намали количеството"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                  >
                    −
                  </button>
                  <output aria-live="polite">{item.qty}</output>
                  <button
                    type="button"
                    aria-label="Увеличи количеството"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    disabled={item.qty >= MAX_QTY}
                  >
                    +
                  </button>
                </div>
                <strong className="cart-line">{money(item.price * item.qty)}</strong>
              </div>
            </article>
          ))}
        </div>

        <aside className="summary">
          <h2 className="display">Обобщение</h2>

          <div className="free-ship">
            <p>
              {left === 0
                ? 'Имаш безплатна доставка.'
                : `Остават още ${money(left)} до безплатна доставка.`}
            </p>
            <div className="bar" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
          </div>

          <dl className="sum-rows">
            <div><dt>Междинна сума</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Доставка</dt><dd>{left === 0 ? 'Безплатна' : 'Изчислява се при плащане'}</dd></div>
          </dl>

          <div className="sum-total">
            <span>Общо</span>
            <strong>{money(subtotal)}</strong>
          </div>

          <Link to="/checkout" className="btn btn-clay">Към плащане</Link>
          <Link to="/shop" className="sum-link">Продължи пазаруването</Link>
        </aside>
      </div>
    </section>
  );
}