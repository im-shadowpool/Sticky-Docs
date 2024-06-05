import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import NotesLoader from "../components/NotesLoader";
import { motion } from "framer-motion";

const CreateNote = () => {
  let navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    // if (e.target[0].value === "" || e.target[1].value === "") {
    //   alert("Note is empty, please fill the note");
    //   return;
    // }

    const selectedColor = document.querySelector(
      'input[name="color"]:checked'
    ).value;
    const selectedOpacity = document.querySelector(
      'input[name="opacity"]:checked'
    ).value;
    const selectedColorId = document.querySelector(
      'input[name="color"]:checked'
    ).id;

    // console.log(
    //   e.target[0].value,
    //   e.target[1].value,
    //   selectedColor,
    //   selectedOpacity,
    //   selectedColorId
    // );
    const newData = {
      title: e.target[0].value,
      description: e.target[1].value,
      tag: {
        tagColor: selectedColor + `/${selectedOpacity}`,
        color: selectedColor,
        opacity: selectedOpacity,
        colorId: selectedColorId,
      },
    };

    // let localData = JSON.parse(localStorage.getItem("data"));
    // if (localData) {
    //   localData.push(newData);
    //   localStorage.setItem("data", JSON.stringify(localData));
    // } else {
    //   localStorage.setItem("data", JSON.stringify([newData]));
    // }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/notes/create`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    console.log(response);
    setFormSubmitted(!formSubmitted);
    console.log(formSubmitted);

    toast.success("Note created successfully", {
      duration: 3000,
      position: "bottom-center",
    });
    navigate("/home");
  };

  return (
    <>
      {/* {formSubmitted && <NotesLoader />} */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
        onClick={onClickOutsidePopup}
        className="fixed clickedOutside flex justify-center items-center top-0 left-0 z-[4] w-full h-full bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white w-full sm:max-w-fit  p-6 flex flex-col justify-start rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Create a new note</h1>
            <span
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-slate-100 font-bold hover:bg-green-100 text-base rounded-full cursor-pointer"
            >
              X
            </span>
          </div>
          <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="p-2 border text-lg border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Description"
              className="p-2 border h-40 text-lg border-gray-300 rounded-md"
              required
            />
            {/* Creating the Color Picker and 4 colour choices */}
            <div className="flex flex-col gap-3">
              <label className="text-lg font-semibold">Choose a color :</label>
              <input
                type="radio"
                id="blue"
                name="color"
                value="bg-blue-500"
                className="hidden"
              />
              <label
                htmlFor="blue"
                className="w-7 h-7 bg-blue-500 rounded-full cursor-pointer"
                onClick={() => {
                  setSelectedColor("bg-blue-500");
                }}
              ></label>
              <input
                type="radio"
                id="green"
                name="color"
                value="bg-green-500"
                className="hidden"
              />
              <label
                htmlFor="green"
                className="w-7 h-7 bg-green-500 rounded-full cursor-pointer"
                onClick={() => {
                  setSelectedColor("bg-green-500");
                }}
              ></label>
              <input
                type="radio"
                id="gray"
                name="color"
                value="bg-slate-500"
                className="hidden"
              />
              <label
                htmlFor="gray"
                className="w-7 h-7 bg-slate-500 rounded-full cursor-pointer"
                onClick={() => {
                  setSelectedColor("bg-slate-500");
                }}
              ></label>
              <input
                type="radio"
                id="yellow"
                name="color"
                value="bg-yellow-500"
                className="hidden"
              />
              <label
                htmlFor="yellow"
                className="w-7 h-7 bg-yellow-500 rounded-full cursor-pointer"
                onClick={(e) => {
                  setSelectedColor("bg-yellow-500");
                  e.target.classList.add("border-2", "border-black");
                }}
              ></label>
              {/* Selecting Opacity */}
              <label className="text-lg font-semibold">Choose opacity :</label>
              <input
                type="radio"
                id="30"
                name="opacity"
                value="30"
                className="hidden"
              />
              <label
                htmlFor="30"
                className={
                  selectedColor === "bg-blue-500"
                    ? `w-7 h-7 bg-blue-500/30 rounded-full cursor-pointe`
                    : selectedColor === "bg-green-500"
                    ? `w-7 h-7 bg-green-500/30 rounded-full cursor-pointer`
                    : selectedColor === "bg-slate-500"
                    ? `w-7 h-7 bg-slate-500/30 rounded-full cursor-pointer`
                    : selectedColor === "bg-yellow-500"
                    ? `w-7 h-7 bg-yellow-500/30 rounded-full cursor-pointer`
                    : `w-7 h-7 bg-slate-400/30 rounded-full cursor-pointer`
                }
              ></label>
              <input
                type="radio"
                id="50"
                name="opacity"
                value="50"
                className="hidden"
              />
              <label
                htmlFor="50"
                className={
                  selectedColor === "bg-blue-500"
                    ? `w-7 h-7 bg-blue-500/50 rounded-full cursor-pointer`
                    : selectedColor === "bg-green-500"
                    ? `w-7 h-7 bg-green-500/50 rounded-full cursor-pointer`
                    : selectedColor === "bg-slate-500"
                    ? `w-7 h-7 bg-slate-500/50 rounded-full cursor-pointer`
                    : selectedColor === "bg-yellow-500"
                    ? `w-7 h-7 bg-yellow-500/50 rounded-full cursor-pointer`
                    : `w-7 h-7 bg-slate-400/50 rounded-full cursor-pointer`
                }
              ></label>
              <input
                type="radio"
                id="65"
                name="opacity"
                value="65"
                className="hidden"
              />
              <label
                htmlFor="65"
                className={
                  selectedColor === "bg-blue-500"
                    ? `w-7 h-7 bg-blue-500/65 rounded-full cursor-pointer`
                    : selectedColor === "bg-green-500"
                    ? `w-7 h-7 bg-green-500/65 rounded-full cursor-pointer`
                    : selectedColor === "bg-slate-500"
                    ? `w-7 h-7 bg-slate-500/65 rounded-full cursor-pointer`
                    : selectedColor === "bg-yellow-500"
                    ? `w-7 h-7 bg-yellow-500/65 rounded-full cursor-pointer`
                    : `w-7 h-7 bg-slate-400/65 rounded-full cursor-pointer`
                }
              ></label>
            </div>
            <button
              type="submit"
              className="p-2 bg-emerald-600 text-white rounded-md shadow"
            >
              Create
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default CreateNote;
