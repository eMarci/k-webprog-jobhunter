import PropTypes from "prop-types";

const NewJobModal = ({ onSave, updateNew }) => {
  return <>
    <dialog id="job_new" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Álláshirdetés létrehozása</h3>
        <div className="grid gap-4 mt-5 items-center">
          <span>Város:</span>
          <input onInput={ updateNew } className="input input-bordered input-sm" type="text"
                 name="city"/>
          <span>Leírás:</span>
          <textarea onInput={ updateNew } className="textarea textarea-bordered" name="description" cols="20"
                    rows="3"/>
          <span>Home Office:</span>
          <input onInput={ updateNew } className="checkbox checkbox-sm checkbox-secondary" name="homeOffice"
                 type="checkbox"/>
          <span>Pozíció:</span>
          <input onInput={ updateNew } className="input input-bordered input-sm" type="text"
                 name="position"/>
          <span>Bérsáv:</span>
          <div className="flex flex-row gap-x-3">
            <input onInput={ updateNew } className="input input-bordered input-sm w-[50%]" type="number"
                   name="salaryFrom" min={ 0 }/>
            <input onInput={ updateNew } className="input input-bordered input-sm w-[50%]" type="number"
                   name="salaryTo" min={ 0 }/>
          </div>
          <span>Típus:</span>
          <select onChange={ updateNew } className="select select-bordered select-sm" name="type">
            <option value="full-time">
              Teljes munkaidó
            </option>
            <option value="part-time">
              Részmunkaidó
            </option>
            <option value="internship">
              Gyakornok
            </option>
            full-time, part-time, internship
          </select>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={ onSave } className="btn mr-4 btn-secondary btn-sm">Mentés</button>
            <button className="btn btn-sm">Elvetés</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
};

export default NewJobModal;

NewJobModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  updateNew: PropTypes.func.isRequired
}