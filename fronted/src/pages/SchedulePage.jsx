import { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import { MedicationCard } from '../components/MedicationCard';
import { ScheduleForm } from '../components/ScheduleForm';
import { scheduleService } from '../services/scheduleService';
import { medicationService } from '../services/medicationService';

export function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpened, setModalOpened] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const [schedulesData, medicationsData] = await Promise.all([
                scheduleService.getUserSchedules(),
                medicationService.getAll()
            ]);
            console.log('Loaded schedules:', schedulesData); // Debug
            setSchedules([...schedulesData]); // Force new array
            setMedications([...medicationsData]);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getMedicationName = (medicationId) => {
        const med = medications.find(m => m.id === medicationId);
        return med ? med.name : 'Unknown';
    };

    const handleSave = async (scheduleData) => {
        try {
            if (editingSchedule) {
                console.log('Updating schedule:', editingSchedule.id);
                await scheduleService.update(editingSchedule.id, scheduleData);
            } else {
                console.log('Creating schedule');
                await scheduleService.create(scheduleData);
            }

            // Reîncarcă datele
            await loadData();

            // Închide modalul DIRECT
            setModalOpened(false);
            setEditingSchedule(null);
        } catch (error) {
            console.error('Failed to save schedule:', error);
            alert('Failed to save schedule. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this medication from your schedule?')) {
            try {
                await scheduleService.delete(id);
                await loadData();
            } catch (error) {
                console.error('Failed to delete schedule:', error);
                alert('Failed to delete schedule. Please try again.');
            }
        }
    };

    const handleEdit = (schedule) => {
        console.log("Edit menu opened for schedule:", schedule);
        setEditingSchedule(schedule);
        setModalOpened(true);
    };

    const handleAdd = () => {
        setEditingSchedule(null);
        setModalOpened(true);
    };

    // Transform schedules into medication format for display
    const scheduledMedications = schedules.map(schedule => ({
        id: schedule.medicationId,
        scheduleId: schedule.id,
        name: getMedicationName(schedule.medicationId),
        scheduledTimes: schedule.scheduledTimes || []
    }));

    return (
        <main className="pt-24 pb-12 px-6 md:ml-64 max-w-7xl mx-auto">
            {/* Header Section - la fel */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Medication Schedule</h1>
                    <p className="text-on-surface-variant font-body max-w-lg">
                        Your daily medication plan - add medications and set administration times
                    </p>
                </div>
            </div>

            {/* Schedule List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full text-center py-12 text-on-surface-variant">Loading your schedule...</div>
                ) : scheduledMedications.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                            <span className="material-symbols-outlined text-6xl text-outline">schedule</span>
                            <h3 className="font-headline text-xl font-bold text-on-surface">No medications scheduled yet</h3>
                            <p className="text-on-surface-variant">Click the "Add To Schedule" button in the <a className="underline underline-offset-2 hover:text-primary" href="/medications">Medications</a> tab to add medications to your daily plan</p>
                        </div>
                    </div>
                ) : (
                    scheduledMedications.map((medication) => (
                        <MedicationCard
                            key={medication.scheduleId}
                            medication={medication}
                            onEdit={() => {
                                // Găsește schedule-ul original
                                const schedule = schedules.find(s => s.id === medication.scheduleId);
                                console.log('Edit clicked, found schedule:', schedule);
                                if (schedule) handleEdit(schedule);
                            }}
                            onDelete={() => handleDelete(medication.scheduleId)}
                            isSchedule={true}
                            medicationsList={medications}
                        />
                    ))
                )}
            </div>

            <Modal
                opened={modalOpened}
                onClose={() => {
                    setModalOpened(false);
                    setEditingSchedule(null);
                }}
                title={
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        <span className="font-headline font-bold text-xl">
                            {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
                        </span>
                    </div>
                }
                size="lg"
                centered
                classNames={{
                    content: 'bg-surface rounded-xl',
                    header: 'bg-surface border-b border-outline-variant/20',
                    body: 'p-6',
                }}
            >
                <ScheduleForm
                    key={editingSchedule?.id || 'new'}  // ← Adaugă această linie!
                    onSave={handleSave}
                    onClose={() => {
                        setModalOpened(false);
                        setEditingSchedule(null);
                    }}
                    initialData={editingSchedule}
                    medications={medications}
                />
            </Modal>
        </main>
    );
}