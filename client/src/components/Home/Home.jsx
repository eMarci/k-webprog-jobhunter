import { useGetAllJobsQuery } from "../../store/jobhunterApi.js";
import JobListing from "./JobListing/JobListing.jsx";

const Home = () => {
  const initialJobs = useGetAllJobsQuery();
  const anyInitialResult = () => initialJobs.data.total !== 0;

  return <>
    <div className="text-5xl font-bold text-neutral-content p-6 w-full bg-neutral shadow-sm">
      Főoldal
    </div>
    <div className="flex flex-col items-center mt-10 w-[60%] m-auto">
      <div className="flex flex-col items-start gap-y-3 w-full">
        <div>
          <p className="text-xl font-bold text-accent-content">Böngéssz az állások között:</p>
        </div>
        <div className="flex flex-row justify-start gap-x-5 w-full">
          <input className="input input-bordered input-md bg-neutral shadow-sm w-full" type="text"/>
          <button className="btn btn-md btn-secondary">Keresés</button>
          <button className="btn btn-md btn-outline border-gray-400">Szűrés</button>
        </div>
      </div>
      { initialJobs.isLoading && <span className="loading loading-spinner loading-lg mt-10"></span> }
      { !initialJobs.error ?? <p className="mt-10">Hiba történt a hirdetések betöltése közben.</p> }
      { initialJobs.isSuccess && !anyInitialResult() &&
        <p className="mt-10">Nincsenek álláshirdetések a megadott feltételekkel.</p> }
      { initialJobs.isSuccess && anyInitialResult() &&
        <>
          <div className="flex flex-col mt-10 w-full gap-y-5">
            <div className="flex flex-row justify-between">
              <p className="font-bold text-gray-500 uppercase">Állás neve</p>
              <p className="font-bold text-gray-500 uppercase">Bérsáv</p>
            </div>
            { initialJobs.data.data.map((job, index) => <JobListing key={ index } job={ job }/>) }
          </div>
        </>
      }
    </div>
  </>
};

export default Home;