CREATE DATABASE snowcast;
\c snowcast

CREATE TABLE resorts(
  id SERIAL PRIMARY KEY,
  name TEXT,
  country TEXT,
  lat FLOAT,
  lon FLOAT,
  snowfall_today FLOAT,
  snowfall_1 FLOAT,
  snowfall_2 FLOAT,
  snowfall_3 FLOAT,
  snowfall_4 FLOAT,
  snowfall_5 FLOAT,
  snowfall_6 FLOAT,
  snowfall_7 FLOAT
);