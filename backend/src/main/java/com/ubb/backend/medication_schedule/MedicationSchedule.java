package com.ubb.backend.medication_schedule;

import com.ubb.backend.medication.Medication;
import com.ubb.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "medication_schedule")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicationSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "medication_id", nullable = false)
    private Medication medication;

    // Orele la care se ia medicamentul zilnic
    @ElementCollection
    @CollectionTable(name = "schedule_times",
            joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "time", nullable = false)
    private List<LocalTime> scheduledTimes;  // ex: [08:00, 14:00, 20:00]
}