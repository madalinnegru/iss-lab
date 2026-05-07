import { useState, useEffect } from 'react';
import { scheduleService } from '../services/scheduleService';
import { medicationService } from '../services/medicationService';

export function DashboardPage() {
    const [schedules, setSchedules] = useState([]);
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [schedulesData, medicationsData] = await Promise.all([
                scheduleService.getUserSchedules(),
                medicationService.getAll()
            ]);
            setSchedules(schedulesData);
            setMedications(medicationsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMedicationName = (medicationId) => {
        const med = medications.find(m => m.id === medicationId);
        return med ? med.name : 'Unknown';
    };

    // Group schedules by time of day
    const morningMeds = schedules.filter(s =>
        s.scheduledTimes?.some(t => parseInt(t) < 12)
    );
    const afternoonMeds = schedules.filter(s =>
        s.scheduledTimes?.some(t => parseInt(t) >= 12 && parseInt(t) < 17)
    );
    const eveningMeds = schedules.filter(s =>
        s.scheduledTimes?.some(t => parseInt(t) >= 17)
    );

    const totalDoses = schedules.reduce((acc, s) => acc + (s.scheduledTimes?.length || 0), 0);
    const completedDoses = 0; // Would need a tracking system

    return (
        <main className="pt-24 pb-12 px-6 md:ml-64 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Today's Schedule</h1>
                <p className="text-on-surface-variant mt-2 font-medium">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Daily Timeline */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Morning Slot */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="font-headline font-bold text-primary tracking-wide text-sm uppercase">Morning</span>
                            <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
                        </div>
                        {morningMeds.map((schedule) => (
                            <div key={schedule.id} className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-lowest transition-all duration-300 group">
                                <div className="flex items-center gap-5">
                                    <div className="w-1.5 h-12 bg-secondary rounded-full"></div>
                                    <div>
                                        <h3 className="font-headline font-bold text-lg text-on-surface">{getMedicationName(schedule.medicationId)}</h3>
                                        <p className="text-sm text-on-surface-variant font-label">
                                            {schedule.scheduledTimes?.filter(t => parseInt(t) < 12).join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-sm">
                                    Mark as Taken
                                </button>
                            </div>
                        ))}
                        {morningMeds.length === 0 && (
                            <div className="bg-surface-container-low p-6 rounded-xl text-center text-on-surface-variant">
                                No morning medications scheduled
                            </div>
                        )}
                    </div>

                    {/* Afternoon Slot */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4">
                            <span className="font-headline font-bold text-primary tracking-wide text-sm uppercase">Afternoon</span>
                            <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
                        </div>
                        {afternoonMeds.map((schedule) => (
                            <div key={schedule.id} className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-lowest transition-all duration-300 group">
                                <div className="flex items-center gap-5">
                                    <div className="w-1.5 h-12 bg-outline rounded-full"></div>
                                    <div>
                                        <h3 className="font-headline font-bold text-lg text-on-surface">{getMedicationName(schedule.medicationId)}</h3>
                                        <p className="text-sm text-on-surface-variant font-label">
                                            {schedule.scheduledTimes?.filter(t => parseInt(t) >= 12 && parseInt(t) < 17).join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-container transition-all active:scale-95">
                                    Mark as Taken
                                </button>
                            </div>
                        ))}
                        {afternoonMeds.length === 0 && (
                            <div className="bg-surface-container-low p-6 rounded-xl text-center text-on-surface-variant">
                                No afternoon medications scheduled
                            </div>
                        )}
                    </div>

                    {/* Evening Slot */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4">
                            <span className="font-headline font-bold text-primary tracking-wide text-sm uppercase">Evening</span>
                            <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
                        </div>
                        {eveningMeds.map((schedule) => (
                            <div key={schedule.id} className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-lowest transition-all duration-300 group">
                                <div className="flex items-center gap-5">
                                    <div className="w-1.5 h-12 bg-outline rounded-full"></div>
                                    <div>
                                        <h3 className="font-headline font-bold text-lg text-on-surface">{getMedicationName(schedule.medicationId)}</h3>
                                        <p className="text-sm text-on-surface-variant font-label">
                                            {schedule.scheduledTimes?.filter(t => parseInt(t) >= 17).join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-container transition-all active:scale-95">
                                    Mark as Taken
                                </button>
                            </div>
                        ))}
                        {eveningMeds.length === 0 && (
                            <div className="bg-surface-container-low p-6 rounded-xl text-center text-on-surface-variant">
                                No evening medications scheduled
                            </div>
                        )}
                    </div>
                </div>

                {/* Side Actions / Status */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Quick Status Card */}
                    <div className="bg-surface-container-high/50 p-8 rounded-2xl border border-white/40 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="font-headline font-bold text-xl text-on-surface">Adherence</h4>
                                <p className="text-sm text-on-surface-variant">Daily Progress</p>
                            </div>
                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg text-sm font-bold">
                {totalDoses > 0 ? Math.round((completedDoses / totalDoses) * 100) : 0}%
              </span>
                        </div>
                        <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                            <div
                                className="h-full bg-secondary rounded-full transition-all duration-1000"
                                style={{ width: `${totalDoses > 0 ? (completedDoses / totalDoses) * 100 : 0}%` }}
                            ></div>
                        </div>
                        <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">
                            You've completed <span className="font-bold text-on-surface">{completedDoses} of {totalDoses}</span> doses today. Keep up the momentum!
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}