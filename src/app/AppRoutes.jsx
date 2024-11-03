import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat/Chat";
import { AiProvider } from "../context/AiContext";
import { AuthProvider } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage/LandingPage";

export default function AppRoutes() {
  return (
    <AiProvider>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/chats/:id" element={<Chat />} />
        </Routes>
      </AuthProvider>
    </AiProvider>
  );
}
