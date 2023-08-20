package edu.denver.webenabled.shristi.lms;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoansController {

    private final LoansRepository loanRepository;

    private final BooksRepository bookRepository;

    private final UsersRepository userRepository;

    @PostMapping
    public Loan loanBook(@RequestBody LoanRequest loanRequest) {
        // Find the book by ID
        Book book = bookRepository.findById(loanRequest.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found with ID: " + loanRequest.getBookId()));

        // Find the user by ID
        User user = userRepository.findById(loanRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + loanRequest.getUserId()));

        if (book.getAvailable() == 0){
            throw new RuntimeException("Book not available at this time");
        }
        // Create a new loan
        Loan newLoan = new Loan();
        newLoan.setBook(book);
        newLoan.setUser(user);
        newLoan.setDateBorrowed(LocalDate.now());
        newLoan.setDueDate(newLoan.getDateBorrowed().plusDays(90));

        book.setAvailable(book.getAvailable() - 1);
        bookRepository.save(book);
        // Save the new loan
        return loanRepository.save(newLoan);
    }

    @PostMapping("/{id}")
    public Loan returnBook(@PathVariable Long loanId) {
        // Find the loan by ID
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new EntityNotFoundException("Loan not found with ID: " + loanId));

        // Mark the return date as the current date
        loan.setDateReturned(LocalDate.now());
        Book book = bookRepository.findById(loan.getBook().getBookId()).orElseThrow(() -> new EntityNotFoundException("Book doesn't belong to the library"));
        book.setAvailable(book.getAvailable() + 1);
        bookRepository.save(book);
        // Save the updated loan
        return loanRepository.save(loan);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleInternalServerError(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
