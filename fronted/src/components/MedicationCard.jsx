// src/components/MedicationCard.jsx
import { useState } from 'react';
import { Modal } from '@mantine/core';
import { ScheduleForm } from './ScheduleForm';
import { scheduleService } from '../services/scheduleService';
import { medicationService } from '../services/medicationService';

export function MedicationCard({ medication, onEdit, onDelete, onRefresh, isSchedule = false, medicationsList = [] }) {
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [editingScheduleData, setEditingScheduleData] = useState(null);

    const handleAddToSchedule = (e) => {
        e.stopPropagation();
        setEditingScheduleData(null);
        setShowScheduleModal(true);
    };

    const handleEditSchedule = () => {
        setEditingScheduleData({
            medicationId: medication.id,
            scheduledTimes: medication.scheduledTimes || []
        });
        setShowScheduleModal(true);
    };

    const handleSaveSchedule = async (scheduleData) => {
        try {
            if (editingScheduleData) {
                if (medication.scheduleId) {
                    await scheduleService.update(medication.scheduleId, {
                        ...scheduleData,
                        medicationId: medication.id
                    });
                }
            } else {
                await scheduleService.create({
                    ...scheduleData,
                    medicationId: medication.id
                });
            }
            setShowScheduleModal(false);
            setEditingScheduleData(null);
            if (onRefresh) onRefresh(); // ← use a dedicated refresh callback
        } catch (error) {
            console.error('Failed to save schedule:', error);
        }
    };

    // Format times for display
    const formatTimes = (times) => {
        if (!times || times.length === 0) return 'No times set';
        return times.join(', ');
    };

    return (
        <>
            <div className="group relative bg-surface-container-low rounded-xl p-6 transition-all hover:bg-surface-container-lowest hover:shadow-[0_8px_24px_rgba(26,27,34,0.04)] border-l-4 border-secondary">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl">
                        <span className="material-symbols-outlined">pill</span>
                    </div>
                    {isSchedule && medication.scheduledTimes && medication.scheduledTimes.length > 0 && (
                        <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-1">Daily at:</span>
                            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-md">
                {formatTimes(medication.scheduledTimes)}
              </span>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold font-headline text-on-surface mb-1">{medication.name}</h3>

                {isSchedule && medication.scheduledTimes && medication.scheduledTimes.length === 0 && (
                    <p className="text-sm text-on-surface-variant mb-4">No times scheduled yet</p>
                )}

                <div className="flex items-center gap-3 pt-4">
                    {!isSchedule ? (
                        <>
                            <button
                                onClick={handleAddToSchedule}
                                className="flex-1 bg-primary text-on-primary font-headline font-bold text-sm py-2 px-4 rounded-lg hover:bg-primary-container transition-colors"
                            >
                                Add to Schedule
                            </button>
                            <button
                                onClick={() => onEdit(medication)}
                                className="flex-1 text-primary font-headline font-bold text-sm py-2 px-4 rounded-lg bg-primary-container/10 hover:bg-primary-container/20 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(medication.id)}
                                className="text-outline hover:text-error transition-colors p-2 rounded-lg hover:bg-error-container/20"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => onEdit(medication)}
                                className="flex-1 text-primary font-headline font-bold text-sm py-2 px-4 rounded-lg bg-primary-container/10 hover:bg-primary-container/20 transition-colors"
                            >
                                Edit Times
                            </button>
                            <button
                                onClick={() => onDelete(medication.id)}
                                className="text-outline hover:text-error transition-colors p-2 rounded-lg hover:bg-error-container/20"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <Modal
                opened={showScheduleModal}
                onClose={() => {
                    setShowScheduleModal(false);
                    setEditingScheduleData(null);
                }}
                title={
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        <span className="font-headline font-bold text-xl">
              {editingScheduleData ? `Edit Schedule for ${medication.name}` : `Add ${medication.name} to Schedule`}
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
                    onSave={handleSaveSchedule}
                    onClose={() => {
                        setShowScheduleModal(false);
                        setEditingScheduleData(null);
                    }}
                    initialData={editingScheduleData}
                    medications={medicationsList}
                />
            </Modal>
        </>
    );
}