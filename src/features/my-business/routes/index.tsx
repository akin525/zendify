import { Route, Routes } from "react-router-dom";
import MyBusiness from "./my-business";
import { PageError } from "@/components/Element/Error";
import { Business } from "@/features/businesses";

export function MyBusinessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyBusiness />} />
      <Route path="/:nameId" element={<Business />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
