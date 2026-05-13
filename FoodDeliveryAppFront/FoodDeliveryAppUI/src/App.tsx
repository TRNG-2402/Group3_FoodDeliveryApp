import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Features/Auth/Login/Login";
import { SignUp } from "./Features/Auth/SignUp/SignUp";
import "./App.css";

function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;