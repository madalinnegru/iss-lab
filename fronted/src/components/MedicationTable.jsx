import { Table, Group, Text, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export function MedicationTable({ medications, onEdit, onDelete, loading }) {
    if (loading) {
        return <Text>Se încarcă...</Text>;
    }

    if (!medications || medications.length === 0) {
        return <Text>Nu există medicamente înregistrate.</Text>;
    }

    const rows = medications.map((medication) => (
        <Table.Tr key={medication.id}>
            <Table.Td>{medication.name}</Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => onEdit(medication)}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => onDelete(medication.id)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nume medicament</Table.Th>
                    <Table.Th>Acțiuni</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}