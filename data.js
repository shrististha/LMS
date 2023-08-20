const baseUrl = 'http://localhost:8080';

// Function to fetch and display books
async function getBooks() {
  try {
    const response = await fetch(`${baseUrl}/books`);
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const books = await response.json();
    console.log(books)
    localStorage.setItem('books', JSON.stringify(books));
    console.log(localStorage)
    return books;
  } catch (error) {
    console.log(error)
  }
}
