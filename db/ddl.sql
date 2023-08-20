CREATE DATABASE library_management;

--  Connect to the database
\c library_management; 

CREATE TABLE IF NOT EXISTS genres (
  genre_id INTEGER PRIMARY KEY,
  genre_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  book_id BIGINT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(20) NOT NULL,
  year_published INTEGER,
  available INTEGER,
  total INTEGER,
  genre_id INTEGER REFERENCES genres(genre_id)
);

CREATE TABLE IF NOT EXISTS users (
  user_id BIGINT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS loans (
  loan_id BIGINT PRIMARY KEY,
  book_id BIGINT REFERENCES books(book_id),
  user_id BIGINT REFERENCES users(user_id),
  date_borrowed DATE NOT NULL,
  due_date DATE NOT NULL,
  date_returned DATE
);

create sequence loan_id_seq;
alter table loans alter loan_id set default nextval('loan_id_seq');
select setval('loan_id_seq', 5);

create sequence book_id_seq;
alter table books alter book_id set default nextval('book_id_seq');
select setval('book_id_seq', 5);
