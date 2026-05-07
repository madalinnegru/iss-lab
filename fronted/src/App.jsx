import { AppShell, Burger, Group, Title, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { IconPill, IconCalendarTime } from '@tabler/icons-react';
import { MedicationsPage } from './pages/MedicationsPage';
import { SchedulePage } from './pages/SchedulePage';

function App() {
    const [opened, { toggle }] = useDisclosure();
    const location = useLocation();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Title order={3}>HealthApp</Title>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavLink
                    component={Link}
                    to="/"
                    label="Medicamente"
                    leftSection={<IconPill size={16} />}
                    active={location.pathname === '/'}
                    variant="filled"
                />
                <NavLink
                    component={Link}
                    to="/schedule"
                    label="Plan medicamente"
                    leftSection={<IconCalendarTime size={16} />}
                    active={location.pathname === '/schedule'}
                    variant="filled"
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Routes>
                    <Route path="/" element={<MedicationsPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                </Routes>
            </AppShell.Main>
        </AppShell>
    );
}

export default App;