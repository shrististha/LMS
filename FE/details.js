const bookDetailsTable = document.querySelector(".book-details");
const loanButton = document.getElementById("loanButton");
const dateFromInput = document.getElementById("dateFrom");
const thumbnailImg = document.getElementById("thumbnail");
const availableText = document.getElementById("availability");

// Get book id from the request URL
function getBookIdFromQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

// Get book details by book id
function getBookById(bookId) {
    const books = JSON.parse(localStorage.getItem('books'));
    
    return books.find(book => book.bookId.toString() === bookId.toString());
}

// Populate HTML table data
function renderBookDetails() {
    const bookId = getBookIdFromQueryString();
    const book = getBookById(bookId);
    console.log(book);
    if (book) {
        bookDetailsTable.innerHTML = '';
        thumbnailImg.src = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
         // Display availability information
         availableText.textContent = `Available Copies: ${book.available} out of ${book.total}`;

        // Disable date input and loan button if the book is not available
        if (book.available === 0) {
            dateFromInput.disabled = true;
            loanButton.disabled = true;
        }

        const tableRows = [
            { label: 'ISBN', value: book.isbn },
            { label: 'Title', value: book.title },
            { label: 'Author', value: book.author },
            { label: 'Release Year', value: book.yearPublished },
            { label: 'Genre', value: book.genre.genreName },
        ];

        tableRows.forEach((row) => {
            const tableRow = document.createElement('tr');
            const tableDataLabel = document.createElement('td');
            const tableDataValue = document.createElement('td');

            tableDataLabel.textContent = row.label;
            tableDataValue.textContent = row.value;

            tableRow.appendChild(tableDataLabel);
            tableRow.appendChild(tableDataValue);

            bookDetailsTable.appendChild(tableRow);
        });
    }
}

// Pops up details when loan book button is clicked
async function loanBook() {
    const bookId = getBookIdFromQueryString();
    const membershipId = prompt("Please enter your membership ID:");
    
    if (membershipId === null || membershipId.trim() === "") {
        alert("Membership ID is required to loan the book.");
        return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(membershipId)) {
        alert("Invalid membership ID. Please enter a valid 10-digit phone number.");
        return;
    }
    try {
        const response = await fetch('http://localhost:8080/loans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: membershipId,
                bookId: bookId,
                dateBorrowed: dateFromInput.value
            })
        });

        if (response.ok) {
            const successMessage = `You have successfully requested to loan the book with the following details:
            Membership ID: ${membershipId}
            Date From: ${dateFromInput.value}. 
            Please return the book to the library after 90 days for renewal/return.`;
            
            alert(successMessage);
        } else {
            response.text().then(text => {
                console.log(text)
                alert(text);
            })
            
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }

}


const today = new Date().toISOString().split("T")[0];
dateFromInput.setAttribute("min", today);

loanButton.addEventListener("click", loanBook);

// Enable the loan button when the date is selected
dateFromInput.addEventListener("change", () => {
    const dateFrom = dateFromInput.value;
    loanButton.disabled = !dateFrom;
});

renderBookDetails();
