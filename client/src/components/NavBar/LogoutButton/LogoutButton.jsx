import { Children, cloneElement } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/authSlice.js";
import { Navigate } from "react-router-dom";

const LogoutButton = ({ children }) => {
  const dispatch = useDispatch();
  const child = Children.only(children);

  return <>
    { cloneElement(child,
      {
        onClick: () => {
          dispatch(clearUser());
        }
      }) }
  </>;
};

export default LogoutButton;

LogoutButton.propTypes = {
  children: PropTypes.node.isRequired
}