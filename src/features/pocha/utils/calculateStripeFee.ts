const calculateStripeFee = (amount: number) => {
  // calculate fee based on the amount
  return parseFloat((0.45 + amount * 0.029).toFixed(2));
};

const calculateStripeTotalPrice = (amount: number) => {
  return parseFloat((amount + calculateStripeFee(amount)).toFixed(2));
};

export { calculateStripeFee, calculateStripeTotalPrice };
