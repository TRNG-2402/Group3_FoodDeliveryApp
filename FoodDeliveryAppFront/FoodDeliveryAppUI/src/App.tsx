import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Features/Auth/Login/Login";
import { Restaurant } from "./Features/Restaurant/Restaurant";
import { SignUp } from "./Features/Auth/SignUp/SignUp";
import "./App.css";
import { Customer } from "./Features/Cutomer/Customer.view";
import { Driver } from "./Features/Driver/Driver.view";
import NotFound from "./Features/Error/NotFound.view";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
        <Route path="/driver" element={<ProtectedRoute><Driver /></ProtectedRoute>} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;