import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModalStore } from "@/stores/modal";

const schema = yup.object().shape({
  current_password: yup.string().required("Password is required"),
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "New Password and Confirm New Password must match!",
    )
    .required("Confirm Password is required"),
});

export function ChangePassword() {
  const { openModal } = useModalStore();
  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // console.log(data);

    openModal({ action: "change-password", data });
  };

  return (
    <>
      <div className="my-10 mb-20 w-full md:max-w-[600px]">
        <h3 className="border-b py-2 text-lg font-semibold">Change Password</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="relative h-full w-full">
            <input
              {...register("current_password")}
              type={showCurrPassword ? "text" : "password"}
              className={`${
                errors?.current_password?.message
                  ? "border-red-500"
                  : "focus:border-primary"
              } h-12 w-full rounded-lg border bg-white p-1 px-4 pr-16 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200`}
              placeholder="Current Password"
              autoComplete="current-password"
            />
            <p
              className="absolute right-4 top-3 cursor-pointer select-none text-base font-semibold text-primary"
              onClick={() => setShowCurrPassword(!showCurrPassword)}
            >
              {showCurrPassword ? "hide" : "show"}
            </p>

            <p className="text-xs text-red-500">
              {errors?.current_password?.message}
            </p>
          </div>

          <div className="relative h-full w-full">
            <input
              {...register("password")}
              type={showNewPassword ? "text" : "password"}
              className={`${
                errors?.password?.message
                  ? "border-red-500"
                  : "focus:border-primary"
              } h-12 w-full rounded-lg border bg-white p-1 px-4 pr-16 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200`}
              placeholder="New Password"
              autoComplete="new-password"
            />
            <p
              className="absolute right-4 top-3 cursor-pointer select-none text-base font-semibold text-primary"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "hide" : "show"}
            </p>

            <p className="text-xs text-red-500">{errors?.password?.message}</p>
          </div>

          <div className="relative h-full w-full">
            <input
              {...register("password_confirmation")}
              type={showNewPassword ? "text" : "password"}
              className={`${
                errors?.password_confirmation?.message
                  ? "border-red-500"
                  : "focus:border-primary"
              } h-12 w-full rounded-lg border bg-white p-1 px-4 pr-16 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200`}
              placeholder="Confirm New Password"
              autoComplete="new-password"
            />

            <p
              className="absolute right-4 top-3 cursor-pointer select-none text-base font-semibold text-primary"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "hide" : "show"}
            </p>

            <p className="text-xs text-red-500">
              {errors?.password_confirmation?.message}
            </p>
          </div>

          <div className="flex w-full justify-start">
            <button
              type="submit"
              className="h-12 w-max rounded-full bg-primary px-6 font-semibold text-white"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
