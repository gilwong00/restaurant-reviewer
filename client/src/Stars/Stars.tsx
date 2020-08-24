import React from 'react';
import styled from 'styled-components';

const FilledStar = styled.i`
  color: darkorange;
`;

interface IProps {
  averageRating: number;
}

const Stars: React.FC<IProps> = ({ averageRating }) => {
  const stars = [];

  for (let i = 1; i < 5; i++) {
    if (i <= averageRating) {
      stars.push(
        <FilledStar key={i} className='fas fa-star text-warning'></FilledStar>
      );
    } else if (
      i === Math.ceil(averageRating) &&
      !Number.isInteger(averageRating)
    ) {
      stars.push(
        <FilledStar
          key={i}
          className='fas fa-star-half-alt text-warning'
        ></FilledStar>
      );
    } else {
      stars.push(<i key={i} className='far fa-star text-warning'></i>);
    }
  }
  return <>{stars}</>;
};

export default Stars;
