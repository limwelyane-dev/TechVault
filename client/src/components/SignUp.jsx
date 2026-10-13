import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

import { registerUser } from "../services/api";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
  mutationFn: registerUser,

  onSuccess: () => {
    navigate("/login", {
      state: {
        message:
          "Account created successfully. Please log in.",
      },
    });
  },
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(form);
  };

  return (
    <section className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center  px-6 pb-8 sm:px-6">

          <div className="w-full max-w-md">

            <div className="mb-10 flex justify-center lg:hidden">
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                  T <span>{"<"}</span>
                </div>

                <span className="text-2xl font-bold text-slate-900">
                  TECH<span className="text-blue-600">VAULT</span>
                </span>

              </div>
            </div>

            <div className="flex flex-col justify-center items-center mb-8 mt-4">

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Create Account
              </h2>

              <p className="mt-2 text-slate-500">
                Create your TechVault account
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-slate-100 p-4">
                <div>
                  <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                    UserName
                  </label>

                  <div className="relative">

                    <User size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="eg. Jhon"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="
                      h-10 w-full rounded-xl
                      border border-slate-200
                      bg-white
                      pl-12 pr-4
                      text-sm text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    />
                  </div>

                </div>

                <div>
                  <label htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                    </label>

                  <div className="relative">
                    <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="user@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="
                      h-10 w-full rounded-xl
                      border border-slate-200
                      bg-white
                      pl-12 pr-4
                      text-sm text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    />
                  </div>
                </div>

                <div>
                  <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="
                      h-10 w-full rounded-xl
                      border border-slate-200
                      bg-white
                      pl-12 pr-12
                      text-sm text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    />

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition
                      hover:text-slate-700
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  </div>
                </div>

                <button
                type="submit"
                disabled={mutation.isPending}
                className="
                  group
                  flex h-12 w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  hover:bg-blue-700
                  hover:shadow-blue-600/30
                  active:scale-[0.99]
                "
                >
                {mutation.isPending
                    ? "Creating account..."
                    : "Sign Up"}
                </button>
            </form>

            {mutation.isError && (
                <p className="text-red-600">{mutation.error.message} , Try Again!</p>
            )}

            <p>
                Already have an account?{" "}
                <Link to="/login" className="ml-2 font-semibold text-blue-600 hover:text-blue-700">Login</Link>
            </p>
            <p className="mt-8 text-center text-xs text-slate-400">
              © 2026 TechVault. All rights reserved.
            </p>

          </div>
        </div>
    </section>
  );
}

export default SignUp;