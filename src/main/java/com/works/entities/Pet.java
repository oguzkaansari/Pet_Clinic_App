package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 50)
    @NotNull(message = "Pet Name Not Null")
    @NotEmpty(message = "Pet Name Not Empty")
    private String name;

    @Column(unique = true)
    @NotNull(message = "Pet Chip No Not Null")
    @NotEmpty(message = "Pet Chip No Not Empty")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String chipno;

    @Column(unique = true)
    @NotNull(message = "Pet Card No Not Null")
    @NotEmpty(message = "Pet Card No Not Empty")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String cardno;

    @Size(max = 50)
    @NotNull(message = "Pet Color Not Null")
    @NotEmpty(message = "Pet Color Not Empty")
    private String color;

    @NotNull(message = "Pet Birthdate Not Null")
    private Date birthdate;

    @NotNull(message = "Pet Spayed Not Null")
    private boolean has_spayed;

    @OneToOne(cascade = CascadeType.MERGE)
    private Race race;

    @OneToOne(cascade = CascadeType.MERGE)
    private Spec spec;

    @OneToOne(cascade = CascadeType.MERGE)
    private Gender gender;
}
