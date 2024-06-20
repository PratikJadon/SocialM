import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ChatBox from "./components/ChatBox";
import ProtectedRoute from "./shared/ProtectedRoute";
import Socket from "./Socket";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route element={<Socket />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/chat" element={<Chat />}>
              <Route path=":chatId" element={<ChatBox />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
