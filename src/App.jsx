import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/login";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}
