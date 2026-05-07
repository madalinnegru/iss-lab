package com.ubb.backend.medication_schedule;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MedicationScheduleService {
    private final MedicationScheduleRepository medicationScheduleRepository;

    //create, getById asta pentru update, getByUser, update, delete
    @Transactional
    public MedicationSchedule save(MedicationSchedule medicationSchedule) {
        return medicationScheduleRepository.save(medicationSchedule);
    }

    public MedicationSchedule findById(UUID id) {
        return medicationScheduleRepository.findById(id).orElseThrow();
    }

    public List<MedicationSchedule> findByUserId(UUID userId) {
        return medicationScheduleRepository.findByUserId(userId);
    }

    @Transactional
    public MedicationSchedule update(MedicationSchedule newMedicationSchedule) {
        MedicationSchedule existingMedication = findById(newMedicationSchedule.getId());
        existingMedication.setMedication(newMedicationSchedule.getMedication());
        existingMedication.setScheduledTimes(newMedicationSchedule.getScheduledTimes());
        return existingMedication;
    }

    @Transactional
    public void deleteById(UUID id) {
        medicationScheduleRepository.deleteById(id);
    }
}
