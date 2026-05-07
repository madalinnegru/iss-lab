import { useState, useEffect } from 'react';
import { Container, Title, Button, Group, Notification } from '@mantine/core';
import { MedicationTable } from '../components/MedicationTable';
import { MedicationForm } from '../components/MedicationForm';
import { medicationService } from '../services/medicationService';

export function MedicationsPage() {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [editingMedication, setEditingMedication] = useState(null);

    const loadMedications = async () => {
        try {
            setLoading(true);
            const data = await medicationService.getAll();
            setMedications(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedications();
    }, []);

    const handleSave = async (medicationData) => {
        try {
            if (editingMedication) {
                await medicationService.update(editingMedication.id, medicationData);
            } else {
                await medicationService.create(medicationData);
            }
            await loadMedications();
            setEditingMedication(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Sigur doriți să ștergeți acest medicament?')) {
            try {
                await medicationService.delete(id);
                await loadMedications();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (medication) => {
        setEditingMedication(medication);
        setModalOpened(true);
    };

    const handleAdd = () => {
        setEditingMedication(null);
        setModalOpened(true);
    };

    return (
        <Container size="md" py="xl">
            <Group justify="space-between" mb="lg">
                <Title order={1}>Medicamente</Title>
                <Button onClick={handleAdd}>Adaugă medicament</Button>
            </Group>

            {error && (
                <Notification color="red" onClose={() => setError(null)} mb="md">
                    {error}
                </Notification>
            )}

            <MedicationTable
                medications={medications}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
            />

            <MedicationForm
                opened={modalOpened}
                onClose={() => {
                    setModalOpened(false);
                    setEditingMedication(null);
                }}
                onSave={handleSave}
                initialData={editingMedication}
            />
        </Container>
    );
}