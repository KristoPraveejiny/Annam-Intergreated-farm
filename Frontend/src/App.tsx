import { Navigate, Route, Routes } from 'react-router-dom';
import { publicNavItems, roleDashboards } from './data/mock';
import AIAdvisoryPage from './pages/AIAdvisoryPage';
import DashboardPage from './pages/dashboards/DashboardPage';
import AboutPage from './pages/AboutPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import LandingPage from './pages/LandingPage';
import LivestockManagementPage from './pages/LivestockManagementPage';
import LoginPage from './pages/auth/LoginPage';
import MarketplacePage from './pages/MarketplacePage';
import NotificationsPage from './pages/NotificationsPage';
import OtpVerificationPage from './pages/auth/OtpVerificationPage';
import RegisterPage from './pages/auth/RegisterPage';
import ReportsAnalyticsPage from './pages/ReportsAnalyticsPage';
import WorkforceManagementPage from './pages/WorkforceManagementPage';
import { AppShell } from './components/layout/AppShell';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ai-advisory" element={<AIAdvisoryPage />} />
      <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
      <Route path="/livestock" element={<LivestockManagementPage />} />
      <Route path="/workforce" element={<WorkforceManagementPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/reports" element={<ReportsAnalyticsPage />} />
      {roleDashboards.map((dashboard) => (
        <Route
          key={dashboard.slug}
          path={dashboard.path}
          element={
            <AppShell role={dashboard.role} items={publicNavItems[dashboard.role]}>
              <DashboardPage dashboard={dashboard} />
            </AppShell>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}