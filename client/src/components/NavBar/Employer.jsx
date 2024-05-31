import NavButton from "./NavButton/NavButton.jsx";
import LogoutButton from "./LogoutButton/LogoutButton.jsx";

const Employer = () => {
  return <>
    <NavButton to="/home">Főoldal</NavButton>
    <NavButton to="/account">Profilom</NavButton>
    <NavButton>Álláshirdetés hozzáadása</NavButton>
    <LogoutButton>
      <NavButton>Kijelentkezés</NavButton>
    </LogoutButton>
  </>;
};

export default Employer;