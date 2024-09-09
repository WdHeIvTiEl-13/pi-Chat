import Resister from "./pages/Resister";
import Login from "./pages/Login";
import './style.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import Sidebar from "./pages/Sidebar";
import Chat from "./pages/Chat";

function App () {
  const {currentUser} = useContext(AuthContext)
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    else{
      return <Sidebar/>
    }
  }
  
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute>
          <Sidebar />
        </ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="resister" element={<Resister />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;