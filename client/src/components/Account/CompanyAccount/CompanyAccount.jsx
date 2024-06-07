import {
  useCreateJobMutation,
  useDelJobMutation,
  useGetJobsQuery,
  useModifyJobMutation
} from "../../../store/jobhunterApi.js";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner/Spinner.jsx";
import SalaryRange from "../../SalaryRange/SalaryRange.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import JobEditorModal from "../JobEditorModal/JobEditorModal.jsx";
import NewJobModal from "../NewJobModal/NewJobModal.jsx";

const CompanyAccount = () => {
  const auth = useSelector(state => state.auth.auth);
  const { data: jobs, isLoading, isSuccess, error, refetch } = useGetJobsQuery({ company: auth.user.fullname });
  const [modifyJob, modifyStatus] = useModifyJobMutation();
  const [addJob, addStatus] = useCreateJobMutation();
  const [delJob, delStatus] = useDelJobMutation();
  const [selectedJob, setSelectedJob] = useState({
    city: '',
    company: '',
    description: '',
    homeOffice: false,
    id: -1,
    position: '',
    salaryFrom: -1,
    salaryTo: -1,
    type: '',
    userId: -1
  });
  const [newJob, setNewJob] = useState({
    city: '',
    company: '',
    description: '',
    homeOffice: false,
    position: '',
    salaryFrom: -1,
    salaryTo: -1,
    type: '',
  });

  const openEditorDialog = (index) => {
    const job = jobs.data[index];
    setSelectedJob({
      id: job.id,
      userId: job.userId,
      city: job.city,
      company: job.company,
      description: job.description,
      homeOffice: job.homeOffice === 1,
      position: job.position,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      type: job.type,
    });
    document.getElementById('job_editor').showModal();
  }

  const updateSelected = (e) => {
    if (e.target.name === 'homeOffice') {
      setSelectedJob(state => ({
        ...state,
        [e.target.name]: e.target.checked
      }));
    } else if (e.target.name === 'salaryFrom' || e.target.name === 'salaryTo') {
      const value = parseInt(e.target.value);
      setSelectedJob(state => ({
        ...state,
        [e.target.name]: isNaN(value) ? 0 : value
      }));
    } else {
      setSelectedJob(state => ({
        ...state,
        [e.target.name]: e.target.value
      }));
    }
  }

  const handleSaveEdit = () => {
    modifyJob(selectedJob).then(refetch);
  }

  const openNewDialog = () => {
    setNewJob({
      city: '',
      company: auth.user.fullname,
      description: '',
      homeOffice: false,
      position: '',
      salaryFrom: 0,
      salaryTo: 0,
      type: '',
    });
    document.getElementById('job_new').showModal();
  }

  const updateNew = (e) => {
    if (e.target.name === 'homeOffice') {
      setNewJob(state => ({
        ...state,
        [e.target.name]: e.target.checked
      }));
    } else if (e.target.name === 'salaryFrom' || e.target.name === 'salaryTo') {
      const value = parseInt(e.target.value);
      setNewJob(state => ({
        ...state,
        [e.target.name]: isNaN(value) ? 0 : value
      }));
    } else {
      setNewJob(state => ({
        ...state,
        [e.target.name]: e.target.value
      }));
    }
  }

  const handleSaveNew = () => {
    addJob(newJob).then(refetch);
  }

  const handleDel = (id) => {
    delJob(id).then(refetch);
  };

  return <>
    <div className="flex flex-col w-[70%] m-auto items-center mt-10 text-2xl font-semibold gap-y-8">
      <span>A Te hirdetéseid:</span>
      { isLoading && <Spinner/> }
      { isSuccess && jobs.data.map((job, index) => {
        return (
          <div className="flex flex-row justify-between bg-neutral shadow-sm p-10 w-full" key={ index }>
            <div className="flex flex-col items-start gap-y-2">
              <span>{ job.position }</span>
              <div className="flex flex-row text-sm items-center">
                <div>{ job.type }</div>
                <div className="divider divider-horizontal divider-primary/80 mx-2"></div>
                { job.homeOffice === 1 &&
                  <>
                    <div>Home Office</div>
                    <div className="divider divider-horizontal divider-primary/80 mx-2"></div>
                  </> }
                <div><SalaryRange from={ job.salaryFrom } to={ job.salaryTo }/></div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-3">
              <button onClick={ () => openEditorDialog(index) } className="btn btn-sm">Szerkesztés ✏️</button>
              <Link to={ `/job/${ job.id }` } className="btn btn-sm">Megtekintés 🔍</Link>
              <button onClick={ () => handleDel(job.id) } className="btn btn-sm btn-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-trash" viewBox="0 0 16 16">
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </button>
            </div>
          </div>
        );
      }) }
      <button onClick={openNewDialog} className="btn btn-md btn-secondary">Álláshirdetés létrehozása</button>
    </div>
    <JobEditorModal onSave={ handleSaveEdit } selected={ selectedJob } updateSelected={ updateSelected }/>
    <NewJobModal onSave={ handleSaveNew } updateNew={ updateNew }/>
  </>;
};

export default CompanyAccount;