import { useState, useEffect } from 'react';
import { Container, Title, Button, Group, Notification } from '@mantine/core';
import { ScheduleTable } from '../components/ScheduleTable';
import { ScheduleForm } from '../components/ScheduleForm';
import { scheduleService } from '../services/scheduleService';
import { medicationService } from '../services/medicationService';

export function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);

    // Încarcă programările și medicamentele
    const loadData = async () => {
        try {
            setLoading(true);
            const [schedulesData, medicationsData] = await Promise.all([
                scheduleService.getUserSchedules(),
                medicationService.getAll()
            ]);
            setSchedules(schedulesData);
            setMedications(medicationsData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (scheduleData) => {
        try {
            if (editingSchedule) {
                await scheduleService.update(editingSchedule.id, scheduleData);
            } else {
                await scheduleService.create(scheduleData);
            }
            await loadData();
            setEditingSchedule(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Sigur doriți să ștergeți această programare?')) {
            try {
                await scheduleService.delete(id);
                await loadData();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setModalOpened(true);
    };

    const handleAdd = () => {
        setEditingSchedule(null);
        setModalOpened(true);
    };

    return (
        <Container size="lg" py="xl">
            <Group justify="space-between" mb="lg">
                <Title order={1}>Planul meu de medicamente</Title>
                <Button onClick={handleAdd}>Adaugă programare</Button>
            </Group>

            {error && (
                <Notification color="red" onClose={() => setError(null)} mb="md">
                    {error}
                </Notification>
            )}

            <ScheduleTable
                schedules={schedules}
                medications={medications}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
            />

            <ScheduleForm
                opened={modalOpened}
                onClose={() => {
                    setModalOpened(false);
                    setEditingSchedule(null);
                }}
                onSave={handleSave}
                initialData={editingSchedule}
                medications={medications}
            />
        </Container>
    );
}