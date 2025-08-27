import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

const Register = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const registerHandler = (user) => {
  if (
    !user?.firstName?.trim() ||
    !user?.lastName?.trim() ||
    !user?.email?.trim() ||
    !user?.password?.trim()
  ) {
    toast.error("Please fill in all the fields!", {
      position: "bottom-right",
    });
    return;
  }

  axios.post("http://localhost:8000/api/auth/register", {
    fullname: {
      firstname: user.firstName,
      lastname: user.lastName,
    },
    email: user.email,
    password: user.password,
  },{withCredentials: true})
  .then((res) => {
    console.log(res);
    
    toast.success("Registered Successfully!", {
      position: "bottom-right",
    });
    navigate("/login");
  })
  .catch((err) => {
    toast.error(err?.response?.data?.message || "Registration Failed!", {
      position: "bottom-right",
    });
    console.error(err);
  });
};


  return (
    <div className="w-full min-h-screen pt-32 pb-8 flex items-center justify-center px-2 sm:px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="w-full max-w-[98vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[750px] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl text-white rounded-2xl sm:rounded-3xl px-4 sm:px-10 py-8 sm:py-12 flex flex-col gap-7 relative"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 p-1 rounded-full shadow-xl">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2" />
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#fff"
              />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 drop-shadow text-center">
            Create Account
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 text-center">
            Join ChatMate and start your AI journey!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-14 sm:mt-16">
          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label htmlFor="firstName" className="text-base font-semibold">
              First Name
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              type="text"
              placeholder="John"
              className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
              autoComplete="given-name"
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label htmlFor="lastName" className="text-base font-semibold">
              Last Name
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder="Doe"
              className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
              autoComplete="family-name"
            />
          </div>
        </div>


        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="john@example.com"
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-base font-semibold">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer mt-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg tracking-wide"
        >
          Register
        </button>

        <p className="text-center text-xs sm:text-sm mt-2 text-indigo-100">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-300 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
