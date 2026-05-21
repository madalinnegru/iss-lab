// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { SideNavBar } from './components/SideNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardPage } from './pages/DashboardPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { SchedulePage } from './pages/SchedulePage';
import LoginPage from './pages/LoginPage.jsx';
import authService from './services/authService';
import RegisterPage from "./pages/RegisterPage.jsx";

// Componentă pentru rute protejate
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/" replace />;
    }

    return children;
};

// Layout pentru pagini autentificate (cu sidebar)
const AuthenticatedLayout = ({ children }) => {
    return (
        <>
            <TopNavBar />
            <SideNavBar />
            <main className="pt-16 md:pl-64 pb-20 md:pb-12">
                {children}
            </main>
            <BottomNavBar />
        </>
    );
};

// Layout pentru pagini publice (fără sidebar)
const PublicLayout = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

function App() {
    return (
        <div className="bg-surface min-h-screen">
            <Routes>
                {/* Public Routes - FĂRĂ SIDEBAR */}
                <Route path="/" element={
                    <PublicLayout>
                        <LoginPage />
                    </PublicLayout>
                } />

                <Route path="/register" element={
                    <PublicLayout>
                        <RegisterPage />
                    </PublicLayout>
                } />



                {/* Protected Routes - CU SIDEBAR (necesită autentificare) */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <DashboardPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/medications" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <MedicationsPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                <Route path="/schedule" element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <SchedulePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                } />

                {/* Catch all - redirect to login */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;