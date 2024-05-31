import NavButton from "./NavButton/NavButton.jsx";
import LogoutButton from "./LogoutButton/LogoutButton.jsx";

const Employee = () => {
  return <>
    <NavButton to="/home">Főoldal</NavButton>
    <NavButton to="/account">Profilom</NavButton>
    <LogoutButton>
      <NavButton>Kijelentkezés</NavButton>
    </LogoutButton>
  </>;
};

export default Employee;