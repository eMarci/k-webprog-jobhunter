import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SalaryRange from "../../SalaryRange/SalaryRange.jsx";

const JobListing = ({ job }) => {
  return <>
    <div className="flex flex-row justify-between border-t-2 pt-5">
      <div className="flex flex-col items-start">
        <p className="font-semibold">{ job.position }</p>
        <p className="text-accent-content">{ job.company }, { job.city }</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          <SalaryRange from={ job.salaryFrom } to={ job.salaryTo }/>
        </p>
        <p className="text-accent-content">{ job.type }</p>
      </div>
    </div>
    <Link className="btn btn-primary btn-md self-end w-1/6" to={ `/job/${ job.id }` }>
      Érdekel ➡️
    </Link>
  </>;
};

export default JobListing;

JobListing.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number,
    company: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string,
    salaryFrom: PropTypes.number,
    salaryTo: PropTypes.number,
    type: PropTypes.string,
    city: PropTypes.string,
    homeOffice: PropTypes.number,
    userId: PropTypes.number
  }).isRequired
};