package com.works.repositories;

import com.works.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    List<Customer> findByStatus_Id(Integer id);
    @Query("SELECT c FROM Customer c WHERE CONCAT(c.no, ' '," +
            " c.name, ' ', c.surname, ' ', c.phone1, ' ', c.phone2, ' ', c.mail, ' ', c.taxno, ' ', c.taxname) LIKE %:key% AND c.status.id = :id")
    List<Customer> searchCustomerByKeyAndId(@Param("key") String key, @Param("id") Integer id);

    @Query("SELECT c FROM Customer c WHERE CONCAT(c.no, ' '," +
            " c.name, ' ', c.surname, ' ', c.phone1, ' ', c.phone2, ' ', c.mail, ' ', c.taxno, ' ', c.taxname) LIKE %:key%")
    List<Customer> searchCustomerByKey(@Param("key") String key);

}
