import activeSaveBtn from './modules/acriveBtn.js';
import {renderToDo, renderCases} from './modules/render.js';
import {modalControl} from './modules/control.js';
import {editTask} from './modules/editTsak.js';
import {modalFormControl, jobSuccess, jobDel, formControl}
  from './modules/control.js';

{
  // Функционал приложения
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list, form, input, btnSave, overlay, formModal} =
      renderToDo(app, title);
    const closeModal = modalControl(overlay, formModal);
    modalFormControl(formModal, closeModal, list);
    activeSaveBtn(input, btnSave);
    renderCases(list);
    jobSuccess(list);
    jobDel(list, list);
    editTask(list);
    formControl(form, list, btnSave);
  };

  window.toDoListInit = init;
}
