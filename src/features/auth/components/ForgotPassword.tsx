import { ArrowLeft, Information } from "iconsax-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import { forgotPassword } from "../api/forgot-password";

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export function ForgotPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    setServerError(null);
    setLoading(true);

    try {
      const response = await forgotPassword(data);

      if (response) {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      setServerError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px] text-slate-700 dark:text-slate-300">
          <div className="flex justify-center pb-10">
            <img
              src="/xendify.jpg"
              alt=""
              className="h-auto w-full max-w-[100px]"
            />
          </div>

          {success && (
            <div className="mb-4 flex flex-col items-center justify-center gap-2 rounded-lg bg-emerald-500/5 p-4 py-4 text-center text-sm font-medium">
              <Information size="40" className="text-emerald-500" />
              <p className="inline text-emerald-500">
                Instructions to reset your password has been successfully sent
                to your email.
              </p>
            </div>
          )}

          {!success && (
            <>
              <div className="mb-8 flex flex-col gap-1">
                <h3 className="text-2xl font-semibold ">Forgot Password</h3>
                <p className="text-sm">
                  If you forgot your password, well, then we&apos;ll email you
                  instructions to reset your password.
                </p>
              </div>

              {serverError && (
                <div className="mb-4 rounded-lg bg-red-500/5 p-4 py-1 text-center text-sm font-medium">
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
                    {...register("email")}
                    type="email"
                    id="email"
                    disabled={success}
                    onChange={() => setServerError(null)}
                    autoComplete="username"
                    placeholder="Enter your email address"
                    className={`h-12 rounded-lg border bg-white px-4  text-sm dark:border-neutral-400 dark:bg-neutral-900 dark:focus:border-primary/75 ${
                      errors.email?.message
                        ? "border-red-500"
                        : "focus:border-primary"
                    } outline-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={success || !!serverError}
                  className="h-10 rounded-lg bg-primary text-white disabled:bg-primary/50"
                >
                  {loading ? (
                    <BeatLoader color="#fff" size={12} />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-10">
                <Link to="/login" className="text-sm text-primary">
                  <ArrowLeft size="16" className="inline text-primary" />{" "}
                  <span>Return to Login</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
