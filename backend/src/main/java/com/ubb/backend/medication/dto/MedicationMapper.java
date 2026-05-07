package com.ubb.backend.medication.dto;

import com.ubb.backend.medication.Medication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MedicationMapper {
    MedicationDTO toDTO(Medication entity);

    @Mapping(target = "id", ignore = true)
    Medication toEntity(MedicationDTO dto);
}
