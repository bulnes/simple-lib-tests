import Dinero from 'dinero.js';
import { calculateDiscount } from './discount.utils';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export class Cart {
  items = [];

  add(item) {
    const productToFind = item.product;
    const itemIndex = this.items.findIndex(item => {
      return item.product.title === productToFind.title;
    });

    if (itemIndex === -1) {
      this.items.push(item);
    }
  }

  remove(product) {
    const itemIndex = this.items.findIndex(item => {
      return item.product.title === product.title;
    });

    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    } else {
      throw new Error('Product not found');
    }
  }

  getTotal() {
    return this.items.reduce((total, { product, condition, quantity }) => {
      const amount = Money({ amount: product.price * quantity });

      const discount = condition
        ? calculateDiscount(amount, quantity, condition)
        : Money({ amount: 0 });

      return total.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal().getAmount();
    const formatted = this.getTotal().toFormat('$0,0.00');
    const items = this.items;

    return { total, formatted, items };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return { total, items };
  }
}
