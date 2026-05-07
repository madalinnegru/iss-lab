const API_BASE_URL = 'http://localhost:8080/api/medication_schedule';
const USER_ID = '68adc3d4-6e3b-4fb1-8cbb-907cbc813f24';

export const scheduleService = {
    // GET all schedules for current user
    getUserSchedules: async () => {
        const response = await fetch(`${API_BASE_URL}/user/${USER_ID}`);
        if (!response.ok) throw new Error('Failed to fetch schedules');
        return response.json();
    },

    // GET single schedule by ID
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch schedule');
        return response.json();
    },

    // POST create new schedule
    create: async (scheduleData) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...scheduleData,
                userId: USER_ID  // Forțează user ID-ul specificat
            }),
        });
        if (!response.ok) throw new Error('Failed to create schedule');
        return response.json();
    },

    // PUT update schedule
    update: async (id, scheduleData) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleData),
        });
        if (!response.ok) throw new Error('Failed to update schedule');
        return response.json();
    },

    // DELETE schedule
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete schedule');
    },
};