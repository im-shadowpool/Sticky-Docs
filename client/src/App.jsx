import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import ManageAccount from "./components/ManageAccount";
import UiSettings from "./components/UiSettings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/404";
import UserProvider, { UserContext } from "./context/userContext";
import Logout from "./pages/Logout";
import Background from "./components/Background";
import { useContext, useEffect } from "react";

const MainApp = () => {
  const location = useLocation();

  const navigate = useNavigate();

  //Auth
  const { currentUser } = useContext(UserContext);

  //Auth
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  console.log("App.js");

  return (
    <div className="relative w-full h-screen">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "*" && <Background />}

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
