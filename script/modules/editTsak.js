import {getStorage, setStorage} from './setStorage.js';

// Функция редактирования задачи
export const editTask = (list) => {
  list.addEventListener('click', e => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const data = getStorage(user);
    const target = e.target;
    if (target.closest('.btn-primary')) {
      if (target.closest('.table-light')) {
        const jobTask = target.closest('.table-light')
            .querySelector('.task');
        jobTask.setAttribute('contenteditable', 'true');
        const jobId = target.closest('.table-light').querySelector('td');
        const jobNumber = Number(jobId.textContent);
        const newDate = data.map(job => {
          if (job.id === jobNumber) {
            return {...job, name: jobTask.textContent};
          } else {
            return job;
          }
        });
        setStorage(user, newDate);
      }
    }
  });
};

