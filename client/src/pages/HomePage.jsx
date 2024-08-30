import { Toaster } from "react-hot-toast";
import MainMenu from "./MainMenu";
import CreateNoteBtn from "../components/CreateNoteBtn";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  //Authenticating the user
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  // Auth done

  return (
    <>
      <CreateNoteBtn />
      <MainMenu />
      <Toaster
        toastOptions={{
          className: "shadow-xl bg-white text-black rounded-full px-6 py-2",
        }}
        position="bottom-center"
      />
    </>
  );
};

export default HomePage;
