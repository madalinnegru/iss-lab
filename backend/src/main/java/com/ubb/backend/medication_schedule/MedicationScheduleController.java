package com.ubb.backend.medication_schedule;

import com.ubb.backend.medication_schedule.dto.MedicationScheduleDTO;
import com.ubb.backend.medication_schedule.dto.MedicationScheduleMapper;
import com.ubb.backend.user.User;
import com.ubb.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/medication_schedule")
public class MedicationScheduleController {
    private final MedicationScheduleService medicationScheduleService;
    private final MedicationScheduleMapper medicationScheduleMapper;
    private final UserService userService;

    @GetMapping("/{id}")
    public MedicationScheduleDTO getById(@PathVariable UUID id) {
        MedicationSchedule medicationSchedule = medicationScheduleService.findById(id);
        return medicationScheduleMapper.toDTO(medicationSchedule);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("#userId == authentication.principal.id")
    public List<MedicationScheduleDTO> getByUserId(@PathVariable UUID userId) {
        List<MedicationSchedule> medicationSchedules = medicationScheduleService.findByUserId(userId);
        return medicationSchedules.stream()
                .map(medicationScheduleMapper::toDTO)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("#medicationScheduleDTO.userId == authentication.principal.id")
    public MedicationScheduleDTO create(@RequestBody MedicationScheduleDTO medicationScheduleDTO) {
        MedicationSchedule medicationSchedule = medicationScheduleMapper.toEntity(medicationScheduleDTO);
        MedicationSchedule saved = medicationScheduleService.save(medicationSchedule);
        return medicationScheduleMapper.toDTO(saved);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("#medicationScheduleDTO.userId == authentication.principal.id")
    public MedicationScheduleDTO update(@PathVariable UUID id,
                                        @RequestBody MedicationScheduleDTO medicationScheduleDTO,
                                        Authentication authentication) {

        User currentUser = (User) authentication.getPrincipal();

        MedicationSchedule existingSchedule = medicationScheduleService.findById(id);

        if (!existingSchedule.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You don't have permission to update this schedule");
        }

        existingSchedule.setId(id);
        existingSchedule.setScheduledTimes(medicationScheduleDTO.scheduledTimes());

        MedicationSchedule updated = medicationScheduleService.update(existingSchedule);
        return medicationScheduleMapper.toDTO(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        MedicationSchedule medicationSchedule = medicationScheduleService.findById(id);

        if(!medicationSchedule.getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        medicationScheduleService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
