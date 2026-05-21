// src/services/scheduleService.js
import authService from './authService';

const API_BASE_URL = 'http://localhost:8080/api/medication_schedule';

export const scheduleService = {
    /**
     * Get current user ID from the JWT token
     */
    getCurrentUserId: () => {
        const user = authService.getCurrentUser();
        // Dacă token-ul conține userId în claim-ul "id"
        if (user && user.userId) {
            return user.userId;
        }
        // Alternativ, dacă ai pus userId în "sub" (nu recomandat)
        return null;
    },

    /**
     * Get schedules for currently authenticated user
     * Folosește userId-ul din token pentru a face request-ul
     */
    getUserSchedules: async () => {
        try {
            // Obține userId-ul din token
            const userId = scheduleService.getCurrentUserId();
            if (!userId) {
                throw new Error('User ID not found in token');
            }

            const response = await authService.authenticatedFetch(`${API_BASE_URL}/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch schedules');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching schedules:', error);
            throw error;
        }
    },

    /**
     * Get schedule by ID
     */
    getScheduleById: async (id) => {
        try {
            const response = await authService.authenticatedFetch(`${API_BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch schedule');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error;
        }
    },

    /**
     * Create new schedule (NU trimite userId - backend-ul îl ignoră sau îl verifică)
     */
    create: async (scheduleData) => {
        console.log('Stack trace:', new Error().stack);
        try {
            const response = await authService.authenticatedFetch(API_BASE_URL, {
                method: 'POST',
                body: JSON.stringify({
                    medicationId: scheduleData.medicationId,
                    scheduledTimes: scheduleData.scheduledTimes,
                    userId: scheduleService.getCurrentUserId()
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to create schedule');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating schedule:', error);
            throw error;
        }
    },

    /**
     * Update schedule
     */
    update: async (id, scheduleData) => {
        try {
            const response = await authService.authenticatedFetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    medicationId: scheduleData.medicationId,
                    scheduledTimes: scheduleData.scheduledTimes,
                    userId: scheduleService.getCurrentUserId()
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to update schedule');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating schedule:', error);
            throw error;
        }
    },

    /**
     * Delete schedule
     */
    delete: async (id) => {
        try {
            const response = await authService.authenticatedFetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to delete schedule');
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            throw error;
        }
    },
};