/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from "react";
import NotesLoader from "./NotesLoader";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const greetings = [
  "Hey",
  "Hello",
  "Hi",
  "Howdy",
  "Bonjour",
  "Good day",
  "Aloha",
  "Yo",
  "Namaste",
  "Howdy-do",
  "Cheerio",
  "G'day",
  "Good day",
  "Sup",
  "Salute",
];

const Background = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour < 12) {
      greeting = "Good morning! 🏕️";
    } else if (currentHour < 18) {
      greeting = "Good afternoon! 🌇";
    } else {
      greeting = "Good evening! 🌆";
    }

    return greeting;
  };

  let greetingsMessage =
    greetings[Math.floor(Math.random() * greetings.length)];

  let message =
    greetingsMessage + ", " + currentUser?.username + "! " + getGreeting();

  console.log(message);

  return (
    <>
      <div className="fixed z-[2] w-full h-screen">
        <div className="absolute text-zinc-500 top-[5%] w-full py-10 flex justify-center text-large font-semibold">
          {message}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tighter font-semibold text-emerald-200">
          Docs.
        </div>
      </div>
      <NotesLoader />
    </>
  );
};

export default Background;
