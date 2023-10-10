// Создание заголовка приложения
export const createTitle = (title) => {
  const h3 = document.createElement('h3');
  h3.textContent = `${title}`;
  return h3;
};

// Функция создания кнопок
export const createBtnGroup = (params) => {
  const btns = params.map(({className, type, text,
    disabled, contenteditable}) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.type = type;
    button.className = className;
    button.disabled = disabled;

    return button;
  });

  return btns;
};

// Функция создания модального окна
export const createModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');
  overlay.style = `
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    height: 100%;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: 0.3s ease-in-out;
    visibility: hidden;
    width: 100%;
    z-index: 1;
  `;
  const form = document.createElement('form');
  form.classList.add('form');
  form.style = `
    padding: 30px 50px;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
    left: 50%;
    position: absolute;
    top: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition-property: top, opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    z-index: 2;
  `;

  form.insertAdjacentHTML('beforeend', `
    <h2 class="form-title">Здравствуйте!
    Для продолжения введите ваше имя(С заглавной буквы)</h2>
    <div class="form-group">
    <label class="form-label" for="nameUser">Имя:</label>
    <input class="form-input" name="nameUser" id="nameUse"
    type="text" requared>
    </div>
    </div>
  `);
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.gap = '20px';

  const buttonGroup = createBtnGroup([
    {
      className: 'btn btn-primary',
      type: 'submit',
      text: 'Отправить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Отмена',
    },
  ]);
  overlay.append(form);
  btnContainer.append(...buttonGroup);
  form.append(btnContainer);
  return {
    overlay,
    formModal: form,
  };
};

// Создание формы
export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  const label = document.createElement('label');
  label.setAttribute('for', 'name');
  label.classList.add('form-group', 'me-3', 'mb-0');
  const input = document.createElement('input');
  input.classList.add('form-control');
  input.type = 'text';
  input.id = 'name';
  input.name = 'name';
  input.placeholder = 'ввести задачу';
  label.append(input);
  const select = document.createElement('select');
  select.classList.add('form-select', 'me-3');
  select.name = 'importance';
  const optionLight = document.createElement('option');
  optionLight.textContent = 'Обычная';
  optionLight.value = 'table-light';
  optionLight.selected = 'select';
  const optionWarning = document.createElement('option');
  optionWarning.textContent = 'Важная';
  optionWarning.value = 'table-warning';
  const optionDanger = document.createElement('option');
  optionDanger.textContent = 'Срочная';
  optionDanger.value = 'table-danger';
  select.append(optionLight, optionWarning, optionDanger);

  const buttonGroup = createBtnGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
      disabled: 'true',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);
  form.append(label, select, ...buttonGroup);
  return {
    form,
    input,
    btnSave: buttonGroup[0],
    btnReset: buttonGroup[1],
  };
};

// Создание таблицы
export const createTable = () => {
  const div = document.createElement('div');
  div.classList.add('table-wrapper');
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  div.append(table);
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <thead>
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Важность задачи</th>
        <th>Действия
        (для зверершения редактирования
        нажать второй раз на кнопку редактировать)
        </th>
      </tr>
    </thead>
  `);

  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  table.tbody = tbody;

  return {
    div,
    thead,
    tbody,
  };
};


// Функция создания строки с делом
export const createRow = ({id, name, status, classTR,
  classTdTask, classTdStatus, importance}) => {
  const tr = document.createElement('tr');
  tr.classList.add(classTR);
  const tdNumber = document.createElement('td');
  tdNumber.textContent = id;

  const tdTask = document.createElement('td');
  tdTask.classList.add(classTdTask);
  tdTask.textContent = name;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add(classTdStatus || 'table-success');
  tdStatus.textContent = status;

  const tdImportance = document.createElement('td');
  tdImportance.classList.add(importance);

  if (tr.closest('.table-success')) {
    tdImportance.style = 'background-color: #d1e7dd';
  }

  if (importance === 'table-warning') {
    tdImportance.textContent = 'Важная';
  } else if (importance === 'table-danger') {
    tdImportance.textContent = 'Срочная';
  } else {
    tdImportance.textContent = 'Обычная';
  }

  const tdTactic = document.createElement('td');
  tdTactic.style = 'display: flex; gap: 10px;';
  const buttonGroup = createBtnGroup([
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },
    {
      className: 'btn btn-primary',
      type: 'button',
      contenteditable: 'true',
      text: 'Редактировать / Завершить редактирование',
    },
  ]);
  tdTactic.append(...buttonGroup);
  tr.append(tdNumber, tdTask, tdStatus, tdImportance, tdTactic);
  return tr;
};
