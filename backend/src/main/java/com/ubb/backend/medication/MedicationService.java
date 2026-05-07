package com.ubb.backend.medication;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MedicationService {
    private final MedicationRepository medicationRepository;

    public Page<Medication> findAll(Pageable pageable) {
        return medicationRepository.findAll(pageable);
    }

    public Medication findById(UUID id) {
        return medicationRepository.findById(id).orElseThrow();
    }

    @Transactional
    public Medication save(Medication medication) {
        return medicationRepository.save(medication);
    }

    @Transactional
    public void deleteById(UUID id) {
        Medication medication = findById(id);
        medicationRepository.delete(medication);
    }

    @Transactional
    public Medication update(UUID id, Medication newMedication) {
        Medication existingMedication = findById(id);
        existingMedication.setName(newMedication.getName());
        return existingMedication;
    }
}
