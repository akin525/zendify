import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useUser } from "@/hooks/useUser";

export const AppRoutes = () => {
  const { user } = useUser();

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return element;
};
