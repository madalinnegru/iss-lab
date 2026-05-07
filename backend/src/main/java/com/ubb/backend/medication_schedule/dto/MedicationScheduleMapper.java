package com.ubb.backend.medication_schedule.dto;

import com.ubb.backend.medication_schedule.MedicationSchedule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MedicationScheduleMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "medication.id", target = "medicationId")
    MedicationScheduleDTO toDTO(MedicationSchedule entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "medicationId", target = "medication.id")
    MedicationSchedule toEntity(MedicationScheduleDTO dto);
}