import {Link, useLocation} from "react-router-dom";
import {Home, User, PlusCircle,Search,LayoutDashboard} from "lucide-react";

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    {icon: Home, path: "/", label: "Home"},
    { icon: Search, path: "/search", label: "Search" },
    {icon: PlusCircle, path: "/create", label: "Create"},

    {icon: User, path: "/profile", label: "Profile"},
    {icon: LayoutDashboard, path: "/dashboard", label: "Dashboard"},

  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({icon: Icon, path, label}) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center w-full h-full text-sm ${
              location.pathname === path ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
            }`}>
            <Icon className="w-6 h-6 mb-1" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
