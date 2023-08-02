const bookDetailsTable = document.querySelector(".book-details");
const loanButton = document.getElementById("loanButton");
const dateFromInput = document.getElementById("dateFrom");

// Get book id from the request URL
function getBookIdFromQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

// Get book details by book id
function getBookById(bookId) {
    return window.books.find(book => book.id.toString() === bookId.toString());
}

// Populate HTML table data
function renderBookDetails() {
    const bookId = getBookIdFromQueryString();
    const book = getBookById(bookId);

    if (book) {
        bookDetailsTable.innerHTML = '';

        const tableRows = [
            { label: 'Title', value: book.title },
            { label: 'Author', value: book.author },
            { label: 'Release Year', value: book.releaseYear },
            { label: 'Description', value: book.description },
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
function loanBook() {
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

    const successMessage = `You have successfully requested to loan the book with the following details:
    Membership ID: ${membershipId}
    Date From: ${dateFromInput.value}. 
    Please return the book to the library after 90 days for renewal/return.`;
    
    alert(successMessage);
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
