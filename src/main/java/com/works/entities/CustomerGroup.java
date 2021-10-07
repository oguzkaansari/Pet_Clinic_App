package com.works.entities;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Data
public class CustomerGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @Size(max = 50)
    @NotNull(message = "CustomerGroup Name Not Null")
    @NotEmpty(message = "CustomerGroup Name Not Empty")
    private String name;

    @Size(max = 500)
    @NotNull(message = "CustomerGroup Detail Not Null")
    @NotEmpty(message = "CustomerGroup Detail Not Empty")
    private String detail;

    private Integer count = 0;

    @OneToMany(cascade = CascadeType.MERGE)
    private Set<Customer> customers;

}
