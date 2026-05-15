import { Button } from "../Button/Button";
import "./ConfirmModal.style.css";

interface IConfirmModal {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    danger?: boolean;
}

export const ConfirmModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmLabel = "Confirm",
    danger = false,
}: IConfirmModal) => {
    if (!isOpen) return null;

    return (
        <div className="confirmOverlay" onClick={onCancel}>
            <div className="confirmCard" onClick={(e) => e.stopPropagation()}>
                <h3 className="confirmTitle">{title}</h3>
                <p className="confirmMessage">{message}</p>
                <div className="confirmActions">
                    <Button className="buttonOutline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className={danger ? "buttonDanger" : "buttonPrimary"}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};
