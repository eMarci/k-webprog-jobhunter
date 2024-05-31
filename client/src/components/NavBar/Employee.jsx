import NavButton from "./NavButton/NavButton.jsx";
import LogoutButton from "./LogoutButton/LogoutButton.jsx";

const Employee = () => {
  return <>
    <NavButton>Főoldal</NavButton>
    <NavButton>Profilom</NavButton>
    <LogoutButton>
      <NavButton>Kijelentkezés</NavButton>
    </LogoutButton>
  </>;
};

export default Employee;