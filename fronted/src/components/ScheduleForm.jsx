import { useState, useEffect } from 'react';
import {
    Button,
    Select,
    Modal,
    Stack,
    TextInput,
    Group,
    Badge,
    Text,
    ActionIcon,
    MultiSelect
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';

// Ore predefinite pentru selecție
const TIME_OPTIONS = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export function ScheduleForm({ opened, onClose, onSave, initialData, medications }) {
    const [medicationId, setMedicationId] = useState('');
    const [scheduledTimes, setScheduledTimes] = useState([]);

    useEffect(() => {
        if (initialData) {
            setMedicationId(initialData.medicationId);
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

    const handleSubmit = () => {
        if (!medicationId || scheduledTimes.length === 0) return;
        onSave({ medicationId, scheduledTimes });
        onClose();
    };

    // Pregătește opțiunile pentru select
    const medicationOptions = medications.map(med => ({
        value: med.id,
        label: med.name
    }));

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={initialData ? 'Editează programarea' : 'Adaugă programare nouă'}
            size="lg"
            centered
        >
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <Stack>
                    <Select
                        label="Medicament"
                        placeholder="Alege medicamentul"
                        data={medicationOptions}
                        value={medicationId}
                        onChange={setMedicationId}
                        required
                        searchable
                    />

                    <Text size="sm" fw={500}>Ore administrare (zilnic)</Text>
                    <Text size="xs" c="dimmed">Selectează orele la care dorești să iei medicamentul:</Text>

                    <Group gap="xs">
                        {TIME_OPTIONS.map((time) => (
                            <Badge
                                key={time}
                                variant={scheduledTimes.includes(time) ? 'filled' : 'light'}
                                color={scheduledTimes.includes(time) ? 'blue' : 'gray'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleTime(time)}
                            >
                                {time}
                            </Badge>
                        ))}
                    </Group>

                    {scheduledTimes.length > 0 && (
                        <>
                            <Text size="sm" fw={500}>Ore selectate:</Text>
                            <Group gap="xs">
                                {scheduledTimes.map((time) => (
                                    <Badge
                                        key={time}
                                        color="green"
                                        variant="filled"
                                        rightSection={
                                            <ActionIcon size="xs" color="white" onClick={() => toggleTime(time)}>
                                                <IconX size={12} />
                                            </ActionIcon>
                                        }
                                    >
                                        {time}
                                    </Badge>
                                ))}
                            </Group>
                        </>
                    )}

                    <Button type="submit" fullWidth mt="md">
                        {initialData ? 'Actualizează programarea' : 'Salvează programarea'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}