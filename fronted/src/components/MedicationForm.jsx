// src/components/MedicationForm.jsx
import { useState, useEffect } from 'react';
import { Button, TextInput, Stack } from '@mantine/core';

export function MedicationForm({ onSave, onClose, initialData }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
        } else {
            setName('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({ name: name.trim() });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    label="Medication Name"
                    placeholder="Enter medication name (e.g., Paracetamol, Ibuprofen)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                />
                <div className="flex gap-3 mt-4">
                    <Button type="button" variant="light" onClick={onClose} fullWidth>
                        Cancel
                    </Button>
                    <Button type="submit" fullWidth>
                        {initialData ? 'Update' : 'Add'} Medication
                    </Button>
                </div>
            </Stack>
        </form>
    );
}