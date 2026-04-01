import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { PodcastPage, LoginPage, RegisterPage } from "@podcast/ui";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PodcastPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
