import { useContext } from "react";
import ChatContainer from "./components/ChatContainer";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { AuthContext, AuthContextType } from "./context/AuthContext";

const App = () => {
  const { isLoggedin } = useContext(AuthContext) as AuthContextType;
  console.log(isLoggedin)
  return (
  <div className="flex h-screen overflow-hidden ">
    <SideBar />
    <div className="flex-1  overflow-hidden flex flex-col  ">
      <Navbar />
      <ChatContainer />
    </div>
  </div>
  );
};

export default App;
