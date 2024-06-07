import { useSelector } from "react-redux";
import JobSeekerAccount from "./JobSeekerAccount/JobSeekerAccount.jsx";
import CompanyAccount from "./CompanyAccount/CompanyAccount.jsx";

const Account = () => {
  const auth = useSelector(state => state.auth.auth);

  return <>
    <div className="text-5xl font-bold text-neutral-content p-6 w-full bg-neutral shadow-sm">
      Profilom
    </div>
    { auth.user.role === 'jobseeker' ? <JobSeekerAccount/> : <CompanyAccount/> }
  </>;
};

export default Account;