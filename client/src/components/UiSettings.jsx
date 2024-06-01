import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";

const UiSettings = () => {
  let navigate = useNavigate();

  //Authenticating the user
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  // Auth done

  const onClickOutsidePopup = (e) => {
    if (e.target.classList.contains("clickedOutside")) {
      navigate("/");
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log({
      mainTitle: e.target[0].value,
      sortOption: e.target[1].value,
      showGreetings: e.target[2].checked,
    });
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut", delay: 0 }}
          exit={{ opacity: 0 }}
          className="fixed clickedOutside flex justify-center items-center top-0 left-0 z-[4] w-full h-full bg-gray-900 bg-opacity-50"
          onClick={onClickOutsidePopup}
        >
          <motion.div
            transition={{ duration: 0.1 }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white shadow-lg rounded-lg p-4 px-8 max-w-max min-w-96"
          >
            <div className="m-6">
              <h1 className="text-2xl font-bold">UI Settings</h1>
              <form
                action=""
                onSubmit={formSubmit}
                className="mt-6 flex flex-col"
              >
                <div className="flex flex-col ">
                  {/* Main Title */}
                  <label htmlFor="MainTitle" className="text-lg mt-4">
                    Main Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg bg-white text-black"
                    placeholder="Enter main title"
                    maxLength={8}
                    defaultValue={"Docs."}
                  />

                  {/* Sort Option */}
                  <label htmlFor="sortOption" className="text-lg mt-4">
                    Sort Option
                  </label>
                  <select
                    name="sortOption"
                    id="sortOption"
                    className="w-full p-2 rounded-lg text-black bg-white"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  {/* Show Greetings */}
                  <div className="flex items-center mt-4">
                    <input type="checkbox" className="w-10 h-6" />
                    <span className="text-lg">Show greetings</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="mt-4 bg-white text-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-white">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default UiSettings;
