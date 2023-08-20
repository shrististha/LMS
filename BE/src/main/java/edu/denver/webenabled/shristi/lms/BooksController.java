package edu.denver.webenabled.shristi.lms;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BooksController {

    private final BooksRepository bookRepository;
    private final GenresRepository genreRepository;

    @PostMapping
    public Book addBook(@RequestBody InsertBookRequest bookRequest) {
        // Create a new book object from the request
        Book newBook = new Book();
        newBook.setTitle(bookRequest.getTitle());

        // Find the genre by ID in the request and set it to the book
        Genre genre = genreRepository.findById(bookRequest.getGenreId())
                .orElseThrow(() -> new EntityNotFoundException("Genre not found with ID: " + bookRequest.getGenreId()));
        newBook.setGenre(genre);

        // Return the saved book
        return bookRepository.save(newBook);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @ExceptionHandler
    public ResponseEntity<String> handleInternalServerError(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
