import './styles/main.scss'

//Switch vars
const extGrid = document.querySelector('.hero__grid')


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