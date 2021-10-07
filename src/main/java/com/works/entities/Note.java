package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Data
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 50)
    @NotNull(message = "Not geçersiz")
    @NotEmpty(message = "Not geçersiz")
    private String title;

    @Size(max = 500)
    @NotNull(message = "Not geçersiz")
    @NotEmpty(message = "Not geçersiz")
    private String note;

    @NotNull(message = "Not geçersiz")
    private LocalTime hour;

    @NotNull(message = "Randevu tarihi boş olamaz")
    private Date date;

    @OneToOne(cascade = CascadeType.MERGE)
    private User user;
}
