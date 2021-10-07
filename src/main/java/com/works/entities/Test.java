package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Data
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @NotNull(message = "Fatura numarası geçersiz")
    @NotEmpty(message = "Fatura numarası geçersiz")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String no;

    @Size(max = 500)
    @NotNull(message = "Test sonucu geçersiz")
    @NotEmpty(message = "Test sonucu geçersiz")
    private String result;

    @OneToOne(cascade = CascadeType.MERGE)
    private Pet pet;

    @OneToOne(cascade = CascadeType.MERGE)
    private TestType type;

    @OneToOne(cascade = CascadeType.MERGE)
    private TestStatus status;

}
