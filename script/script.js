'use strict';

// const data = [
//   {
//     id: 1,
//     name: 'Купить слона',
//     status: 'В процессе',
//     classTR: 'table-light',
//     classTdTask: 'task',
//     classTdStatus: 'status',
//   },
//   {
//     id: 2,
//     name: 'Помыть кота',
//     status: 'В процессе',
//     classTR: 'table-light',
//     classTdTask: 'task',
//     classTdStatus: 'status',
//   },
// ];

{
  // Функция авторизации пользователя
  const authorizationUser = () => {
    const key = prompt('Введите ваше имя');
    return key;
  };

  // Функция получения данных из localStorage
  const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  // Функция записи в localStorage
  const setStorage = (key, obj) => {
    const data = getStorage(key);
    console.log(data);
    if (typeof obj === 'object') {
      data.push(obj);
      localStorage.setItem(key, JSON.stringify(data));
    }
    if (Array.isArray(obj)) {
      localStorage.setItem(key, JSON.stringify(obj));
    }
  };

  // Функция добавления дела в объект
  const addJobData = (key, job) => {
    if (job) {
      setStorage(key, job);
    }
  };

  // Функция добавления класса контейнеру приложения
  const addClassApp = (app) => {
    app.classList.add('vh-100', 'w-100',
        'd-flex', 'align-items-center',
        'justify-content-center', 'flex-column');
    return app;
  };

  // Создание заголовка приложения
  const createTitle = (title) => {
    const h3 = document.createElement('h3');
    h3.textContent = `${title}`;
    return h3;
  };

  // Функция создания кнопок
  const createBtnGroup = (params) => {
    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.type = type;
      button.className = className;

      return button;
    });

    return btns;
  };

  // Создание формы
  const createForm = () => {
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

    const buttonGroup = createBtnGroup([
      {
        className: 'btn btn-primary me-3',
        type: 'submit',
        text: 'Сохранить',
      },
      {
        className: 'btn btn-warning',
        type: 'reset',
        text: 'Очистить',
      },
    ]);
    form.append(label, ...buttonGroup);
    return {
      form,
      input,
      btnSave: buttonGroup[0],
      btnReset: buttonGroup[1],
    };
  };

  // Создание таблицы
  const createTable = () => {
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
          <th>Действия</th>
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
  const createRow = ({id, name, status, classTR,
    classTdTask, classTdStatus}) => {
    const tr = document.createElement('tr');
    tr.classList.add(classTR);
    const tdNumber = document.createElement('td');
    tdNumber.textContent = id;

    const tdTask = document.createElement('td');
    tdTask.classList.add(classTdTask);
    tdTask.textContent = name;

    const tdStatus = document.createElement('td');
    tdStatus.classList.add(classTdStatus);
    tdStatus.textContent = status;

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
    ]);
    tdTactic.append(...buttonGroup);
    tr.append(tdNumber, tdTask, tdStatus, tdTactic);
    return tr;
  };

  // Функция отрисовки дел
  const renderCases = (elem, key) => {
    const data = getStorage(key);
    const allRow = data.map((item) => createRow(item));
    elem.append(...allRow);

    return allRow;
  };


  // Функция пометки дела как выполненное
  const jobSuccess = (data, form, key) => {
    form.addEventListener('click', e => {
      const target = e.target;
      const numberElement = Number(target.closest('tr')
          .querySelector('td').textContent);
      const elem = target.closest('.table-light') ?
      target.closest('.table-light') : target.closest('.table-success');
      const nameJob = elem.querySelector('.task') ?
      elem.querySelector('.task') :
      elem.querySelector('.text-decoration-line-through');
      const statusName = elem.querySelector('.status');
      if (target.closest('.table-light')) {
        if (target.classList.contains('btn-success')) {
          elem.classList.remove('table-light');
          elem.classList.add('table-success');
          nameJob.classList.remove('task');
          nameJob.classList.add('text-decoration-line-through');
          statusName.textContent = 'Выполнено';
          const newData = data.map((job) => {
            if (job.id === numberElement) {
              return {...job, classTR: 'table-success',
                classTdTask: 'text-decoration-line-through',
                classTdStatus: 'status', status: 'Выполнено',
              };
            } else {
              return job;
            }
          });
          setStorage(key, newData);
        }
      } else {
        if (target.classList.contains('btn-success')) {
          elem.classList.remove('table-success');
          elem.classList.add('table-light');
          nameJob.classList.remove('text-decoration-line-through');
          nameJob.classList.add('task');
          statusName.textContent = 'В процессе';
          const newData = data.map((job) => {
            if (job.id === numberElement) {
              return {...job, classTR: 'table-light',
                classTdTask: 'task',
                classTdStatus: 'status', status: 'В процессе',
              };
            } else {
              return job;
            }
          });
          setStorage(key, newData);
        }
      }
    });
  };

  // Функция удаления дела
  const jobDel = (form, key, list) => {
    form.addEventListener('click', e => {
      const target = e.target;
      const data = getStorage(key);
      const numberElement = Number(target.closest('tr')
          .querySelector('td').textContent);
      if (target.classList.contains('btn-danger')) {
        target.closest('tr').remove();
        const newData = data.filter((job) => job.id !== numberElement);
        setStorage(key, newData);
      }
    });
  };

  // Функция добавления дела в список дел
  const addJobPage = (job, list) => {
    list.append(createRow(job));
  };

  // Функция добавления новой задачи в список
  const formControl = (form, list, key) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = getStorage(key);
      const formData = new FormData(e.target);
      const newJob = Object.fromEntries(formData);
      const number = data.length + 1;
      newJob.id = number;
      newJob.status = 'В процессе';
      newJob.classTR = 'table-light';
      newJob.classTdTask = 'task';
      newJob.classTdStatus = 'status';
      addJobPage(newJob, list);
      addJobData(key, newJob);
      form.reset();
    });
  };

  // Отрисовка списка дел
  const renderToDo = (app, title) => {
    addClassApp(app);
    const appTitle = createTitle(title);
    const {form} = createForm();
    const {div, tbody} = createTable(form);


    app.append(appTitle, form, div);

    return {
      list: tbody,
      form,
    };
  };

  // Функционал приложения
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const key = authorizationUser();
    const data = getStorage(key);
    const {list, form} = renderToDo(app, title);
    renderCases(list, key);
    jobSuccess(data, list, key);
    jobDel(list, key, list);
    formControl(form, list, key);
  };

  window.toDoListInit = init;
}
