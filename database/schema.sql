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

CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(255),
  city VARCHAR(100),
  province VARCHAR(100),
  price DECIMAL(12, 2),
  square_feet INT,
  price_per_sf DECIMAL(10, 2),
  asset_class VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
