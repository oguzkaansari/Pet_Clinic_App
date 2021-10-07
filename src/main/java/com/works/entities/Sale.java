package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
@Data
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.MERGE)
    private Product product;

    @OneToOne(cascade = CascadeType.MERGE)
    private Receipt receipt;

    @DecimalMin(value = "0.0", message = "Reçete ücreti geçersiz!")
    private BigDecimal amount;

    @Size(max = 500)
    private String note;

}
