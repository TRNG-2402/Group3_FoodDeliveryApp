import { LoginView } from "./Login.view.tsx";

export const Login = () => {

    const handleLogin = () => {
        console.log("login");
    };

    return (
        <LoginView handleLogin={handleLogin} />
    );
};