import { AuthContextType, useAuthContext } from "../context/AuthContext";

const SideBar = () => {
  const { login, isLoggedin } = useAuthContext() as AuthContextType;
  return (
    <div className="w-80 shadow-md bg-gray-100">
      {isLoggedin ? (
         <div className="h-full border flex p-4  ">
         <div className="border w-full h-fit py-3 px-2 rounded-lg bg-gray-200">
           This is first conversation
         </div>
       </div>
      ) : (
        <div className="h-full border flex justify-center items-center">
        <button
          onClick={login}
          className=" rounded-xl bg-blue-500 text-white px-4 py-3"
        >
          Login to save chat history
        </button>
      </div>
      )}
    </div>
  );
};

export default SideBar;
