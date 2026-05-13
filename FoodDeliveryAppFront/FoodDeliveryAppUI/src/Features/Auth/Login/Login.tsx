import { useState } from "react";
import { api } from "../../../services/api";
import { LoginView } from "./Login.view";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils/emailValidation";

export const Login = () =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () =>
    {
        setError("");

        if (!validateEmail(email))
        {
            setError("Email is invalid");
            return;
        }
        if (!password)
        {
            setError("Password cannot be empty");
            return;
        }

        api.post("auth/login", { email, password })
            .then((response) =>
            {
                localStorage.setItem("token", response.data.token);
                return api.get(`user/email/${email}`);
            })
            .then((response) =>
            {
                const userType = response.data.userType?.toLowerCase();
                if (userType === "customer") navigate("/customer");
                else if (userType === "driver") navigate("/driver");
            })
            .catch((e) =>
            {
                setError(e?.response?.data || "Invalid email or password");
            });
    };

    return (
        <LoginView
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
        />
    );
};
