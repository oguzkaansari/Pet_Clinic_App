package com.works.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
}
