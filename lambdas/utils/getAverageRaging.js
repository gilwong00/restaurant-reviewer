export const getAverageRating = restaurant => {
  const round = value => {
    const inv = 1.0 / 0.5;
    return Math.round(value * inv) / inv;
  };

  const reviewTotal = restaurant.reviews.reduce(
    (acc, value) => (acc += value.rating),
    0
  );

  return round(reviewTotal / restaurant.reviews.length);
};
