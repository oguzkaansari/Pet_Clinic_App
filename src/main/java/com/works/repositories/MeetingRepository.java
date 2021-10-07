package com.works.repositories;

import com.works.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    List<Meeting> findByDoctor_Id(Integer id);
}
