import { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import { MedicationCard } from '../components/MedicationCard';
import { MedicationForm } from '../components/MedicationForm';
import { medicationService } from '../services/medicationService';

export function MedicationsPage() {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpened, setModalOpened] = useState(false);
    const [editingMedication, setEditingMedication] = useState(null);

    const loadMedications = async () => {
        try {
            setLoading(true);
            const data = await medicationService.getAll();
            setMedications(data);
        } catch (error) {
            console.error('Failed to load medications:', error);
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
            setModalOpened(false);
            setEditingMedication(null);
        } catch (error) {
            console.error('Failed to save medication:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            try {
                await medicationService.delete(id);
                await loadMedications();
            } catch (error) {
                console.error('Failed to delete medication:', error);
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
        <main className="pt-24 pb-12 px-6 md:ml-64 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Medication Library</h1>
                    <p className="text-on-surface-variant font-body max-w-lg">
                        Manage your current clinical plan with precision and clarity.
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-headline font-bold flex items-center gap-3 transition-transform active:scale-95 shadow-[0_8px_24px_rgba(0,64,168,0.15)] hover:opacity-90"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add Medication
                </button>
            </div>

            {/* Bento Grid Medication List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full text-center py-12 text-on-surface-variant">Loading medications...</div>
                ) : (
                    <>
                        {medications.map((medication) => (
                            <MedicationCard
                                key={medication.id}
                                medication={medication}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onRefresh={loadMedications}
                            />
                        ))}
                    </>
                )}
            </div>

            <Modal
                opened={modalOpened}
                onClose={() => {
                    setModalOpened(false);
                    setEditingMedication(null);
                }}
                title={
                    <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              {editingMedication ? 'edit' : 'add_circle'}
            </span>
                        <span className="font-headline font-bold text-xl">
              {editingMedication ? 'Edit Medication' : 'Add New Medication'}
            </span>
                    </div>
                }
                size="md"
                centered
                classNames={{
                    content: 'bg-surface rounded-xl',
                    header: 'bg-surface border-b border-outline-variant/20',
                    body: 'p-6',
                }}
            >
                <MedicationForm
                    onSave={handleSave}
                    onClose={() => {
                        setModalOpened(false);
                        setEditingMedication(null);
                    }}
                    initialData={editingMedication}
                />
            </Modal>
        </main>
    );
}