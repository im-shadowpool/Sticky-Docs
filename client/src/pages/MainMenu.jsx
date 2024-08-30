import { useState, useRef, useEffect, useContext } from "react";
import { PiUserCircleGear } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";

function useOutsideClick(ref, callback) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}

const MainMenu = () => {
  let navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [menuSelected, setMenuSelected] = useState(false);

  useOutsideClick(dropdownRef, () => {
    if (menuSelected) setMenuSelected(false);
  });

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={() => setMenuSelected(!menuSelected)}
        className="fixed top-2 right-3 z-50 cursor-pointer"
      >
        <PiUserCircleGear className="h-12 w-12 text-emerald-700 bg-white rounded-full shadow-lg p-1" />
      </div>
      <AnimatePresence>
        {menuSelected && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-14 right-3 z-50 bg-emerald-500 text-white shadow-lg rounded-lg p-3"
          >
            <div className="flex items-center justify-start mb-3">
              <span className="px-3 text-lg">Hey! 👋</span>
              <h1 className="text-lg font-bold">{currentUser.username}</h1>
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => {
                  navigate("/manage-account");
                }}
                className="flex items-center py-2 px-3 hover:bg-emerald-400/60 rounded-lg"
              >
                <span className="px-2">👤</span>
                <span>Manage account</span>
              </button>
              <button
                className="flex items-center py-2 px-3 hover:bg-emerald-400/60 rounded-lg"
                onClick={() => {
                  navigate("/ui-settings");
                }}
              >
                <span className="px-2">🎨</span>
                <span>UI Settings</span>
              </button>
              <button
                className="flex items-center py-2 px-3 hover:bg-emerald-400/60 rounded-lg"
                onClick={() => {
                  navigate("/logout");
                }}
              >
                <span className="px-2">🔐</span>
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainMenu;
