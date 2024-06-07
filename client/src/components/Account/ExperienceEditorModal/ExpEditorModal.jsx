import PropTypes from "prop-types";

const ExpEditorModal = ({ selected, updateSelected, onSave }) => {
  return <>
    <dialog id="exp_editor" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Munkatapasztalat szerkesztése</h3>
        <div className="grid gap-4 mt-5 items-center">
          <span>Cég:</span>
          <input onInput={ updateSelected } className="input input-bordered input-sm" type="text"
                 name="company" value={ selected.company }/>
          <span>Pozíció:</span>
          <input onInput={ updateSelected } className="input input-bordered input-sm" type="text"
                 name="title" value={ selected.title }/>
          <span>Időtartam:</span>
          <input onInput={ updateSelected } className="input input-bordered input-sm" type="text"
                 name="interval" value={ selected.interval }/>
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

export default ExpEditorModal;

ExpEditorModal.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    interval: PropTypes.string.isRequired,
  }).isRequired, updateSelected: PropTypes.func.isRequired, onSave: PropTypes.func.isRequired
}