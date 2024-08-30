import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        userData
      );
      console.log(response);

      const newUser = response.data;

      if (!newUser) {
        console.log("Couldn't create user");
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      console.log(error.response.status);

      setErrorMsg(error.response.data.message);

      toast.error(errorMsg, {
        style: {
          borderRadius: "10px",
          background: "#363636",
          color: "#fff",
        },
      });

      console.log(errorMsg);
    }
  };

  const changeInputHandler = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-emerald-500">
      <h2 className="text-2xl bg-white min-w-96 p-2 pl-8 text-center shadow-lg rounded font-bold mb-1">
        Signup
      </h2>
      <div className="bg-white p-8 rounded shadow-lg min-w-96">
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={userData.username}
              onChange={changeInputHandler}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={userData.email}
              onChange={changeInputHandler}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={userData.password}
              onChange={changeInputHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={userData.confirmPassword}
              onChange={changeInputHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-600/90"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600">
            Login
          </Link>
        </p>
      </div>
      <Toaster
        toastOptions={{
          className: "shadow-xl bg-white text-black rounded-full px-6 py-2",
        }}
        position="bottom-center"
      />
    </div>
  );
};

export default Signup;
