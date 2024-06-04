import { useContext, useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { motion } from "framer-motion";

const NotesLoader = () => {
  console.log("NotesLoader");
  const ref = useRef(null);
  const navigate = useNavigate();

  // Authenticating the user
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token || !currentUser) {
      navigate("/login");
    }
  }, []);

  const [data, setData] = useState([]);
  // const [sortData, setSortData] = useState([data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/notes/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        setData(response.data);
        console.log("NotesLoader 1");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  console.log("NotesLoader 2");

  const reverseData = [...data].reverse();

  console.log(data);
  // console.log(sortData);

  const finalData =
    currentUser?.defaultSettings.sortOption === "newest" ? reverseData : data;

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerDirection: -1,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-transparent fixed flex top-0 left-0 z-[3] w-full h-full flex-wrap gap-4 p-3"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {finalData?.map((item) => (
        <Card card={item} key={item._id} refe={ref} />
      ))}
    </motion.div>
  );
};

export default NotesLoader;
