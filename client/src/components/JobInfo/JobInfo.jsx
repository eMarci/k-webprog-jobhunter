import { useParams } from "react-router-dom";
import { useApplyForJobMutation, useGetApplicantsForJobQuery, useGetJobsQuery } from "../../store/jobhunterApi.js";
import SalaryRange from "../SalaryRange/SalaryRange.jsx";
import { useSelector } from "react-redux";
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert.jsx";
import ErrorAlert from "../Alert/ErrorAlert/ErrorAlert.jsx";

const JobInfo = () => {
  const auth = useSelector(state => state.auth.auth);
  const { id: jobId } = useParams();
  const { data, isLoading, error } = useGetJobsQuery({ id: jobId });
  const { data: applicants, isLoadingApplicants, errorApplicants, refetch } = useGetApplicantsForJobQuery(jobId);
  const [applyForJob, applyStatus] = useApplyForJobMutation();
  const job = () => {
    return data.data[0];
  }

  const hasAppliedAlready = () => {
    if (applicants === undefined) return true;
    return applicants.some((user) => user.userId === auth.user.id);
  };

  const handleApply = () => {
    applyForJob(parseInt(jobId)).then(refetch);
  }

  if (isLoading) {
    return <>
      <span className="loading loading-spinner loading-lg mt-10"></span>
    </>;
  } else if (error) {
    return <>
      <p>Hiba történt az állás lekérdezése közben.</p>
    </>;
  }
  return <>
    <div className="flex flex-row justify-between text-neutral-content p-6 w-full bg-neutral shadow-sm">
      <div className="flex flex-row items-center gap-x-10 text-5xl font-bold ">
        <span>{ job().position } @ { job().company }</span>
        { job().homeOffice !== 1 && <span className="badge badge-success badge-lg py-4 shadow-lg">🏠 Home Office</span> }
      </div>
      <div className="flex flex-col items-end gap-y-2 text-2xl px-10">
        <p className="text-neutral-content font-semibold">
          <SalaryRange from={ job().salaryFrom } to={ job().salaryTo }/>
        </p>
        <p className="text-accent-content font-normal">{ job().type }</p>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <table className="text-neutral-content table w-[50%] bg-neutral rounded-none mt-10 shadow-lg">
        <tbody>
        <tr className="border-0">
          <td colSpan={ 2 } className="text-lg font-bold">Állás adatai</td>
        </tr>
        <tr className="bg-base-100 border-0">
          <td>Cég</td>
          <td>{ job().company }</td>
        </tr>
        <tr className="border-0">
          <td>Pozíció</td>
          <td>{ job().position }</td>
        </tr>
        <tr className="bg-base-100 border-0">
          <td>Leírás</td>
          <td>{ job().description }</td>
        </tr>
        <tr className="border-0">
          <td>Fizetési sáv</td>
          <td>Bruttó <SalaryRange from={ job().salaryFrom } to={ job().salaryTo }/></td>
        </tr>
        <tr className="bg-base-100 border-0">
          <td>Foglalkoztatás típusa</td>
          <td>{ job().type }</td>
        </tr>
        <tr className="border-0">
          <td>Település</td>
          <td>{ job().city }</td>
        </tr>
        <tr className="bg-base-100 border-0">
          <td>Home Office</td>
          <td>{ job().homeOffice === 0 ? 'Van' : 'Nincs' }</td>
        </tr>
        </tbody>
      </table>
      { auth?.accessToken && auth?.user?.role === 'jobseeker' && !errorApplicants &&
        <button onClick={ handleApply } disabled={ isLoadingApplicants || hasAppliedAlready() }
                className="btn btn-md text-lg btn-secondary mt-10 mb-5">{
          applyStatus.isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Jelentkezés'
        }</button>
      }
      <SuccessAlert condition={ applyStatus.isSuccess }>
        Sikeres jelentkezés!
      </SuccessAlert>
      <ErrorAlert condition={ applyStatus.error !== undefined }>
        Sikertelen jelentkezés.
      </ErrorAlert>
    </div>
  </>;
};

export default JobInfo;