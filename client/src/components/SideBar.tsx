import { AuthContextType, useAuthContext } from "../context/AuthContext";
import { query } from "../api/api";
import { TConversation } from "../types/types";
import { useQuery } from "react-query";
import { DB } from "../data/constant";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { login, isLoggedin } = useAuthContext() as AuthContextType;

  const { data: conversation, isLoading } = useQuery(
    ["conversation", isLoggedin],
    () => query<TConversation[]>(DB.CONVERSATION),
    {
      enabled: isLoggedin,
    }
  );
  return (
    <div className="w-80 shadow-md bg-gray-100">
      {isLoggedin ? (
        isLoading ? (
          <div className="h-full border flex p-4 flex-col  ">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="border animate-pulse w-full h-8 py-3 px-2 rounded-lg bg-gray-200 mt-2"
              ></div>
            ))}
          </div>
        ) : (
          <div className="h-full border flex p-4 flex-col  ">
            {conversation?.data?.map((conv) => (
              <NavLink
                to={`?conversation=${conv.id}`}
                key={conv.id}
                className="border w-full h-fit py-3 px-2 rounded-lg bg-gray-200 mt-2"
              >
                {conv.title}
              </NavLink>
            ))}
          </div>
        )
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
