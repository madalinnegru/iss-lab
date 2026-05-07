import { Routes, Route } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { SideNavBar } from './components/SideNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardPage } from './pages/DashboardPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { SchedulePage } from './pages/SchedulePage';

function App() {
    return (
        <div className="bg-surface min-h-screen">
            <TopNavBar />
            <SideNavBar />
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/medications" element={<MedicationsPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                {/* Add other routes as needed */}
            </Routes>
            <BottomNavBar />
        </div>
    );
}

export default App;