package edu.denver.webenabled.shristi.lms;

import lombok.Data;

@Data
public class InsertBookRequest {
    private String title;
    private Integer genreId;
}
