package com.works.repositories;

import com.works.entities.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {
    List<Receipt> findByStatus_Id(Integer id);
    List<Receipt> findByCustomer_IdAndStatus_Id(Integer id, Integer id1);
}
