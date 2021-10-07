package com.works.repositories;

import com.works.entities.Customer;
import com.works.entities.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    List<Sale> findByReceipt_Id(Integer id);

    @Query("SELECT s FROM Sale s WHERE CONCAT(s.product.name, ' '," +
            " s.product.code, ' ', s.product.barcode, ' ', s.receipt.no, ' ', s.receipt.customer.name, ' ', s.receipt.customer.surname, ' ', s.product.category.name) LIKE %:key%")
    List<Sale> searchSaleByKey(@Param("key") String key);
}
