import {getStorage} from './setStorage.js';
import {createRow, createTitle, createForm,
  createTable, createModal} from './createElements.js';
import {addClassApp} from './addClassApp.js';


// Функция отрисовки дел
export const renderCases = (elem) => {
  const user = localStorage.getItem('user');
  if (!user) return;
  const data = getStorage(user);
  const allRow = data.map((item) => createRow(item));
  elem.textContent = '';
  elem.append(...allRow);

  return allRow;
};

// Отрисовка списка дел
export const renderToDo = (app, title) => {
  addClassApp(app);
  const appTitle = createTitle(title);
  const {form, input, btnSave} = createForm();
  const {div, tbody} = createTable(form);
  const {formModal, overlay} = createModal();

  app.append(appTitle, form, div, overlay);

  return {
    list: tbody,
    form,
    input,
    btnSave,
    formModal,
    overlay,
  };
};
