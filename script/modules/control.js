import {getStorage, setStorage, addJobData} from './setStorage.js';
import {renderCases} from './render.js';
import {createRow} from './createElements.js';

// Функция отправки ключа из модального окна
export const modalFormControl = (formModal, closeModal, list) => {
  formModal.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newKey = Object.fromEntries(formData);
    if (newKey.nameUser) {
      closeModal();
      const key = newKey.nameUser;
      localStorage.setItem('user', key);
      renderCases(list, key);
    }
  });
};

// Функция пометки дела как выполненное
export const jobSuccess = (form) => {
  form.addEventListener('click', e => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const data = getStorage(user);
    const target = e.target;
    const numberElement = Number(target.closest('tr')
        .querySelector('td').textContent);
    const elem = target.closest('.table-light') ?
    target.closest('.table-light') : target.closest('.table-success');
    const nameJob = elem.querySelector('.task') ?
    elem.querySelector('.task') :
    elem.querySelector('.text-decoration-line-through');
    const statusName = elem.querySelector('.status');
    const urgencyOfTask = elem.querySelector('.table-light') ||
    elem.querySelector('.table-warning') || elem.querySelector('.table-danger');
    if (target.closest('.table-light')) {
      if (target.classList.contains('btn-success')) {
        elem.classList.remove('table-light');
        elem.classList.add('table-success');
        nameJob.classList.remove('task');
        nameJob.classList.add('text-decoration-line-through');
        urgencyOfTask.style = 'background-color: #d1e7dd;';
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
        setStorage(newData);
      }
    } else {
      if (target.classList.contains('btn-success')) {
        elem.classList.remove('table-success');
        elem.classList.add('table-light');
        nameJob.classList.remove('text-decoration-line-through');
        nameJob.classList.add('task');
        if (urgencyOfTask.textContent === 'Обычная') {
          urgencyOfTask.style = 'background-color: #f8f9fa;';
        } else if (urgencyOfTask.textContent === 'Важная') {
          urgencyOfTask.style = 'background-color: #fff3cd;';
        } else {
          urgencyOfTask.style = 'background-color: #f8d7da;';
        }
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
        setStorage(newData);
      }
    }
  });
};

// Функция удаления дела
export const jobDel = (form, list) => {
  form.addEventListener('click', e => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const target = e.target;
    const data = getStorage(user);
    const numberElement = Number(target.closest('tr')
        .querySelector('td').textContent);
    if (target.classList.contains('btn-danger')) {
      const question = confirm('Вы уверены что хотите удалить задачу?');
      console.log(target.classList.contains('btn-danger'));
      if (question) {
        target.closest('tr').remove();
        const newData = data.filter((job) => job.id !== numberElement);
        const newJob = newData.map((item, index) =>
          ({...item, id: index + 1}));
        setStorage(newJob);
        list.textContent = '';
        renderCases(list);
      }
    }
  });
};

// Функция добавления дела в список дел
export const addJobPage = (job, list) => {
  list.append(createRow(job));
};

// Функция добавления новой задачи в список
export const formControl = (form, list, btn) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (!user) return;
    const data = getStorage(user);
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData);
    console.log(newJob);
    if (newJob.name !== '') {
      const number = data.length + 1;
      newJob.id = number;
      newJob.status = 'В процессе';
      newJob.classTR = 'table-light';
      newJob.classTdTask = 'task';
      newJob.classTdStatus = 'status';
      addJobPage(newJob, list);
      addJobData(newJob);
      form.reset();
      btn.disabled = 'true';
    }
  });
};

// Функция вызова модального окна
export const modalControl = (formOverlay, formModal) => {
  // Функция открытия модального окна
  const openModal = () => {
    formOverlay.style.opacity = '1';
    formOverlay.style.visibility = 'visible';
    formModal.style.opacity = '1';
  };
  // Функция закрытия модального окна
  const closeModal = () => {
    formOverlay.style.opacity = '0';
    formOverlay.style.visibility = 'hidden';
    formModal.style.opacity = '0';
  };
  openModal();
  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('btn-danger')) {
      closeModal();
    }
  });
  return closeModal;
};
