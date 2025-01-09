import ModeSwitcher from "./mode-switcher";
import Title from "./title";
import UserButton from "./user-button";

const NavBar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 shadow-md">
      <Title />
      <div className="flex items-center gap-2">
        <ModeSwitcher />
        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;
