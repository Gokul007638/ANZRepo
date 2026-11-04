import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/HomePage";
import AddClaimsPage from "./pages/AddClaimsPage";
import ReconPage from "./pages/ReconPage";
import MasterPage from "./pages/MasterPage";
import ExceptionsPage from "./pages/ExceptionsPage";
import ReportsPage from "./pages/ReportsPage";
import ApprovalsPage from "./pages/ApprovalsPage";
import AuditLogPage from "./pages/AuditLogPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>

          <Route index element={<Navigate to="/home" replace />} />

          <Route path="home" element={<HomePage />} />
          <Route path="add-claims" element={<AddClaimsPage />} />
          <Route path="recon" element={<ReconPage />} />
          <Route path="master" element={<MasterPage />} />
          <Route path="exceptions" element={<ExceptionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="audit-log" element={<AuditLogPage />} />

          <Route path="*" element={<Navigate to="/home" replace />} />

        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;