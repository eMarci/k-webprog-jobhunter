import PropTypes from "prop-types";

const NewExpModal = ({ onSave, updateNew }) => {
  return <>
    <dialog id="exp_new" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Munkatapasztalat hozzáadása</h3>
        <div className="grid gap-4 mt-5 items-center">
          <span>Cég:</span>
          <input onInput={ updateNew } className="input input-bordered input-sm" type="text"
                 name="company"/>
          <span>Pozíció:</span>
          <input onInput={ updateNew } className="input input-bordered input-sm" type="text"
                 name="title"/>
          <span>Időtartam:</span>
          <input onInput={ updateNew } className="input input-bordered input-sm" type="text"
                 name="interval"/>
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

export default NewExpModal;

NewExpModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  updateNew: PropTypes.func.isRequired
}