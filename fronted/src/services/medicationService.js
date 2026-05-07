// src/services/medicationService.js
const API_BASE_URL = 'http://localhost:8080/api/medications';

export const medicationService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}?page=0&size=100`);
        if (!response.ok) throw new Error('Failed to fetch medications');
        const page = await response.json();
        return page.content;
    },

    create: async (medication) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medication),
        });
        if (!response.ok) throw new Error('Failed to create medication');
        return response.json();
    },

    update: async (id, medication) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medication),
        });
        if (!response.ok) throw new Error('Failed to update medication');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete medication');
    },
};