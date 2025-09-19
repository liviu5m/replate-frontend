import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppContext } from "../../lib/AppContext";

const Header = () => {
  const { user, setToken } = useAppContext();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth/login");
  };

  return (
    <div className="fixed w-full top-0 left-1/2 -translate-x-1/2 bg-white shadow z-50">
      <div className="flex items-center justify-center">
        <div className="container">
          <div className="h-24 flex items-center justify-between px-5">
            <Link to={"/"} className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#22C55E]">
                <h2 className="text-xl font-bold text-white">R</h2>
              </div>
              <h2 className="font-bold text-lg">replate</h2>
            </Link>
            <div>
              <ul className="flex items-center justify-center gap-12">
                <li>
                  <Link to={"/"} className="font-semibold hover:text-[#22C55E]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="font-semibold hover:text-[#22C55E]">
                    About
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="font-semibold hover:text-[#22C55E]">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="font-semibold hover:text-[#22C55E]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="font-semibold text-white bg-[#22C55E] px-10 py-3 rounded-lg cursor-pointer hover:bg-[#eee] hover:text-[#22C55E]">
                  {user?.username}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {user?.role == "NGO" ||
                  user?.role == "DRIVER" ||
                  user?.role == "DONOR" ? (
                    <Link to={`${user?.role.toLowerCase()}/dashboard`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link to={"/profile"}>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => logOut()}
                    className="cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
