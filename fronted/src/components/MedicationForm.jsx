import { useState, useEffect } from 'react';
import { Button, TextInput, Modal, Stack } from '@mantine/core';

export function MedicationForm({ opened, onClose, onSave, initialData }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        } else {
            setName('');
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSave({ name: name.trim() });
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={initialData ? 'Editează medicament' : 'Adaugă medicament'}
            centered
        >
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <Stack>
                    <TextInput
                        label="Nume medicament"
                        placeholder="Ex: Paracetamol"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Button type="submit" fullWidth>
                        {initialData ? 'Actualizează' : 'Salvează'}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}