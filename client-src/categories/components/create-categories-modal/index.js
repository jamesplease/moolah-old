import _ from 'lodash';
import React from 'react';

export default function CreateCategoriesModal(props) {
  function onClickCancelBtn(e) {
    e.preventDefault();
    _.result(props, 'onClickCancel');
  }

  function onClickCreateBtn(e) {
    e.preventDefault();
    _.result(props, 'onClickCreate');
  }

  return (
    <div className="create-categories-modal">
      <h1 className="modal-title">
        New Category
      </h1>
      <form>
        <div className="form-row">
          <div className="create-categories-modal-emoji-select">
            🙃
          </div>
          <input
            type="text"
            placeholder="Enter name"
            className="text-input new-category-name"/>
        </div>
        <div className="form-row">
          <button onClick={onClickCancelBtn} className="btn btn-line create-categories-modal-cancel">
            Cancel
          </button>
          <button onClick={onClickCreateBtn} className="btn create-categories-modal-create">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
