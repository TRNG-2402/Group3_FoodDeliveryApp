import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Features/Auth/Login/Login";
import { SignUp } from "./Features/Auth/SignUp/SignUp";
import "./App.css";
import { Customer } from "./Features/Cutomer/Customer.view";
import { Driver } from "./Features/Driver/Driver.view";
import NotFound from "./Features/Error/NotFound.view";


function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;