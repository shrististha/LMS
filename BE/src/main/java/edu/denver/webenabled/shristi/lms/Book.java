package edu.denver.webenabled.shristi.lms;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name="books")
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;
    private String title;
    private String author;
    private String isbn;
    private int yearPublished;
    private int available;
    private int total;
    @ManyToOne
    @JoinColumn(name = "genre_id", nullable = false)
    private Genre genre;

}
