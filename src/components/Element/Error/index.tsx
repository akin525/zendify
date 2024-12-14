import { Link, useLocation } from "react-router-dom";

export function PermissionError() {
  return (
    <>
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 p-10">
        <h1 className="text-8xl font-bold text-primary">Oops</h1>

        <div className="space-y-1 text-neutral-700 dark:text-neutral-200">
          <p className="text-center text-xl">
            You don't have enough permission to view this page!
          </p>
          <p className="text-center font-semibold">Contact Administrator</p>
        </div>
        <Link
          to="/"
          replace
          className="flex min-h-10 items-center justify-center rounded-lg bg-primary px-6 py-2 text-center text-sm font-bold text-neutral-800 dark:text-neutral-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}

export function PageError() {
  return (
    <>
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 p-10">
        <h1 className="text-8xl font-bold text-primary">Oops</h1>

        <div className="space-y-2 text-neutral-700 dark:text-neutral-200">
          <p className="text-center text-xl font-semibold">Page Not Found!</p>
          <p className="text-center text-sm">Contact Administrator</p>
        </div>
        <Link
          to="/"
          replace
          className="flex min-h-10 items-center justify-center rounded-lg bg-primary px-6 py-2 text-center text-sm font-bold text-neutral-800 dark:text-neutral-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 p-10">
        <h1 className="text-8xl font-bold text-primary">Oops</h1>

        <div className="space-y-2 text-neutral-700">
          <p className="text-center text-xl font-semibold">An error occured!</p>
          {/* <p className="text-center text-sm">Contact Administrator</p> */}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to={pathname}
            className="flex min-h-10 items-center justify-center rounded-lg bg-primary px-6 py-2 text-center text-sm font-bold text-neutral-800 dark:text-neutral-200"
          >
            Refresh
          </Link>
          <Link
            to={"/"}
            className="flex min-h-10 items-center justify-center rounded-lg border border-primary px-6 py-2 text-center text-sm font-bold text-neutral-800 dark:text-neutral-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
