package com.works.repositories;

import com.works.entities.TestType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestTypeRepository extends JpaRepository<TestType, Integer> {
}
