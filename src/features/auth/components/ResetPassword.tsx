import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <>
      <div className="flex justify-center items-center px-4 py-16">
        <div className="max-w-[420px] w-full text-slate-800">
          <div className="flex justify-center pb-10">
            <img
              src="/xendify.jpg"
              alt=""
              className="max-w-[100px] w-full h-auto"
            />
          </div>

          <div className="pb-8 flex flex-col gap-1">
            <h3 className="text-2xl font-semibold ">Sign-In</h3>
            <p className="text-sm">
              Access xendify staff dashboard with your email and password.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex-col flex gap-4"
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border h-12 rounded-lg px-4 text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border h-12 rounded-lg px-4 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white h-10 rounded-lg"
            >
              Sign in
            </button>
          </form>

          <div className="pt-5">
            <Link to="/forgot-password" className="text-sm text-primary">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
