const displayPriceRange = (range: number) => {
  let priceDisplay = '';

  for (let i = 1; i <= range; i++) {
    priceDisplay += '$';
  }
  return priceDisplay;
};

export default displayPriceRange;
