import { Cart } from './Cart';

describe('Cart', () => {
  let cart;

  let product = {
    title: 'Adidas shoes - men',
    price: 35388,
  };

  let product2 = {
    title: 'Adidas shoes - women',
    price: 40000,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 to empty product list', () => {
      expect(cart.getTotal().getAmount()).toBe(0);
    });

    it('should return the sum of all products and quantities', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toBe(70776);
    });

    it('should have one product at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toBe(70776);
    });

    it('should ensure that total get updated when a product is removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toBe(110776);

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toBe(40000);
    });
  });

  describe('remove()', () => {
    it('should throw an error when trying to remove a product that does not exist', () => {
      expect(() => cart.remove(product)).toThrow();
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should get an empty list of products after a checkout', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('summary()', () => {
    it('should return an object with the total and the items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.summary()).toMatchSnapshot();
    });

    it('should return an object with the formatted total', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.summary().formatted).toEqual('R$1,107.76');
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount quantity above minimum amount of products', () => {
      const condition = {
        percentage: 30, // 30%
        minimum: 2,
      };

      cart.add({
        product,
        quantity: 3,
        condition,
      });

      expect(cart.getTotal().getAmount()).toBe(74315);
    });

    it('should not apply percentage discount quantity above minimum amount of products', () => {
      const condition = {
        percentage: 30, // 30%
        minimum: 2,
      };

      cart.add({
        product,
        quantity: 2,
        condition,
      });

      expect(cart.getTotal().getAmount()).toBe(70776);
    });

    it('should apply 50% percentage discount quantity above minimum amount of products', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        quantity: 4,
        condition,
      });

      expect(cart.getTotal().getAmount()).toBe(70776);
    });

    it('should not apply 50% percentage discount quantity above minimum amount of products', () => {
      const condition = {
        quantity: 3,
      };

      cart.add({
        product,
        quantity: 3,
        condition,
      });

      expect(cart.getTotal().getAmount()).toBe(106164);
    });

    it('should apply 40% percentage discount quantity is odd', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        quantity: 5,
        condition,
      });

      expect(cart.getTotal().getAmount()).toBe(106164);
    });

    it('should apply higher percentage of discount. First case.', () => {
      const condition1 = {
        percentage: 30, // 30%
        minimum: 2,
      };

      const condition2 = {
        quantity: 2, // 40%
      };

      cart.add({
        product,
        quantity: 5,
        condition: [condition1, condition2],
      });

      expect(cart.getTotal().getAmount()).toBe(106164);
    });

    it('should apply higher percentage of discount. Second case.', () => {
      const condition1 = {
        percentage: 50, // 50%
        minimum: 2,
      };

      const condition2 = {
        quantity: 2, // 40%
      };

      cart.add({
        product,
        quantity: 5,
        condition: [condition1, condition2],
      });

      expect(cart.getTotal().getAmount()).toBe(88470);
    });

    it('should apply higher percentage of discount. Thrid case.', () => {
      const condition1 = {};

      const condition2 = {};

      cart.add({
        product,
        quantity: 5,
        condition: [condition1, condition2],
      });

      expect(cart.getTotal().getAmount()).toBe(176940);
    });
  });
});
