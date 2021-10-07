package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.MERGE)
    private User doctor;

    @OneToOne(cascade = CascadeType.MERGE)
    private Customer customer;

    @OneToOne(cascade = CascadeType.MERGE)
    private Pet pet;

    @NotNull(message = "Randevu tarihi boş olamaz")
    private Date date;

}
