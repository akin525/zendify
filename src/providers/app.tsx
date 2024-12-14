import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/components/Element/Modal";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/Element/Error";
import { ThemeProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <ModalProvider />
        <AppRoutes />
      </>
    ),
    ErrorBoundary: ErrorBoundary,
  },
]);

export const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* <ModalProvider /> */}
        <ToastContainer />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
