package com.ubb.backend.medication_schedule;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MedicationScheduleRepository extends JpaRepository<MedicationSchedule, UUID> {
    List<MedicationSchedule> findByUserId(UUID userId);
}
