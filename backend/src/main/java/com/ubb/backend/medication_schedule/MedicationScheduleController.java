package com.ubb.backend.medication_schedule;

import com.ubb.backend.medication_schedule.dto.MedicationScheduleDTO;
import com.ubb.backend.medication_schedule.dto.MedicationScheduleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/medication_schedule")
public class MedicationScheduleController {
    private final MedicationScheduleService medicationScheduleService;
    private final MedicationScheduleMapper medicationScheduleMapper;

    @GetMapping("/{id}")
    public MedicationScheduleDTO getById(@PathVariable UUID id) {
        MedicationSchedule medicationSchedule = medicationScheduleService.findById(id);
        return medicationScheduleMapper.toDTO(medicationSchedule);
    }

    @GetMapping("/user/{userId}")
    public List<MedicationScheduleDTO> getByUserId(@PathVariable UUID userId) {
        List<MedicationSchedule> medicationSchedules = medicationScheduleService.findByUserId(userId);
        return medicationSchedules.stream()
                .map(medicationScheduleMapper::toDTO)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicationScheduleDTO create(@RequestBody MedicationScheduleDTO medicationScheduleDTO) {
        MedicationSchedule medicationSchedule = medicationScheduleMapper.toEntity(medicationScheduleDTO);
        MedicationSchedule saved = medicationScheduleService.save(medicationSchedule);
        return medicationScheduleMapper.toDTO(saved);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public MedicationScheduleDTO update(@PathVariable UUID id, @RequestBody MedicationScheduleDTO medicationScheduleDTO) {
        MedicationSchedule medicationSchedule = medicationScheduleMapper.toEntity(medicationScheduleDTO);
        medicationSchedule.setId(id);
        MedicationSchedule updated =  medicationScheduleService.update(medicationSchedule);
        return medicationScheduleMapper.toDTO(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable UUID id) {
        medicationScheduleService.deleteById(id);
    }
}
