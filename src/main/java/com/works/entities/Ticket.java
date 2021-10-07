package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Data
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @NotNull(message = "Fatura numarası geçersiz")
    @NotEmpty(message = "Fatura numarası geçersiz")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String no;

    @Size(max = 50)
    private String title;

    @DecimalMin(value = "0.0", message = "Fatura ücreti geçersiz!")
    private BigDecimal price;

    @Size(max = 500)
    private String note;

    @OneToOne(cascade = CascadeType.MERGE)
    private Supplier supplier;

    @OneToOne(cascade = CascadeType.MERGE)
    private PayStatus status;

}
