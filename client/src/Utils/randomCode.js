export const generateRandomCode = (prefix, digits) => {
  const maxNumber = Math.pow(10, digits) - 1;
  const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
  const paddedNumber = String(randomNumber).padStart(digits, "0");
  return `${prefix}-${paddedNumber}`;
};
