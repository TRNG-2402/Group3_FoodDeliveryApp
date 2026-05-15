import { useNavigate } from "react-router-dom";

export default function NotFound()
{
    const navigate = useNavigate();
    return (
        <div>
            <h2>404 - Not Found</h2>
            <p>That page doesn't exist.</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}