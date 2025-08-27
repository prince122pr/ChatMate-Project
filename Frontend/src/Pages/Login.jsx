import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const loginHandler = (data) => {
    if (!data?.email?.trim() || !data?.password?.trim()) {
      toast.error("Please fill in all the fields!", {
        position: "bottom-right",
      });
      return;
    }
    toast.success("Login Successful!", {
      position: "bottom-right",
    });
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center pt-24 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-full max-w-[550px] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl text-white rounded-3xl px-10 py-12 flex flex-col gap-7 relative"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-gradient-to-tr from-purple-400 via-blue-500 to-green-400 p-1 rounded-full shadow-xl">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2" />
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#fff"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-2 drop-shadow text-center">
            Welcome Back
          </h2>
          <p className="text-indigo-100 text-sm mt-1 text-center">
            Login to ChatMate and continue your AI journey!
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-16">
          <label htmlFor="email" className="text-base font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="john@example.com"
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-400 transition"
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
            className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-400 transition"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 hover:from-purple-500 hover:to-green-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide"
        >
          Login
        </button>

        <p className="text-center text-sm mt-2 text-indigo-100">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-300 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
