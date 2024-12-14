import { Route, Routes } from "react-router-dom";
import Businesses from "./businesses";
import { PageError } from "@/components/Element/Error";

// import MyBusiness from "./my-business";

export function BusinessesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Businesses />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
