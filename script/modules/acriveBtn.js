// Функция активации и деактивации кнопки сохранить
export const activeSaveBtn = (input, btn) => {
  input.addEventListener('change', () => {
    if (input.value === '') {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  });
};
export default activeSaveBtn;
