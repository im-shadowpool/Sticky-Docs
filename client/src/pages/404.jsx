const NotFoundPage = () => {
  return (
    <>
      <div className=" flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-[#def9e7] absolute top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-2xl text-gray-600">Page Not Found</p>
          <p className="text-gray-500">
            Oops! The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
