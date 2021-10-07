package com.works.repositories;

import com.works.entities.Customer;
import com.works.entities.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Integer> {
    List<Test> findByStatus_Id(Integer id);

    @Query("SELECT t FROM Test t WHERE CONCAT(t.no, ' '," +
            " t.type.name, ' ', t.pet.name, ' ', t.pet.chipno, ' ', t.pet.cardno, ' ', t.pet.race.name, ' ', t.pet.spec.name, ' ', t.pet.color, ' ', t.pet.gender.name) LIKE %:key% AND t.status.id = :id")
    List<Test> searchTestByKeyAndId(@Param("key") String key, @Param("id") Integer id);

    @Query("SELECT t FROM Test t WHERE CONCAT(t.no, ' '," +
            " t.type.name, ' ', t.pet.name, ' ', t.pet.chipno, ' ', t.pet.cardno, ' ', t.pet.race.name, ' ', t.pet.spec.name, ' ', t.pet.color, ' ', t.pet.gender.name) LIKE %:key%")
    List<Test> searchTestByKey(@Param("key") String key);

}
