import { Link } from "react-router-dom";
import {
    MdOutlineEmail,
    MdOutlinePerson,
    MdOutlinePhone,
    MdHome,
    MdDirectionsCar
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
import { Button } from "../../../Components/Button/Button";
import { Input } from "../../../Components/Input/Input";
import "./SignUp.style.css";
import type { Dispatch, SetStateAction } from "react";
import type { IUserInfo } from "./SignUp.interface";

interface ISignUpView {
    handleSignUp: () => void;
    userInfo: IUserInfo;
    setUserInfo: Dispatch<SetStateAction<IUserInfo>>;
    error?: string;
}

export const SignUpView = ({ handleSignUp, setUserInfo, userInfo, error }: ISignUpView) => {
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
                    {
                        error &&  <div className="error-message">{error}</div>
                    }

                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#555" }}>
                            <input
                                type="radio"
                                name="choice"
                                className="custom-radio"
                                value="customer"
                                checked={userInfo?.userType === "customer"}
                                onChange={() => {
                                    setUserInfo((userInfo: IUserInfo) => {
                                        return { ...userInfo, userType: "customer" }
                                    })
                                }}
                            />
                            Customer
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#555" }}>
                            <input
                                type="radio"
                                name="choice"
                                className="custom-radio"
                                value="driver"
                                checked={userInfo?.userType === "driver"}
                                onChange={() => {
                                    setUserInfo((userInfo: IUserInfo) => {
                                        return { ...userInfo, userType: "driver" }
                                    })
                                }} />
                            Driver
                        </label>
                    </div>

                    <Input type="text" placeholder="Full Name" icon={<MdOutlinePerson />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInfo((userInfo: IUserInfo) => {
                                return { ...userInfo, name: e.target.value }
                            })
                        }}
                    />
                    <Input type="email" placeholder="Email" icon={<MdOutlineEmail />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInfo((userInfo: IUserInfo) => {
                                return { ...userInfo, email: e.target.value }
                            })
                        }}
                    />
                    <Input type="tel" placeholder="Phone Number" icon={<MdOutlinePhone />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInfo((userInfo: IUserInfo) => {
                                return { ...userInfo, phone: e.target.value }
                            })
                        }}
                    />
                    <Input type="password" placeholder="Password" icon={<RiLockPasswordLine />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInfo((userInfo: IUserInfo) => {
                                return { ...userInfo, password: e.target.value }
                            })
                        }}
                    />
                    {/* <Input type="password" placeholder="Confirm Password" icon={<RiLockPasswordLine />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInfo((userInfo: IUserInfo) => {
                                return { ...userInfo, password: e.target.value }
                            })
                        }}
                    /> */}
                    {
                        userInfo.userType === "customer" && <Input type="text" placeholder="Address" icon={<MdHome />}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserInfo((userInfo: IUserInfo) => {
                                    return { ...userInfo, address: e.target.value }
                                })
                            }}
                        />
                    }
                    {
                        userInfo.userType === "driver" && <Input type="text" placeholder="Vehicle" icon={<MdDirectionsCar />}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserInfo((userInfo: IUserInfo) => {
                                    return { ...userInfo, vehicleType: e.target.value }
                                })
                            }}
                        />
                    }

                    {/* <label className="termsRow">
                        <input type="checkbox" />
                        <span>
                            I agree to the <span className="termsLink">Terms & Conditions</span>
                        </span>
                    </label> */}

                    <div onClick={handleSignUp}>
                        <Button className="buttonPrimary" onClick={() => { }}>Sign Up</Button>
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