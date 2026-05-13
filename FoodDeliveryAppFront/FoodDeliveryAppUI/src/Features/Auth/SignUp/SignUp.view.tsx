import { Link } from "react-router-dom";
import {
    MdOutlineEmail,
    MdOutlinePerson,
    MdOutlinePhone,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
import { Button } from "../../../Components/Button/Button";
import { Input } from "../../../Components/Input/Input";
import "./SignUp.style.css";

interface ISignUpView {
    handleSignUp: () => void;
}

export const SignUpView = ({ handleSignUp }: ISignUpView) => {
    return (
        <div className="signUpPage">
            <div className="signUpCard">
                <div className="loginLogoContainer">
                    <MdFastfood className="loginLogo" />
                    <p>Turbo Feast</p>
                </div>

                <h1 className="signUpTitle">Create Account</h1>
                <p className="signUpSubtitle">Sign up to get started</p>

                <div className="signUpForm">
                    <Input type="text" placeholder="Full Name" icon={<MdOutlinePerson />} />
                    <Input type="email" placeholder="Email" icon={<MdOutlineEmail />} />
                    <Input type="tel" placeholder="Phone Number" icon={<MdOutlinePhone />} />
                    <Input type="password" placeholder="Password" icon={<RiLockPasswordLine />} />
                    <Input type="password" placeholder="Confirm Password" icon={<RiLockPasswordLine />} />

                    <label className="termsRow">
                        <input type="checkbox" />
                        <span>
                            I agree to the <span className="termsLink">Terms & Conditions</span>
                        </span>
                    </label>

                    <div onClick={handleSignUp}>
                        <Button className="buttonPrimary">Sign Up</Button>
                    </div>
                </div>

                <p className="signUpText">
                    Already have an account?{" "}
                    <Link to="/" className="signUpLink">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};