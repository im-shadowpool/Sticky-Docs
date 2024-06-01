import { useNavigate } from "react-router-dom";

const CreateNoteBtn = () => {
  let navigate = useNavigate();
  return (
    <>
      <button
        className="fixed flex p-4 gap-2 z-[5] items-center px-5 bottom-5 right-5 bg-emerald-600 text-white rounded-full shadow-lg cursor-pointer hover:text-gray-100 hover:shadow-xl transition-all"
        onClick={() => {
          navigate("/create-note");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <p className="pr-1">Create note</p>
      </button>
    </>
  );
};

export default CreateNoteBtn;
