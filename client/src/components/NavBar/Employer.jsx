import NavButton from "./NavButton/NavButton.jsx";
import LogoutButton from "./LogoutButton/LogoutButton.jsx";

const Employer = () => {
  return <>
    <NavButton>Főoldal</NavButton>
    <NavButton>Profilom</NavButton>
    <NavButton>Álláshirdetés hozzáadása</NavButton>
    <LogoutButton>
      <NavButton>Kijelentkezés</NavButton>
    </LogoutButton>
  </>;
};

export default Employer;