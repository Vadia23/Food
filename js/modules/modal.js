
function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    /* modalWindow.classList.toggle('show'); */
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
      clearInterval(modalTimerId);
    }
  }

function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add('hide');
  modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }



function modal(triggerSelector, modalSelector, modalTimerId) {
// MODAL

  const modalTrigger = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

  modalTrigger.forEach( (btn) => {
  btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });    

  /*  modalClose.addEventListener('click', closeModalWindow); */
  /* modalWindow.classList.add('hide');
  modalWindow.classList.remove('show'); */
  /* modalWindow.classList.toggle('show'); */

  modalWindow.addEventListener('click', (event) => {
  if (event.target === modalWindow || event.target.getAttribute('data-close') == '' ) {
    closeModalWindow(modalSelector);
  }
  });
  document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
    closeModalWindow(modalSelector);
  }
  });

  

  // ВСПЛЫТИЕ МОДАЛЬНОГО ОКНА ПРИ СКРОЛЕ ДО КОНЦА СТРАНИЦЫ

  function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
  }  }

  window.addEventListener('scroll', showModalByScroll);
  }
export default modal;

export {openModal, closeModalWindow};