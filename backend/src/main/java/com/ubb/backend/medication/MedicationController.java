package com.ubb.backend.medication;

import com.ubb.backend.medication.dto.MedicationDTO;
import com.ubb.backend.medication.dto.MedicationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/medications")
public class MedicationController {
    private final MedicationService medicationService;
    private final MedicationMapper medicationMapper;

    @GetMapping
    public Page<MedicationDTO> findAll(Pageable pageable) {
        return medicationService.findAll(pageable).map(medicationMapper::toDTO);
    }

    @GetMapping("/{id}")
    public MedicationDTO findOne(@PathVariable UUID id) {
        Medication medication = medicationService.findById(id);
        return medicationMapper.toDTO(medication);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicationDTO save(@RequestBody MedicationDTO medicationDTO) {
        Medication medication = medicationMapper.toEntity(medicationDTO);
        Medication savedMedication = medicationService.save(medication);
        return medicationMapper.toDTO(savedMedication);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable UUID id) {
        medicationService.deleteById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MedicationDTO update(@PathVariable UUID id, @RequestBody MedicationDTO medicationDTO) {
        Medication medication = medicationMapper.toEntity(medicationDTO);
        medication.setId(id);
        Medication updatedMedication = medicationService.update(id, medication);
        return medicationMapper.toDTO(updatedMedication);

    }
}
