import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import auth from "../Appwrite/auth";
import Button2 from "../SharedComponent/Button2";

const SignUp = () => {
    const navigate = useNavigate();
    const [isError,setIssError]=useState(false);
    const [error,setError]=useState("");
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setIssError(true);
            setError("Passwords do not match");
            return;
        } else {
            setIssError(false);
            setError("");
        }
    
        try {
            const response = await auth.Register(user);
            console.log("Registration successful:", response);
    
            const verificationResponse = await auth.sendVerificationEmail();
            console.log("Verification email sent:", verificationResponse);
    
            navigate("/Verify");
        } catch (error) {
            console.error("Error during registration or email verification:", error);
            setIssError(true);
            setError(error.message);
        }
    
        console.log("User data:", user);
    };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center pt-10">
        <form className="flex flex-col items-center justify-center pt-4 border-2 border-gray-300 bg-gray-900 rounded-3xl md:w-1/3 w-5/6" onSubmit={handleSubmit}>
          {isError && <div className="text-red-700 p-2">*{error}</div>}
          <div className="text-white py-2 text-3xl font-semibold">Register</div>
          <input
            type="text"
            placeholder="Username"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            name="username"
            value={user.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="text"
            placeholder="Email"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            name="email"
            value={user.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            name="password"
            value={user.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <Button2 name="Sign Up" type='submit' />
          <div className="text-white py-3">
            <h2>
              Already have Account?{' '}<Link className="text-lg font-semibold text-[#ed8f57]" to={'/Login'}>Sign In</Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;