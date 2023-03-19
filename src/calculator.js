export function sum(a, b) {
  const num1 = Number(a);
  const num2 = Number(b);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    throw new Error('One of the parameters is not a number');
  }

  return num1 + num2;
}
