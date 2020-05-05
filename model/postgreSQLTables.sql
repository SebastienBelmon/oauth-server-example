-- create a DB with these tables (I named the db 'auth')

CREATE TABLE clients (
  id SERIAL UNIQUE primary key,
  client_id varchar UNIQUE,
  client_secret varchar,
  data_uris varchar[],
  grants varchar[]
);

CREATE TABLE users (
  id SERIAL UNIQUE primary key
  -- + anything else you want or need for your server
);

CREATE TABLE authorizationcodes (
  authorization_code varchar primary key,
  expires_at DATE,
  redirect_uri varchar,
  client_id int references Clients(id),
  user_id int references Users(id)
);

CREATE TABLE tokens (
  access_token varchar primary key,
  access_token_expires_at DATE,
  client_id int references Clients(id),
  user_id int references Users(id)
);
