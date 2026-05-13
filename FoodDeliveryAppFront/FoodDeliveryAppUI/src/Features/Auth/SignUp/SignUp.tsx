import { useId, useState } from "react";
import { api } from "../../../services/api";
import { SignUpView } from "./SignUp.view";
import { Link, useNavigate } from "react-router-dom";
import type { IUserInfo } from "./SignUp.interface";
import { validateEmail } from "../../../utils/emailValidation";

const emptyUser: IUserInfo = {
    name: "", password: "", phone: "", email: "", userType: "customer", address: ""
}

export const SignUp = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(emptyUser);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleSignUp = () => {
        const { name, email, phone, password, userType, address, vehicleType } = userInfo;
        const body = { name, email, phone, password, userType, address, vehicleType };

        const validationPassed = validation(userInfo);

        if (validationPassed) api.post("auth/register", body)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                if (userInfo.userType === "customer") navigate("/customer");
                else if (userInfo.userType === "driver") navigate("/driver");
            })
            .catch(e => {
                setError(e?.response?.data);
            });
    }

    const validation = (userInfo: IUserInfo): boolean => {
        setError("");

        const { name, email, phone, password, userType, address, vehicleType } = userInfo;
        if (!name) {
            setError("Name cannot be empty");
            return false;
        }
        else if (!validateEmail(email)) {
            setError("Email is invalid");
            return false;
        }
        else if (!phone) {
            setError("Phone cannot be empty");
            return false;
        }
        else if (!password) {
            setError("Password cannot be empty");
            return false;
        }

        if (userType === "customer") {
            if (!address) {
                setError("Address cannot be empty");
                return false;
            }
        } else if (userType === "driver") {
            if (!vehicleType) {
                setError("Vehicle cannot be empty");
                return false;
            }
        }

        return true;
    }

    return <SignUpView
        handleSignUp={handleSignUp}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        error={error}
    />;
};