import { useState, type Dispatch, type ReactElement } from 'react';
import './Input.style.css';

interface IInput {
    type: "Password" | "Name" | "Username" | "Email" | "Phone" | "Search" | "Price";
    setValue: Dispatch<string>;
    customStyle?: object;
    size?: "large" | "medium" | "small"
}

export const Input = ({ type, setValue, customStyle, size }: IInput) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const getIcon = (type: string) => {

        var icon: ReactElement = <></>;

        switch (type) {
            case "Password":
                icon =
                    <span className="icon-prefix">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    </span>
                break;
            case "Email": icon = <span className="icon-prefix">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#808080">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg></span>
                break;
            case "Name":
            case "Username": icon = <span className="icon-prefix">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#7f8c8d"
                >
                    <circle cx="12" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                </svg>
            </span>
                break;
            case "Phone": icon = <span className="icon-prefix">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#808080"
                >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
            </span>
                break;
            case "Search": icon = <span className="icon-prefix">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#808080"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </span>
                break;
            case "Price": icon = <span className="icon-prefix">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#808080"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg >
            </span>
                break;
            default: icon = <></>;
        }
        return icon;
    }

    const getInputSize = (size: string | undefined) => {
        switch (size) {
            case "large": return "input-large";
            case "medium": return "input-medium";
            case "small": return "input-small";
            default : return "input-medium";
        }
    }

    return (
        <div className={`input-wrapper ${getInputSize(size)}`} style={customStyle}>
            {
                getIcon(type)
            }

            <input
                type={!isPasswordVisible && type === "Password" ? 'password' : 'text'}
                placeholder={type}
                onChange={e => setValue(e.target.value)}
                className="text-input"
            />

            {type === "Password" &&
                <button
                    type="button"
                    className="icon-suffix"
                    onClick={toggleVisibility}
                    aria-label="Toggle password visibility"
                >
                    {!isPasswordVisible ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88L14.12 14.12" /><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /><path d="m2 2 20 20" /></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                </button>
            }
        </div>
    );
};