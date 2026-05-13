import { SignUpView } from "./SignUp.view";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const handleSignUp = () => {
        console.log("sign up");
    };

    return <SignUpView handleSignUp={handleSignUp} />;
};