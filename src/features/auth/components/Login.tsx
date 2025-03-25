import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Information } from "iconsax-react";
import { login } from "../api/login";
import * as yup from "yup";
import { ThemeSwitcher } from "@/components/Element";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function Login() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setServerError(null);
    setLoading(true);
    try {
      await login(data);
      window.location.href = "/";
    } catch (error) {
      setServerError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px] text-slate-800 dark:text-slate-300">
          <div className="flex justify-center pb-10">
            <img
              src="/xendify.jpg"
              alt=""
              className="h-auto w-full"
            />
          </div>

          <div className="flex flex-col gap-1 pb-6">
            <h3 className="text-2xl font-semibold ">Sign-In</h3>
            <p className="text-sm">
              Access xendify staff dashboard with your email and password.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-lg bg-red-500/5 p-4 py-2 text-center text-sm font-medium">
              <Information size="20" className="inline-flex text-red-500" />{" "}
              {"  "}
              <p className="inline-flex text-red-500">{serverError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="username"
                {...register("email")}
                className={`h-12 rounded-lg border bg-white px-4 text-sm dark:border-neutral-400 dark:bg-neutral-900 dark:bg-neutral-900 dark:focus:border-primary/75 ${
                  errors.email?.message
                    ? "border-red-500"
                    : "focus:border-primary"
                } outline-none`}
              />
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div className="relative flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                {...register("password")}
                className={`h-12 rounded-lg border bg-white px-4 text-sm outline-none  focus:border-primary dark:border-neutral-400 dark:bg-neutral-900 dark:bg-neutral-900 dark:focus:border-primary/75  ${
                  errors.password?.message
                    ? "border-red-500"
                    : "focus:border-primary"
                }`}
              />
              <button
                className="absolute right-4 top-[42px] text-xs"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "hide" : "show"}
              </button>
              <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>

            <button
              type="submit"
              className="flex h-10 items-center justify-center rounded-lg bg-primary text-white"
            >
              {loading ? <BeatLoader color="#fff" size={12} /> : "Sign in"}
            </button>
          </form>

          <div className="pt-5">
            <Link to="/forgot-password" className="text-sm text-primary">
              Forgot password?
            </Link>
          </div>

          <div className="mb-2 mt-10 flex w-full justify-center">
            <ThemeSwitcher showMode />
          </div>
        </div>
      </div>
    </>
  );
}
