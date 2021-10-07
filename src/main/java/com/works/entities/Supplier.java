package com.works.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Data
@JsonIgnoreProperties("ticket")

public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @Size(max = 50)
    @NotNull(message = "Tedarikçi Adı Geçersiz")
    @NotEmpty(message = "Tedarikçi Adı Geçersiz")
    private String name;

    @Column(unique = true)
    @Size(max = 50)
    @NotNull(message = "Tedarikçi Maili Geçersiz")
    @NotEmpty(message = "Tedarikçi Maili Geçersiz")
    @Pattern(regexp="(^(.+)@(.+)$)")
    private String mail;

    @Column(unique = true)
    @NotNull(message = "Tedarikçi Telefonu Geçersiz")
    @NotEmpty(message = "Tedarikçi Telefonu Geçersiz")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phone;


}
