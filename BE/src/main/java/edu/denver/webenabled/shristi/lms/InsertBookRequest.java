package edu.denver.webenabled.shristi.lms;

import lombok.Data;

@Data
public class InsertBookRequest {
    private String title;
    private Integer genreId;
    private String author;
    private String isbn;
    private int yearPublished;
    private int available;
    private int total;
}
