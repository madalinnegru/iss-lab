import { Table, Button, Group, Text, Badge, ActionIcon, Stack } from '@mantine/core';
import { IconEdit, IconTrash, IconClock } from '@tabler/icons-react';

export function ScheduleTable({ schedules, medications, onEdit, onDelete, loading }) {
    if (loading) {
        return <Text>Se încarcă programările...</Text>;
    }

    if (!schedules || schedules.length === 0) {
        return <Text>Nu există programări pentru acest utilizator.</Text>;
    }

    // Creează un map pentru a găsi rapid numele medicamentului după ID
    const medicationMap = {};
    medications.forEach(med => {
        medicationMap[med.id] = med.name;
    });

    const rows = schedules.map((schedule) => {
        const medicationName = medicationMap[schedule.medicationId] || 'Medicament necunoscut';

        return (
            <Table.Tr key={schedule.id}>
                <Table.Td>
                    <Text fw={500}>{medicationName}</Text>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs">
                        {schedule.scheduledTimes?.map((time, index) => (
                            <Badge key={index} color="blue" variant="light" leftSection={<IconClock size={12} />}>
                                {time}
                            </Badge>
                        ))}
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs">
                        <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => onEdit(schedule)}
                        >
                            <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => onDelete(schedule.id)}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Medicament</Table.Th>
                    <Table.Th>Ore administrare</Table.Th>
                    <Table.Th>Acțiuni</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}