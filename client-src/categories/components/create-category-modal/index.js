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
    <div className="create-category-modal">
      <h1 className="modal-title">
        New Category
      </h1>
      <form>
        <div className="form-row">
          <div className="create-category-modal-emoji-select">
            🙃
          </div>
          <input
            type="text"
            placeholder="Enter name"
            className="text-input new-category-name"/>
        </div>
        <div className="form-row">
          <button onClick={onClickCancelBtn} className="btn btn-line create-category-modal-cancel">
            Cancel
          </button>
          <button onClick={onClickCreateBtn} className="btn create-category-modal-confirm">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
