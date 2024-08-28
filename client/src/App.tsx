import ChatContainer from "./components/ChatContainer";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen overflow-hidden ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SideBar />
                <div className="flex-1  overflow-hidden flex flex-col  ">
                  <Navbar />
                  <ChatContainer />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
