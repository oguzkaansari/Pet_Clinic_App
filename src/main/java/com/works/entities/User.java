package com.works.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 50)
    @NotNull(message = "User Name is Null")
    @NotEmpty(message = "User Name is Empty")
    private String name;

    @Column(unique = true)
    @NotNull(message = "User Phone is Null")
    @NotEmpty(message = "User Phone is Empty")
    @Pattern(regexp="(^$|[0-9]{10})", message = "Telefon nuamrası geçersiz")
    private String phone;

    @Column(unique = true)
    @Size(max = 50)
    @NotNull(message = "User E-Mail is Null")
    @NotEmpty(message = "User E-Mail is Empty")
    @Pattern(regexp="(^(.+)@(.+)$)", message = "E-Mail tipi geçersiz")
    private String email;

    @Column(unique = true)
    private String img;

    @OneToOne(cascade = CascadeType.MERGE)
    private Role role;

    @OneToOne(cascade = CascadeType.MERGE)
    private ActiveStatus status;

    @NotNull(message = "User Image is Null")
    @NotEmpty(message = "User Image is Empty")
    private String password;

    private boolean enabled;
    private boolean tokenExpired;
}
