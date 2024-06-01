import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    UsernameOrMail: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userData
      );
      console.log(response);

   


      const user = response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-emerald-500">
      <h2 className="text-2xl bg-white p-2 px-40  shadow-lg rounded font-bold mb-1">
        Login
      </h2>
      <div className="bg-white p-8 rounded shadow-lg min-w-96">
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="UsernameOrMail"
              name="UsernameOrMail"
              value={userData.UsernameOrMail}
              onChange={changeInputHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
              placeholder="Enter your email"
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
              value={userData.password}
              onChange={changeInputHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-600/90"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-emerald-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
