import NavButton from "./NavButton/NavButton.jsx";
import { useNavigate } from "react-router-dom";

const NotSignedIn = () => {
  const nav = useNavigate();

  return <>
    <NavButton>Főoldal</NavButton>
    <NavButton onClick={() => nav('/register')}>Regisztráció</NavButton>
    <NavButton onClick={() => nav('/login')}>Bejelentkezés</NavButton>
  </>;
};

export default NotSignedIn;