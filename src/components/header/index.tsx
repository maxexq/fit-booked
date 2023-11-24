import FitBoLogo from "@/assets/logo/Fitbo-logo.svg";
import { Navigate, useNavigate } from "react-router-dom";

// type Props = {};

const Header = () => {
  const navigate = useNavigate();
  const isAuthen = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div className="absolute top-0 left-0 px-6 py-2 w-full flex justify-between">
      <img src={FitBoLogo} alt="Fitbo logo" />

      {isAuthen && (
        <div>
          <button
            onClick={handleSignOut}
            className="rounded-full bg-white py-2.5 px-4 text-black"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
