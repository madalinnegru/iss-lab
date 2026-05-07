// src/components/ScheduleForm.jsx
import { useState, useEffect } from 'react';
import { Button, Select, Stack, Text, Group, Badge, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

// Ore predefinite pentru selecție (format HH:MM)
const TIME_OPTIONS = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export function ScheduleForm({ onSave, onClose, initialData, medications }) {
    const [medicationId, setMedicationId] = useState('');
    const [scheduledTimes, setScheduledTimes] = useState([]);

    useEffect(() => {
        if (initialData) {
            setMedicationId(initialData.medicationId || '');
            setScheduledTimes(initialData.scheduledTimes || []);
        } else {
            setMedicationId('');
            setScheduledTimes([]);
        }
    }, [initialData]);

    const toggleTime = (time) => {
        if (scheduledTimes.includes(time)) {
            setScheduledTimes(scheduledTimes.filter(t => t !== time));
        } else {
            setScheduledTimes([...scheduledTimes, time].sort());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!medicationId || scheduledTimes.length === 0) {
            alert('Please select a medication and at least one time');
            return;
        }
        onSave({ medicationId, scheduledTimes });
        onClose();
    };

    // Pregătește opțiunile pentru select
    const medicationOptions = medications.map(med => ({
        value: med.id,
        label: med.name
    }));

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="md">
                <Select
                    label="Select Medication"
                    placeholder="Choose a medication from your library"
                    data={medicationOptions}
                    value={medicationId}
                    onChange={setMedicationId}
                    required
                    searchable
                    size="md"
                />

                <div>
                    <Text size="sm" fw={500} mb="xs">Administration Times (daily)</Text>
                    <Text size="xs" c="dimmed" mb="md">Click on times to select or deselect:</Text>

                    <div className="flex flex-wrap gap-2">
                        {TIME_OPTIONS.map((time) => (
                            <Badge
                                key={time}
                                variant={scheduledTimes.includes(time) ? 'filled' : 'outline'}
                                color={scheduledTimes.includes(time) ? 'blue' : 'gray'}
                                className="cursor-pointer hover:opacity-80 transition-all"
                                style={{ cursor: 'pointer', padding: '8px 12px', fontSize: '14px' }}
                                onClick={() => toggleTime(time)}
                            >
                                {time}
                            </Badge>
                        ))}
                    </div>
                </div>

                {scheduledTimes.length > 0 && (
                    <div>
                        <Text size="sm" fw={500} mb="xs">Selected Times:</Text>
                        <div className="flex flex-wrap gap-2">
                            {scheduledTimes.map((time) => (
                                <Badge
                                    key={time}
                                    color="green"
                                    variant="filled"
                                    size="lg"
                                    rightSection={
                                        <ActionIcon size="xs" color="white" onClick={() => toggleTime(time)}>
                                            <IconX size={12} />
                                        </ActionIcon>
                                    }
                                    className="cursor-pointer"
                                >
                                    {time}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex gap-3 mt-4">
                    <Button type="button" variant="light" onClick={onClose} fullWidth>
                        Cancel
                    </Button>
                    <Button type="submit" fullWidth>
                        {initialData ? 'Update Schedule' : 'Add to Schedule'}
                    </Button>
                </div>
            </Stack>
        </form>
    );
}