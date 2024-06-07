import PropTypes from "prop-types";

const SalaryRange = ({ from, to }) => {
  return <>
    { from }-{ to } Ft
  </>;
};

export default SalaryRange;

SalaryRange.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
}