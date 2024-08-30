import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { motion } from "framer-motion";
import classNames from "classnames";
import { MdOutlineCancel } from "react-icons/md";

const colors = ["blue", "green", "slate", "yellow"];

const CreateNote = () => {
  let navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectOpacity, setSelectOpacity] = useState(null);

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

    const selectedOpacity = document.querySelector(
      'input[name="opacity"]:checked'
    ).value;
    const selectedColorId = document.querySelector(
      'input[name="color"]:checked'
    ).id;
    // converting to string
    let selectedOpacityValue = selectedOpacity.toString();

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
        tagColor: selectedColor + `/${selectedOpacity}`, //bg-blue-500/40
        color: selectedColor, //bg-blue-500
        opacity: "bg-opacity-" + selectedOpacity, //bg-opacity-40
        opacityValue: selectedOpacityValue, //40
        colorId: selectedColorId, //blue
      },
    };

    console.log(newData);

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
              className="py-2 px-2 bg-slate-100 font-bold hover:bg-green-100 text-base rounded-full cursor-pointer"
            >
              <MdOutlineCancel className="text-2xl text-gray-700 cursor-pointer" />
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-row gap-3 items-center justify-start">
                <label className="text-xl text-gray-700 font-semibold">
                  Choose a color :
                </label>
                {colors.map((color) => (
                  <React.Fragment key={color}>
                    <input
                      type="radio"
                      id={color}
                      name="color"
                      value={`bg-${color}-500`}
                      className="hidden"
                    />
                    <label
                      htmlFor={color}
                      className={classNames(
                        `w-8 h-8 rounded-full cursor-pointer`,
                        `bg-${color}-500`,
                        {
                          "border-2 border-gray-600":
                            selectedColor === `bg-${color}-500`,
                        }
                      )}
                      onClick={() => {
                        setSelectedColor(`bg-${color}-500`);
                      }}
                    ></label>
                  </React.Fragment>
                ))}
              </div>

              {/* Selecting Opacity */}

              <div className="flex flex-row gap-3 items-center justify-start">
                <label className="text-xl text-gray-700 font-semibold">
                  Choose opacity :
                </label>
                {[10, 25, 40, 50].map((op) => (
                  <React.Fragment key={op}>
                    <input
                      type="radio"
                      id={op}
                      name="opacity"
                      value={op}
                      className="hidden"
                      onClick={() => setSelectOpacity(op)}
                    />
                    <label
                      htmlFor={op}
                      className={classNames(
                        `w-8 h-8 ${selectedColor} rounded-full cursor-pointer`,
                        { "bg-slate-400": selectedColor === "" },
                        { "border-2 border-gray-600": selectOpacity === op }
                      )}
                      style={{ opacity: op / 100 }}
                    ></label>
                  </React.Fragment>
                ))}
              </div>
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
