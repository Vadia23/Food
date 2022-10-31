import {openModal, closeModalWindow} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // FORMS

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 10px auto 0 auto;
            `;
            /* form.append(statusMessage); */
            form.insertAdjacentElement('afterend', statusMessage);

            /* const request = new XMLHttpRequest;
            request.open('POST', 'server.php'); */ // ВСЕГДА ВЫЗЫВАЕТСЯ ПЕРВЫМ ДЛЯ НАСТРОЙКИ запроса

            

            /* request.setRequestHeader('Content-type', 'application/json'); */ // Обычный формат отправки без этой строки, формат отправки json с этой строкой
            const formData = new FormData(form);

            // КОД НИЖЕ ТОЛЬКО ДЛЯ ФОРМАТА ОТПРАВКИ json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
             
            //request.send(/* formData */ json) 
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            /* request.addEventListener('load', () => { 
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success); 
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            }); */
        });
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('hide'); 
        openModal('.modal' ,modalTimerId);
        

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); 
        thanksModal.innerHTML = `
        <div class = 'modal__content'>
            <div data-close class="modal__close">&times;</div>
            <div class = "modal__title">${message}</div> 
        </div>
        `;
        
        document.querySelector('.modal').append(thanksModal); 
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModalWindow('.modal');
        }, 4000);
    }

    /* fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => console.log(json)); */

    fetch('http://localhost:3000/menu') 
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;