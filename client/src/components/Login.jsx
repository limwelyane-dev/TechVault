import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useLocation, Link } from "react-router-dom";
import {ArrowRight, Mail, Eye, Lock, EyeOff} from "lucide-react"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  const message = location.state?.message;

  const navigate = useNavigate();

  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      login(data.token);

      navigate("/products");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <section className="flex min-h-screen flex-col">

        <div className="flex justify-end px-4 py-2 mb-2">
          <p className="text-sm text-slate-500">
            New to TechVault?
            <Link
              to="/signup"
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              Create an account
              <ArrowRight
                size={15}
                className="ml-1 inline"
              />
            </Link>
          </p>
        </div>

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
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to your TechVault account
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-slate-100 p-4"
            >

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="user@gmail.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
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
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2">

                  <input
                    type="checkbox"
                    className="
                      h-4 w-4
                      rounded
                      border-slate-300
                      text-blue-600
                      focus:ring-blue-500
                    "
                  />

                  <span className="text-sm text-slate-600">
                    Remember me
                  </span>

                </label>

                <a
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>

              </div>

              {mutation.isError && (
                <p className="text-red-400 text-[12px]">{mutation.error.message}</p>
              )}
              
              <button
                type="submit"
                className="
                  group
                  flex h-12 w-full
                  items-center
                  justify-center
                  mt-2
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
                Sign In

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </button>

            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase text-slate-400">
                Or
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="
                flex h-12 w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border border-slate-200
                bg-white
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
                hover:border-slate-300
              "
            >

              <span className="text-lg font-bold text-blue-600">
                G
              </span>

              Continue with Google

            </button>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-6 text-center text-xs text-slate-400">
              © 2026 TechVault. All rights reserved.
            </p>

          </div>
        </div>

      </section>
  );
}

export default Login;