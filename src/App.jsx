import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<div>Transactions Page</div>} />
          <Route path="accounts" element={<div>Accounts Page</div>} />
          <Route path="investments" element={<div>Investments Page</div>} />
          <Route path="credit-cards" element={<div>Credit Cards Page</div>} />
          <Route path="loans" element={<div>Loans Page</div>} />
          <Route path="services" element={<div>Services Page</div>} />
          <Route path="privileges" element={<div>My Privileges Page</div>} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
