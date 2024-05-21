import NavBar from "../NavBar/NavBar.jsx";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return <>
    <NavBar/>
    <main>
      { children }
    </main>
  </>;
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired
}