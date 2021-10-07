package com.works.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Spec {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @OneToOne
    private Race race;

}
