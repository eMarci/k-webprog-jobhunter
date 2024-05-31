import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const UseAuthentication = ({ children }) => {
  const auth = useSelector(state => state.auth.auth);
  console.log(auth);
  if (!auth?.accessToken) {
    return <Navigate to="/login"/>;
  }
  return <>
    { children }
  </>;
};

export default UseAuthentication;

UseAuthentication.propTypes = {
  children: PropTypes.node.isRequired
}