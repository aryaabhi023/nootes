import { useEffect,useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import  auth from "../Appwrite/auth";

export default function Verify(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");


    const confirmEmailVerification = async (userId, secret) => {
        try {
            const response = await auth.confirmVerification(userId, secret);
            console.log("Email verification successful:", response);
            navigate("/Home");
        } catch (error) {
            console.error("Error verifying email:", error);
            setError("Verification failed. Please try again.");
        }
    };

    useEffect(() => {
        if (userId && secret) {
            confirmEmailVerification(userId, secret);
        }
    }, [userId, secret]);

    return (
        <div className="text-center mt-10 text-white text-lg">
            {error && <p className="text-red-400 text-lg">{error}</p>}
            <h1 className="text-2xl font-bold">Email Verification</h1>
            <p>Verifying your email...</p>
            <span className="text-sm">(Check you email)</span>
        </div>
    );
};
