package com.works.repositories;

import com.works.entities.PayType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayTypeRepository extends JpaRepository<PayType, Integer> {
}
