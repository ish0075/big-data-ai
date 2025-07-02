CREATE TABLE buyers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  price_min DECIMAL,
  price_max DECIMAL,
  asset_type VARCHAR(50),
  location VARCHAR(100)
);

CREATE TABLE properties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  address TEXT,
  price DECIMAL,
  size_sf INT,
  units INT,
  acres DECIMAL,
  asset_type VARCHAR(50),
  status VARCHAR(20)
);
