import NavButton from "./NavButton/NavButton.jsx";
import Employee from "./Employee.jsx";
import Employer from "./Employer.jsx";
import NotSignedIn from "./NotSignedIn.jsx";

const Navbar = () => {
  return <>
    <div className="navbar bg-primary">
      <div className="navbar-start"></div>
      <div className="navbar-center gap-x-10">
        { true ? (true ? <Employee/> : <Employer/>) : <NotSignedIn/> }
      </div>
      <div className="navbar-end"></div>
    </div>
  </>;
};

export default Navbar;