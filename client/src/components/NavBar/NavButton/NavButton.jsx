import PropTypes from "prop-types";

const NavButton = ({ children, onClick }) => {
  return <>
    <div onClick={onClick} className="btn bg-primary text-primary-content border-none hover:bg-secondary text-xl px-7">
      { children }
    </div>
  </>;
};

export default NavButton;

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};