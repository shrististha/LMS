package edu.denver.webenabled.shristi.lms;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity(name="loans")
@Data
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;
    private LocalDate dueDate;
    private LocalDate dateBorrowed;
    private LocalDate dateReturned;
    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}