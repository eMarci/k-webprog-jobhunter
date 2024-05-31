import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavButton = ({ children, onClick, to }) => {
  return <>
    <Link to={ to }>
      <div onClick={ onClick }
           className="btn bg-primary text-primary-content border-none hover:bg-secondary text-xl px-7">
        { children }
      </div>
    </Link>
  </>;
};

export default NavButton;

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string
};