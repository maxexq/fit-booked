import { Routes, Route } from "react-router-dom";

// * Pages -------------------------------------------------------------------------
import SignIn from "@/pages/signin";
import Notfound from "@/pages/notfound";
import SignUp from "@/pages/signup";
import PrivateRoute from "./PrivateRoute";
import Home from "@/pages/home";

const RenderRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default RenderRoutes;
