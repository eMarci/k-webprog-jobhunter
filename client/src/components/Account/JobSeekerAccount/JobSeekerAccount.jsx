import { useSelector } from "react-redux";
import { useAddExpMutation, useGetUserExpQuery, useModifyExpMutation } from "../../../store/jobhunterApi.js";
import { useState } from "react";
import ExpEditorModal from "../ExperienceEditorModal/ExpEditorModal.jsx";
import NewExpModal from "../NewExperienceModal/NewExpModal.jsx";
import Spinner from "../../Spinner/Spinner.jsx";

const JobSeekerAccount = () => {
  const { data: experiences, isLoading, isSuccess, error, refetch } = useGetUserExpQuery();
  const [modifyExp, modifyExpStatus] = useModifyExpMutation();
  const [addExp, addExpStatus] = useAddExpMutation();
  const auth = useSelector(state => state.auth.auth);
  const [selectedExp, setSelectedExp] = useState({
    company: '',
    id: -1,
    interval: '',
    title: ''
  });
  const [newExp, setNewExp] = useState({
    company: '',
    interval: '',
    title: ''
  })

  const translate = (roleName) => {
    if (roleName === 'jobseeker') {
      return 'Munkavállaló';
    }
    return 'Munkáltató';
  }

  const openEditorDialog = (index) => {
    const exp = experiences.data[index];
    setSelectedExp({
      id: exp.id,
      company: exp.company,
      title: exp.title,
      interval: exp.interval
    });
    document.getElementById('exp_editor').showModal();
  }

  const updateSelected = (e) => {
    setSelectedExp(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  }

  const handleSave = () => {
    modifyExp({
      expId: selectedExp.id,
      body: selectedExp
    }).then(refetch);
  };

  const openNewDialog = () => {
    setNewExp({
      company: '',
      interval: '',
      title: ''
    });
    document.getElementById('exp_new').showModal();
  };

  const updateNew = (e) => {
    setNewExp(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  }

  const handleNew = () => {
    console.log("LEOJOJ")
    addExp(newExp).then(refetch);
  };

  return <>
    <div className="flex flex-col items-center">
      <table className="text-neutral-content table w-[50%] bg-neutral rounded-none mt-10 shadow-lg">
        <tbody>
        <tr className="border-0">
          <td colSpan="2" className="text-lg font-bold">Személyes adatok</td>
        </tr>
        <tr className="bg-base-100 border-0">
          <td>Név</td>
          <td>{ auth.user.fullname }</td>
        </tr>
        <tr className="border-0">
          <td>Email</td>
          <td>{ auth.user.email }</td>
        </tr>
        <tr className="bg-base-100 border-0">
          <td>Szerepkör</td>
          <td>{ translate(auth.user.role) }</td>
        </tr>
        <tr className="border-0">
          <td colSpan="2" className="font-bold">Munkatapasztalatok</td>
        </tr>
        { isLoading && (
          <tr className="border-0">
            <td colSpan="2">
              <div className="flex flex-row justify-center">
                <Spinner/>
              </div>
            </td>
          </tr>) }
        { !error ?? (
          <tr className="border-0">
            <td colSpan="2">
              <p>Hiba történt az elemek betöltése közben.</p>
            </td>
          </tr>) }
        { isSuccess && experiences.data.map((exp, index) => {
          return (
            <tr key={ index } className="border-0">
              <td>{ exp.company }</td>
              <td>
                <div className="flex flex-row justify-between items-center">
                  { exp.interval }: { exp.title }
                  <button onClick={ () => openEditorDialog(index) }
                          className="btn btn-xs">Szerkesztés ✏️
                  </button>
                </div>
              </td>
            </tr>);
        }) }
        <tr>
          <td colSpan="2">
            <div className="flex flex-row justify-end">
              <button onClick={ openNewDialog }
                className="btn btn-sm btn-secondary">Hozzáadás</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <NewExpModal onSave={ handleNew } updateNew={ updateNew }/>
    <ExpEditorModal onSave={ handleSave } selected={ selectedExp } updateSelected={ updateSelected }/>
  </>
};

export default JobSeekerAccount;