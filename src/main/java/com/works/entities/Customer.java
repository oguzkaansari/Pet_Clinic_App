package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @NotNull(message = "Müşteri numarası geçersiz")
    @NotEmpty(message = "Müşteri numarası geçersiz")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String no;

    @Size(max = 50)
    @NotNull(message = "Customer Name Not Null")
    @NotEmpty(message = "Customer Name Not Empty")
    private String name;

    @Size(max = 50)
    @NotNull(message = "Customer Surname Not Null")
    @NotEmpty(message = "Customer Surname Not Empty")
    private String surname;

    @Column(unique = true)
    @NotNull(message = "Customer Phone1 Not Null")
    @NotEmpty(message = "Customer Phone1 Not Empty")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phone1;

    @Column(unique = true)
    @NotNull(message = "Customer Phone2 Not Null")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phone2;

    @Column(unique = true)
    @Size(max = 50)
    @NotNull(message = "Customer Mail Not Null")
    @NotEmpty(message = "Customer Mail Not Empty")
    @Pattern(regexp="(^(.+)@(.+)$)")
    private String mail;

    @Column(unique = true)
    @NotNull(message = "Customer Tax No Not Null")
    @NotEmpty(message = "Customer Tax No Not Empty")
    @Pattern(regexp="(^$|[0-9]{11})")
    private String taxno;

    @Size(max = 50)
    @NotNull(message = "Customer Tax Name Not Null")
    @NotEmpty(message = "Customer Tax Name Not Empty")
    private String taxname;

    @Size(max = 50)
    @NotNull(message = "Customer City Not Null")
    @NotEmpty(message = "Customer City Not Empty")
    private String city;

    @Size(max = 50)
    @NotNull(message = "Customer District Not Null")
    @NotEmpty(message = "Customer District Not Empty")
    private String district;

    @Size(max = 100)
    @NotNull(message = "Customer Address Not Null")
    @NotEmpty(message = "Customer Address Not Empty")
    private String address;

    @Size(max = 500)
    private String note;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "100.0")
    @NotNull(message = "Customer Discount Not Null")
    private BigDecimal discount;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<@Valid Pet> pets;

    @OneToOne(cascade = CascadeType.MERGE)
    private ActiveStatus status;

}
