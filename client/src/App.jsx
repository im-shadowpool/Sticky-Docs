import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import ManageAccount from "./components/ManageAccount";
import UiSettings from "./components/UiSettings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/404";
import UserProvider from "./context/userContext";
import Logout from "./pages/Logout";
import Background from "./components/Background";
import NotesLoader from "./components/NotesLoader";

const MainApp = () => {
  const location = useLocation();
  return (
    <div className="relative w-full h-screen">
      <UserProvider>
        {location.pathname !== "/login" &&
          location.pathname !== "/signup" &&
          location.pathname !== "*" && <Background />}
        {/* {window.location.pathname === "/create-note" && <Background />} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/home" element={<Navigate to={"/"} replace />} />
          <Route path="/manage-account" element={<ManageAccount />} />
          <Route path="/ui-settings" element={<UiSettings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

export default App;