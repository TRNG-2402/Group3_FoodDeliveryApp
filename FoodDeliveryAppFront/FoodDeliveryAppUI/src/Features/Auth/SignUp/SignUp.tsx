import { useState } from "react";
import { api } from "../../../services/api";
import { SignUpView } from "./SignUp.view";
import { Link } from "react-router-dom";
import type { IUserInfo } from "./SignUp.interface";

const emptyUser: IUserInfo = {
    name: "", password: "", phone: "", email: "", userType: "customer", address: ""
}

export const SignUp = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(emptyUser);

    const handleSignUp = () => {
        const { name, email, phone, password, userType, address, vehicleType } = userInfo;
        const body = { name, email, phone, password, userType, address, vehicleType };

        try {
            api.post("auth/register", body)
            .then(r => console.log(r));
        } catch (error) {
            console.log(error);
            alert("There's an error. Try again.");
        }

    };

    return <SignUpView
        handleSignUp={handleSignUp}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
    />;
};