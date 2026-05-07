package com.ubb.backend.medication_schedule.dto;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public record MedicationScheduleDTO(
        UUID id,
        UUID userId,
        UUID medicationId,
        List<LocalTime> scheduledTimes
) {}