import { Button } from "../../../Components/Button/Button";
import { Input } from "../../../Components/Input/Input";
import { Link } from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import type { Dispatch, SetStateAction } from "react";
import "./Login.style.css";

interface ILoginView {
    handleLogin: () => void;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    error?: string;
}

export const LoginView = ({ handleLogin, email, setEmail, password, setPassword, error }: ILoginView) => {
    return (
        <div className="loginPage">

            <div className="loginCard">

                <div className="loginLogoContainer">
                    <MdFastfood className="loginLogo" />
                    <p>Turbo Feast</p>
                </div>

                <h2 className="loginTitle">
                    Welcome Back
                </h2>

                <p className="loginText">
                    Login to continue ordering food
                </p>

                <div className="loginForm">
                    {error && <div className="error-message">{error}</div>}

                    <Input
                        type="email"
                        placeholder="Email"
                        icon={<MdOutlineEmail />}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        icon={<RiLockPasswordLine />}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />

                    <Button className="buttonPrimary" onClick={handleLogin}>
                        Login
                    </Button>

                </div>

                <p className="loginBottomText">
                    Don&apos;t have an account? <Link to="/signup" className="loginLink">
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
};
