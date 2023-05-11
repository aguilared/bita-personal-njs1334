import Link from "next/link";
import Container from "../Container";
import useUser from "../../hooks/useUser";
import axios from "axios";
import router from "next/router";

const SafeUser = "false";
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/bitacora/bita_events/bitaEventsCard", label: "ListBitaEventsCard" },
  { href: "/login", label: "Login" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { isUser, loadUser, clearUser } = useUser(); //to Global
  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/");
    clearUser();
  };

  return (
    <div className="fixed w-full">
      <div
        className="
            flex 
            flex-row 
            items-center 
            justify-between
            px-2
            gap-3
            md:gap-0
            border-b-[1px]
          "
      >
        {links.map(({ key, href, label }) => (
          <Link
            key={key}
            href={href}
            className="block mt-4 sm:inline-block sm:mt-0 hover:text-blue mr-4"
          >
            {label}
          </Link>
        ))}
        {isUser ? (
          <button
            onClick={() => logout()}
            className="inline-block text-sm px-4 py-2 leading-none border rounded border-black hover:border-transparent hover:text-black-500 hover:bg-gray mt-4 sm:mt-0"
          >
            LogOut
          </button>
        ) : (
          <Link
            href="login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded border-black hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
