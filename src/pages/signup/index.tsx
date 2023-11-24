import Layout from "@/components/layout";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type User = {
  username: string;
  room: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowToggleShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<User>({
    defaultValues: {
      username: "",
      room: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<User> = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully");
        navigate("/signin");
        // You can redirect to the sign-in page or handle it as needed
      } else {
        console.error("Sign up failed:", data.message);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <Layout>
      <div className="p-4 flex flex-col gap-6 justify-center w-full">
        <div className="text-4xl text-left">
          <h2 className="font-light ">Sign Up and</h2>
          <p className="font-semibold text-[#b6ff00]">Start exercise.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <input
              {...register("username", {
                required: true,
              })}
              name="username"
              type="text"
              placeholder="Username"
              className="rounded-full bg-transparent border border-[#b6ff00] w-full p-4"
            />
          </div>

          <div>
            <input
              {...register("room", {
                required: true,
              })}
              name="room"
              type="text"
              placeholder="Room"
              className="rounded-full bg-transparent border border-[#b6ff00] w-full p-4"
            />
          </div>

          <div className="relative">
            <input
              {...register("password", {
                required: true,
              })}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="rounded-full bg-transparent border border-[#b6ff00] w-full p-4"
            />

            <button
              type="button"
              onClick={handleShowToggleShowPassword}
              className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="rounded-full bg-[#b6ff00] w-full p-4 text-black font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="w-full flex justify-center">
          <Link to="/signin">
            Already have an account?{" "}
            <span className="text-[#b6ff00]">Sign In</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
