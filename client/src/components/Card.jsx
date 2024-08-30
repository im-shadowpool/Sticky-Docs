/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from "framer-motion";
import { MdCopyAll, MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
import { CgLoadbarDoc } from "react-icons/cg";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const Card = ({ card, refe }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const [showDate, setShowDate] = useState(false);

  const dateStr = card.date;
  const date = new Date(dateStr);
  const now = new Date();

  const diffInMs = now - date;
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  const dateInDaysAgo = diffInDays === 0 ? "Today" : `${diffInDays} days ago`;

  const clickToCopyHandler = (e) => {
    navigator.clipboard.writeText(`Title: ${card.title}, ${card.description}`);
    toast.success("Copied to clipboard!", {
      className:
        card.tag.colorId === "green"
          ? `bg-emerald-600 text-white rounded-full shadow-2xl px-5 py-2 font-[500]`
          : card.tag.colorId === "blue"
          ? `bg-cyan-600 text-white rounded-full shadow-2xl px-5 py-2 font-[500]`
          : card.tag.colorId === "yellow"
          ? `bg-yellow-600 text-white rounded-full shadow-2xl px-5 py-2 font-[500]`
          : `bg-slate-600 text-white rounded-full shadow-2xl px-5 py-2 font-[500]`,
    });
  };

  const confirmDeleteHandler = async (e) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (
      e.target.innerText !== "Confirm delete?" ||
      e.target.classList.contains("tagOpen")
    ) {
      return;
    }
    // let localData = JSON.parse(localStorage.getItem("data"));
    // localData = localData.filter((item) => item.id !== card.id);
    // localStorage.setItem("data", JSON.stringify(localData));

    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/notes/delete/${card._id}`,
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );

    if (e.target.parentNode.parentNode && response.status === 200) {
      e.target.parentNode.parentNode.remove();
      toast.success("Note deleted successfully!", {
        style: {
          borderRadius: "10px",
          background: "#363636",
          color: "#fff",
        },
      });
    }
  };

  const cancelDeletionHandler = (e) => {
    if (
      e.target.parentElement.nextElementSibling.classList.contains("tagOpen")
    ) {
      return;
    }
    if (
      e.target.parentElement.nextElementSibling.classList.contains("tagDel")
    ) {
      e.target.parentElement.nextElementSibling.className =
        card.tag.colorId === "green"
          ? `tagOpen w-full py-3 bg-emerald-700 text-white flex justify-center items-center`
          : card.tag.colorId === "blue"
          ? `tagOpen w-full py-3 bg-cyan-700 text-white flex justify-center items-center`
          : card.tag.colorId === "yellow"
          ? `tagOpen w-full py-3 bg-yellow-700 text-white flex justify-center items-center`
          : `tagOpen w-full py-3 bg-slate-600 text-white flex justify-center items-center`;

      e.target.parentElement.nextElementSibling.innerText = card.title;
    } else if (
      e.target.parentElement.parentElement.nextElementSibling.classList.contains(
        "tagDel"
      )
    ) {
      e.target.parentElement.parentElement.nextElementSibling.className =
        card.tag.colorId === "green"
          ? `tagOpen w-full py-3 bg-emerald-700 text-white flex justify-center items-center`
          : card.tag.colorId === "blue"
          ? `tagOpen w-full py-3 bg-cyan-700 text-white flex justify-center items-center`
          : card.tag.colorId === "yellow"
          ? `tagOpen w-full py-3 bg-yellow-700 text-white flex justify-center items-center`
          : `tagOpen w-full py-3 bg-slate-600 text-white flex justify-center items-center`;

      e.target.parentElement.parentElement.nextElementSibling.innerText =
        card.title;
    } else {
      return;
    }
    e.target.previousElementSibling.classList.add("flex");
    e.target.classList.add("hidden");
    e.target.previousElementSibling.classList.remove("hidden");
  };

  const deleteNoteHandler = (e) => {
    if (
      e.target.parentElement.nextElementSibling.classList.contains("tagDel")
    ) {
      return;
    }
    if (
      e.target.parentElement.nextElementSibling.classList.contains("tagOpen")
    ) {
      // console.log("logged first if");
      e.target.parentElement.nextElementSibling.className =
        "tagDel w-full py-3 bg-red-600 text-white flex justify-center items-center cursor-pointer";
      e.target.parentElement.nextElementSibling.innerText = "Confirm delete?";
    } else if (
      e.target.parentElement.parentElement.nextElementSibling.classList.contains(
        "tagOpen"
      )
    ) {
      // console.log("logged second if");
      e.target.parentElement.parentElement.nextElementSibling.className =
        "tagDel w-full py-3 bg-red-600 text-white flex justify-center items-center cursor-pointer";

      e.target.parentElement.parentElement.nextElementSibling.innerText =
        "Confirm delete?";
    } else {
      return;
    }
    // console.log(e.target.nextSibling);
    e.target.nextSibling.classList.add("flex");
    e.target.classList.add("hidden");
    e.target.nextSibling.classList.remove("hidden");
  };

  // --------------------------------------------------- return statement ---------------------------------------------------

  console.log(card.tag.color);
  console.log(card.tag.opacity);
  console.log(card.tag.opacityValue);

  return (
    <motion.div
      key={card.id}
      className="w-48 h-0"
      onMouseDown={(e) => {
        e.target.classList.add("cursor-grabbing");
      }}
      onMouseUp={(e) => {
        e.target.classList.remove("cursor-grabbing");
      }}
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        drag
        dragConstraints={refe}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        dragElastic={0.1}
        dragTransition={{ power: 0.1 }}
        dragPropagation={true}
        className={`relative w-60 h-72 rounded-[20px] px-3.5  ${card.tag.color} bg-opacity-${card.tag.opacityValue} overflow-hidden shadow-lg`}
      >
        {/* {console.log(card.tag.tagColor)} */}
        <TfiLayoutLineSolid
          onMouseDown={(e) => {
            // console.log(e.target.classList);
            e.target.classList.remove("cursor-grab");
            e.target.classList.add("cursor-grabbing");
          }}
          onMouseUp={(e) => {
            // console.log(e.target.classList);
            e.target.classList.remove("cursor-grabbing");
            e.target.classList.add("cursor-grab");
          }}
          className="text-3xl cursor-grab m-auto opacity-55"
        />
        <div className="flex">
          <CgLoadbarDoc
            className="text-xl"
            onMouseEnter={() => setShowDate(true)}
            onMouseLeave={() => setShowDate(false)}
          />
          {showDate && (
            <motion.small
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-gray-700 ml-2"
            >
              {dateInDaysAgo}
            </motion.small>
          )}
        </div>

        <p className="text-[13px] font-sans overflow-hidden font-[500] mt-2">
          {card.description}
        </p>
        <footer className="footer absolute bottom-0 w-full left-0">
          <div className="flex justify-between items-center mb-3 px-3">
            {/* after clicking above icon, it should turns to another cancel icon */}
            <MdDeleteOutline
              onClick={deleteNoteHandler}
              className={`${card.tag.color} bg-opacity-20 w-6 h-6 rounded-full text-lg p-[4px] flex justify-center items-center cursor-pointer hover:bg-opacity-40 transition-all`}
            />
            <MdOutlineCancel
              onClick={cancelDeletionHandler}
              className={`hidden bg-white w-6 h-6 rounded-full text-lg p-[4px] justify-center items-center cursor-pointer hover:bg-white/20 transition-all text-red-600`}
            />

            <MdCopyAll
              className={`${card.tag.color} bg-opacity-20 w-6 h-6 rounded-full text-lg p-[4px] flex justify-center items-center cursor-pointer hover:bg-opacity-40 transition-all`}
              onClick={clickToCopyHandler}
            />
          </div>
          <div
            onClick={confirmDeleteHandler}
            className={
              card.tag.colorId === "green"
                ? `tagOpen w-full py-3 bg-emerald-700 text-white flex justify-center items-center`
                : card.tag.colorId === "blue"
                ? `tagOpen w-full py-3 bg-cyan-700 text-white flex justify-center items-center`
                : card.tag.colorId === "yellow"
                ? `tagOpen w-full py-3 bg-yellow-700 text-white flex justify-center items-center`
                : `tagOpen w-full py-3 bg-slate-600 text-white flex justify-center items-center`
            }
          >
            <h3>{card.title}</h3>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default Card;
