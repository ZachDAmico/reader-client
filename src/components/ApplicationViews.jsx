import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { AllBooks } from "../pages/AllBooks";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { CreateBook } from "../pages/CreateBook";

export const ApplicationViews = () => {
  return (
    // don't forget this is where the url path is defined. not back end
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />} />
      <Route path="/" element={<AllBooks />} />
      <Route path="/create" element={<CreateBook />} />
    </Routes>
  );
};
