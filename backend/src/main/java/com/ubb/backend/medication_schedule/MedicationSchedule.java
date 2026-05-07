package com.ubb.backend.medication_schedule;

import com.ubb.backend.medication.Medication;
import com.ubb.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "medication_id")
    private Medication medication;
//
//    private Integer intervalHours;
//
//    private LocalTime intervalStartTime;
//
//    private List<LocalTime> scheduledTimes;
//
//    private List<DayOfWeek> daysOfWeek;
}
