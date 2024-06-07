import NavButton from "./NavButton/NavButton.jsx";

const NotSignedIn = () => {
  return <>
    <NavButton to="/home">Főoldal</NavButton>
    <NavButton to="/register">Regisztráció</NavButton>
    <NavButton to="/login">Bejelentkezés</NavButton>
  </>;
};

export default NotSignedIn;