import { useContext, useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const ManageAccount = () => {
  let navigate = useNavigate();

  const [change, setChange] = useState(false);

  //Authenticating the user
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [modifiedUserData, setModifiedUserData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  });

  // console.log(modifiedUserData);
  // Auth done

  const changeInputHandler = (e) => {
    setModifiedUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleApply = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/manage`,
        modifiedUserData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );

      console.log(response);

      if (response.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      console.log(error.response.status);

      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#363636",
          color: "#fff",
        },
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeInOut", delay: 0 }}
        exit={{ opacity: 0 }}
        className="fixed flex justify-center items-center top-0 left-0 z-[4] w-full h-full bg-gray-900 bg-opacity-50"
      >
        <motion.div
          transition={{ duration: 0.1 }}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed z-50 bg-emerald-500 text-white shadow-lg rounded-lg p-4 px-8"
        >
          <div className="flex mb-7 mt-3 items-center justify-between">
            <h1 className="text-2xl font-semibold">Manage Account</h1>
            <MdOutlineCancel
              onClick={() => navigate("/")}
              className="text-2xl cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center mt-4 justify-center w-full h-[80%]">
            <div className="flex items-center w-full">
              <div className="bg-white w-64   flex gap-2 items-center p-3 pt-5  rounded-t-lg">
                <span className="pl-3 text-2xl">👋</span>
                <span className="text-xl text-black"> Username: </span>
              </div>
              {!change && (
                <span className="text-lg mx-6 px-2 border-b border-cyan-900">
                  {modifiedUserData.username}
                </span>
              )}
              {change && (
                <input
                  type="text"
                  className="bg-white text-black mx-4 px-2 py-0.5 w-[18rem] rounded-md text-lg"
                  name="username"
                  placeholder="Username"
                  value={modifiedUserData.username}
                  onChange={changeInputHandler}
                  id="username"
                />
              )}
            </div>
            <div className="flex items-center w-full">
              <div className="bg-white w-64   flex gap-2 items-center p-3">
                <span className="pl-3 text-2xl">📧</span>
                <span className="text-xl text-black"> Email: </span>
              </div>
              {!change && (
                <span className="text-lg mx-6 px-2 border-b border-cyan-900">
                  {modifiedUserData.email}
                </span>
              )}
              {change && (
                <input
                  className="bg-white text-black mx-4 px-2 py-0.5 w-[18rem] rounded-md text-lg"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={modifiedUserData.email}
                  onChange={changeInputHandler}
                  id="email"
                />
              )}
            </div>
            {!change && (
              <div className="flex items-center w-full">
                <div className="bg-white w-64   flex gap-2 items-center pb-5 rounded-b-lg p-3">
                  <span className="pl-3 text-2xl">🔑</span>
                  <span className="text-xl text-black"> Password: </span>
                </div>
                <span className="text-lg mx-6 px-2 border-b border-cyan-900">
                  ********
                </span>
              </div>
            )}
            {change && (
              <div className="flex items-center w-full">
                <div className="bg-white w-64 flex gap-2 items-center p-3">
                  <span className="pl-3 text-2xl">🔑</span>
                  <span className="text-xl text-black"> New Password: </span>
                </div>

                <input
                  className="bg-white text-black mx-4 px-2 py-0.5 w-[18rem] rounded-md text-lg"
                  type="password"
                  placeholder="New Password (Optional)"
                  name="newPassword"
                  id="newPassword"
                  value={modifiedUserData.newPassword}
                  onChange={changeInputHandler}
                />
              </div>
            )}
            {change && (
              <div className="flex items-center w-full">
                <div className="bg-white w-64  flex gap-2 items-center  p-3">
                  <span className="pl-3 text-2xl">🔑</span>
                  <span className="text-xl text-black">
                    {" "}
                    Confirm Password:{" "}
                  </span>
                </div>
                <input
                  className="bg-white text-black mx-4 px-2 py-0.5 w-[18rem] rounded-md text-lg"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={modifiedUserData.confirmPassword}
                  onChange={changeInputHandler}
                />
              </div>
            )}
            {change && (
              <div className="flex items-center w-full">
                <div className="bg-white w-64  flex gap-2 items-center pb-5 rounded-b-lg p-3">
                  <span className="pl-3 text-2xl">🔑</span>
                  <span className="text-xl text-black">
                    {" "}
                    Current Password:{" "}
                  </span>
                </div>
                <input
                  className="bg-white text-black mx-4 px-2 py-0.5 w-[18rem] rounded-md text-lg"
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  id="currentPassword"
                  value={modifiedUserData.currentPassword}
                  onChange={changeInputHandler}
                />
              </div>
            )}
          </div>
          {/* Two Buttons of applychanges and cancel */}
          <div className="flex mt-3 justify-end items-end gap-3">
            {!change && (
              <>
                <button
                  onClick={() => setChange(!change)}
                  className="bg-emerald-400 hover:bg-opacity-85 text-white p-2 px-4 rounded-lg"
                >
                  Change
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-emerald-400 hover:bg-opacity-85 text-white p-2 px-4 rounded-lg"
                >
                  Close
                </button>
              </>
            )}
            {change && (
              <>
                <button
                  onClick={handleApply}
                  className="bg-emerald-400 hover:bg-opacity-85 text-white p-2 px-4 rounded-lg"
                >
                  Apply Changes
                </button>
                <button
                  onClick={() => setChange(!change)}
                  className="bg-emerald-400 hover:bg-opacity-85 text-white p-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </motion.div>
        <Toaster
          toastOptions={{
            className: "shadow-xl bg-white text-black rounded-full px-6 py-2",
          }}
          position="bottom-center"
        />
      </motion.div>
    </>
  );
};

export default ManageAccount;
