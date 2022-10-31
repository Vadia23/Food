function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // TABS
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() { // ФУНКЦИЯ СКРЫТИЯ ТАБОВ
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent (i = 0) { // ФУНКЦИЯ ПОКАЗОВ ТАБА.     "i = 0" - ОЗНАЧАЕТ ЧТО ЕСЛИ В ФУНКЦИЮ НЕ ПОСТУПИТ АРГУМЕНТ "0" БУДЕТ АРГУМЕНТОМ ПО УМОЛЧАНИЮ.
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent(); 
    showTabContent();

    tabsParent.addEventListener('click', (event) => { // ДЕЛЕГИРОВАНИЕ СОБЫТИЙ
        const target = event.target; // ЧТО БЫ НЕ ПРОПИСЫВАТЬ КАЖДЫЙ РАЗ "event.terget";

        if (target && target.classList.contains(tabsSelector.slice(1))) { // УСЛОВИЕ ЕСТЬ ЛИ КЛИК И ТОЧНО ЛИ МЫ КЛИКНУЛИ В ТАБ. ПОСЛЕ ЭТОГО ВЫПОЛН. КОД НИЖЕ
            tabs.forEach((item, i) => { // ЗАПУСТИЛИ ПЕРЕБОР
                if (target == item) { //  УСЛОВИЕ ЕСТЬ ЛИ КЛИК У ЭЛЕМЕНТА
                    hideTabContent(); // ЗАПУСК ФУНКЦИИ СКРЫТИЯ КОНТЕНТА
                    showTabContent(i); // ЗАПУСК ФУНКЦИИ ПОКАЗА КОНТЕНТА С ИНДЕКСОМ НА КОТОРЫЙ КЛИКНУЛИ
                }
            });
        }
    });
}

export default tabs;