\c library_management;

INSERT INTO genres (genre_id, genre_name) VALUES
  (1, 'Fiction'),
  (2, 'Science Fiction'),
  (3, 'Mystery'),
  (4, 'History'),
  (5, 'Biography');

INSERT INTO users (user_id, username, is_admin) VALUES
  (1234567890, 'john_doe', false),
  (9876543210, 'jane_smith', false),
  (1234543210, 'admin_me', false);

INSERT INTO books (book_id, title, author, isbn, year_published, available, total, genre_id) VALUES
  (1, 'To Kill a Mockingbird', 'Harper Lee', '978-0061120084', 1960, 5, 10, 1),
  (2, '1984', 'George Orwell', '978-0451524935', 1949, 3, 5, 2),
  (3, 'The Da Vinci Code', 'Dan Brown', '978-0307474278', 2003, 7, 8, 3),
  (4, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '978-0062316097', 2014, 4, 6, 4),
  (5, 'Becoming', 'Michelle Obama', '978-1524763138', 2018, 6, 9, 5);

INSERT INTO loans (loan_id, date_borrowed, due_date, date_returned, book_id, user_id) VALUES
  (1, '2023-08-01', '2023-08-15', NULL, 1, 1234567890),
  (2, '2023-08-02', '2023-08-16', NULL, 3, 9876543210),
  (3, '2023-08-03', '2023-08-17', NULL, 2, 1234567890),
  (4, '2023-08-04', '2023-08-18', NULL, 4, 9876543210),
  (5, '2023-08-05', '2023-08-19', NULL, 5, 1234567890);

