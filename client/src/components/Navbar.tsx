import { LuLogOut } from "react-icons/lu";
import { AuthContextType, useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext() as AuthContextType;
  return (
    <div className="h-16 border-b pb-2 mb-4 flex justify-between items-center px-3 shadow-md">
      <div className="text-xl font-semibold">LLM Messaging</div>
      <div className=" flex items-center gap-4">
        <img
          src={user?.user?.user_metadata?.avatar_url}
          className="w-9 h-9 rounded-full"
          alt=""
        />
        <button onClick={logout}>
          <LuLogOut className=" text-3xl text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
