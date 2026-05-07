// src/services/scheduleService.js
const API_BASE_URL = 'http://localhost:8080/api/medication_schedule';
const USER_ID = '68adc3d4-6e3b-4fb1-8cbb-907cbc813f24';

export const scheduleService = {
    getUserSchedules: async () => {
        const response = await fetch(`${API_BASE_URL}/user/${USER_ID}`);
        if (!response.ok) throw new Error('Failed to fetch schedules');
        return response.json();
    },

    create: async (scheduleData) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...scheduleData,
                userId: USER_ID
            }),
        });
        if (!response.ok) throw new Error('Failed to create schedule');
        return response.json();
    },

    update: async (id, scheduleData) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleData),
        });
        if (!response.ok) throw new Error('Failed to update schedule');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete schedule');
    },
};