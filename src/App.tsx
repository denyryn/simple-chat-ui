import MainLayout from "./layouts/main";
import ChatPage from "./pages/chat/page";
import { UserDataProvider } from "./context/UserDataContext";
import { ChatViewProvider } from "./context/ChatViewContext";
import { ChatDataProvider } from "./context/ChatDataContext";
import "./App.css";

function App() {
  return (
    <>
      <UserDataProvider>
        <MainLayout>
          <ChatDataProvider>
            <ChatViewProvider>
              <ChatPage />
            </ChatViewProvider>
          </ChatDataProvider>
        </MainLayout>
      </UserDataProvider>
    </>
  );
}

export default App;
