import { S3 } from 'aws-sdk';

const s3 = new S3();
const S3_BUCKET = 'restaurant-finder-api';

export const uploadImage = async (restaurantName, photoUrl) => {
  const base64 = Buffer.from(
    photoUrl.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  await s3
    .putObject({
      ACL: 'public-read',
      Bucket: S3_BUCKET,
      Key: `${restaurantName}-photo`,
      Body: base64,
      ContentEncoding: 'base64',
      ContentType: `image/jpeg`
    })
    .promise();
};
