export interface IReview {
  id?: string;
  name: string;
  review: string;
  rating: number;
}

export { default as ReviewsList } from './ReviewsList';
export { default as Review } from './Review';
export { default as AddReviewDialog } from './AddReviewDialog';
