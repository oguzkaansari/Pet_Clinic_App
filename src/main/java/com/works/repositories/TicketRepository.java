package com.works.repositories;

import com.works.entities.Sale;
import com.works.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByStatus_Id(Integer id);
    List<Ticket> findBySupplier_Id(Integer id);

    @Query("SELECT t FROM Ticket t WHERE CONCAT(t.no, ' '," +
            " t.title, ' ', t.note, ' ', t.supplier.name) LIKE %:key%")
    List<Ticket> searchTicketByKey(@Param("key") String key);
}
