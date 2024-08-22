import ChatContainer from "./components/ChatContainer";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

const App = () => {
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
