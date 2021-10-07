package com.works.repositories;

import com.works.entities.CustomerGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerGroupRepository extends JpaRepository<CustomerGroup, Integer> {
}
