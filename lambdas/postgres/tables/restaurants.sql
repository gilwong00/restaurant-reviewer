BEGIN TRANSACTION;

CREATE TABLE restaurants (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(250) NOT NULL,
	price_range INT,
	date_added timestamp NOT NULL
);

COMMIT;