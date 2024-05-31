import Employee from "./Employee.jsx";
import Employer from "./Employer.jsx";
import NotSignedIn from "./NotSignedIn.jsx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth = useSelector(state => state.auth.auth);

  return <>
    <div className="navbar bg-primary">
      <div className="navbar-start"></div>
      <div className="navbar-center gap-x-10">
        { auth?.accessToken ? (auth?.user?.role === 'jobseeker' ? <Employee/> : <Employer/>) : <NotSignedIn/> }
      </div>
      <div className="navbar-end"></div>
    </div>
  </>;
};

export default Navbar;