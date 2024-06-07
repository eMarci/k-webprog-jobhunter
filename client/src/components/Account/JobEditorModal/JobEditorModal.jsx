import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const JobEditorModal = ({ onSave, selected, updateSelected }) => {
  const { register, setValue } = useForm();

  useEffect(() => {
    setValue("homeOffice", selected.homeOffice);
  }, [setValue, selected.homeOffice]);

  return <>
    <dialog id="job_editor" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Álláshirdetés szerkesztése</h3>
        <div className="grid gap-4 mt-5 items-center">
          <span>Város:</span>
          <input onInput={ updateSelected } className="input input-bordered input-sm" type="text"
                 name="city" value={ selected.city }/>
          <span>Leírás:</span>
          <textarea onInput={ updateSelected } className="textarea textarea-bordered" name="description" cols="20"
                    rows="3" value={ selected.description }/>
          <span>Home Office:</span>
          <input onInput={ updateSelected } className="checkbox checkbox-sm checkbox-secondary" name="homeOffice"
                 type="checkbox" { ...register('homeOffice') }/>
          <span>Pozíció:</span>
          <input onInput={ updateSelected } className="input input-bordered input-sm" type="text"
                 name="position" value={ selected.position }/>
          <span>Bérsáv:</span>
          <div className="flex flex-row gap-x-3">
            <input onInput={ updateSelected } className="input input-bordered input-sm w-[50%]" type="number"
                   name="salaryFrom" value={ selected.salaryFrom } min={ 0 }/>
            <input onInput={ updateSelected } className="input input-bordered input-sm w-[50%]" type="number"
                   name="salaryTo" value={ selected.salaryTo } min={ 0 }/>
          </div>
          <span>Típus:</span>
          <select onChange={ updateSelected } className="select select-bordered select-sm" name="type"
                  value={ selected.type }>
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

export default JobEditorModal;

JobEditorModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    city: PropTypes.string,
    company: PropTypes.string,
    description: PropTypes.string,
    homeOffice: PropTypes.bool,
    id: PropTypes.number,
    position: PropTypes.string,
    salaryFrom: PropTypes.number,
    salaryTo: PropTypes.number,
    type: PropTypes.string,
    userId: PropTypes.number
  }).isRequired,
  updateSelected: PropTypes.func.isRequired
}