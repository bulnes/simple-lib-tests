import Dinero from 'dinero.js';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, { condition, quantity }) => {
  if (condition?.percentage && quantity > condition.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, { condition, quantity }) => {
  if (condition?.quantity && quantity > condition.quantity) {
    const isEven = quantity % 2 === 0;
    const percentage = isEven ? 50 : 40;

    return amount.percentage(percentage);
  }

  return Money({ amount: 0 });
};

export const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(cond => {
      const item = { condition: cond, quantity };

      if (cond.percentage) {
        return calculatePercentageDiscount(amount, item).getAmount();
      }

      if (cond.quantity) {
        return calculateQuantityDiscount(amount, item).getAmount();
      }

      return Money({ amount: 0 }).getAmount();
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};
