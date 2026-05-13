import { Button } from "../../../Components/Button/Button";
import { Input } from "../../../Components/Input/Input";
import { Link } from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import "./Login.style.css";

interface ILoginView {
    handleLogin: () => void;
}

export const LoginView = ({ handleLogin }: ILoginView) => {
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
                    <Input
                        type="email"
                        placeholder="Email"
                        icon={<MdOutlineEmail />}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        icon={<RiLockPasswordLine />}
                    />

                    <Button
                        className="buttonPrimary"
                    >
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