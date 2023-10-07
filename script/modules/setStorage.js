
// Функция получения данных из localStorage
export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Функция записи в localStorage
export const setStorage = (obj) => {
  const user = localStorage.getItem('user');
  if (!user) return;

  const data = getStorage(user);
  if (typeof obj === 'object') {
    data.push(obj);
    localStorage.setItem(user, JSON.stringify(data));
  }
  if (Array.isArray(obj)) {
    localStorage.setItem(user, JSON.stringify(obj));
  }
};

// Функция добавления дела в объект
export const addJobData = (job) => {
  const user = localStorage.getItem('user');
  if (!user) return;
  if (job) {
    setStorage(job);
  }
};
