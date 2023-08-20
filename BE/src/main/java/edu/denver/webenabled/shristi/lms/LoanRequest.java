package edu.denver.webenabled.shristi.lms;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LoanRequest {

    private Long bookId;
    private Long userId;
    private LocalDate dateBorrowed;
}
