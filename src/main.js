import './styles/main.scss'

//Switch vars
const extGrid = document.querySelector('.hero__grid')

//Theme vars
const themeBtn = document.querySelector('.header__theme')

//Filter vars
const filterButtons = document.querySelectorAll('.hero__title-filter-button');
const gridItems = document.querySelectorAll('.hero__grid-item');

// Делегирование событий на все switch и remove
extGrid.addEventListener('click', (e) => {
    // switch
    const switchElement = e.target.closest('.hero__grid-item-interact-switch');

    if (switchElement) {
        switchElement.classList.toggle('enable');
    }

    // remove
    const removeButton = e.target.closest('.hero__grid-item-interact-button');

    if (removeButton) {
        const extItem = removeButton.closest('.hero__grid-item');
        const extName = extItem.querySelector('.hero__grid-item-info-text-name').textContent;

        const isConfirmed = confirm(`Вы точно хотите удалить расширение "${extName}"?`);

        if (isConfirmed) {
            // Если пользователь подтвердил - удаляем
            extItem.remove();
        }
    
    }

});

//Theme switch func
function themeSwitch(){
    document.documentElement.classList.toggle('dark');

    const img = themeBtn.querySelector('img');
    if (img) {
        const isDarkNow = document.documentElement.classList.contains('dark');
        img.src = isDarkNow 
            ? './images/icon-sun.svg' 
            : './images/icon-moon.svg';
    }
}

//Theme switch handler
themeBtn.addEventListener('click', () => {
    themeSwitch();
})


// Show\hide extension func
function filterExtensions(filterType) {
    gridItems.forEach(item => {
        // Проверяем, включён ли switch в этом расширении
        const switchElement = item.querySelector('.hero__grid-item-interact-switch');
        const isActive = switchElement.classList.contains('enable');

        // Решаем, показывать карточку или нет
        let shouldShow = true;

        if (filterType === 'active') {
            shouldShow = isActive;
        } else if (filterType === 'inactive') {
            shouldShow = !isActive;
        }
        // 'all' - shouldShow остаётся true всегда

        // Показываем или скрываем карточку
        if (shouldShow) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// click on buttons handler
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный стиль со всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Делаем текущую кнопку активной
        button.classList.add('active');

        // Определяем, какой фильтр выбрали
        const text = button.textContent.trim().toLowerCase();

        let filterType = 'all';

        if (text === 'active') {
            filterType = 'active';
        } else if (text === 'inactive') {
            filterType = 'inactive';
        }

        // Применяем фильтр
        filterExtensions(filterType);
    });
});
