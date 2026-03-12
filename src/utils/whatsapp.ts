export const formatWhatsApp = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    let formatted = numbers;
    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length > 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return formatted;
  }
  return value.slice(0, 15);
};

export const validateWhatsApp = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length >= 10 && numbers.length <= 11;
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
