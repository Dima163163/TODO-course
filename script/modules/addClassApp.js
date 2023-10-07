// Функция добавления класса контейнеру приложения
export const addClassApp = (app) => {
  app.classList.add('vh-100', 'w-100',
      'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column');
  return app;
};
