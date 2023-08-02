const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");

// Filter books based on search query. Either checks title or author from the search query
function filterBooks(query) {
    const filteredBooks = window.books.filter((book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const isbn = book.isbn.toLowerCase();

        const searchTerm = query.toLowerCase();
        return title.includes(searchTerm) || author.includes(searchTerm) || isbn.includes(searchTerm);
    });

    return filteredBooks;
}

// Loads filtered books into HTML in bookList
function renderFilteredBooks(query) {
    const filteredBooks = filterBooks(query);
    bookList.innerHTML = '';

    if (filteredBooks.length === 0) {
        bookList.innerHTML = '<li class="no-results">No results found</li>';
        return;
    }

    filteredBooks.forEach((book) => {
        const bookItem = document.createElement("li");
        bookItem.className = "book-item";
        bookItem.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title}" class="book-thumbnail">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">Author: ${book.author}</p>
            </div>
        `;
         bookItem.addEventListener("click", () => {
            window.location.href = `details.html?id=${book.id}`;
        });
        bookList.appendChild(bookItem);
    });
}

// Navigates to the details page with bookId as a query parameter
function handleBookItemClick(event) {
    const bookId = event.target.dataset.bookId;
    if (bookId) {
        window.location.href = `details.html?id=${encodeURIComponent(bookId)}`;
    }
}

// Event listener for search input box. Search is triggered on type event
searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    renderFilteredBooks(searchQuery);
});

// Event listener for book item click
window.addEventListener("load", () => {
    bookList.addEventListener("click", handleBookItemClick);
});

// Show all the books with empty search query
renderFilteredBooks('');
