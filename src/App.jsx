import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

export const Placeholder = () => {
  return <div className="text-gray-500">Under Construction 🚧</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<Placeholder />} />
          <Route path="accounts" element={<Placeholder />} />
          <Route path="investments" element={<Placeholder />} />
          <Route path="credit-cards" element={<Placeholder />} />
          <Route path="loans" element={<Placeholder />} />
          <Route path="services" element={<Placeholder />} />
          <Route path="privileges" element={<Placeholder />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
