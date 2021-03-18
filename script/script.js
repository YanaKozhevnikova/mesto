let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('input[name="name"]');
let aboutInput = popup.querySelector('input[name="about"]');
let username = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

// Открытие попапа
function openPopup() {
  popup.classList.add('popup__opened');
}

editButton.addEventListener('click', openPopup);

//Закрытие попапа
function closePopup() {
  popup.classList.remove('popup__opened')
}

closeButton.addEventListener('click', closePopup);

// Текст в полях формы

nameInput.value = username.textContent;
aboutInput.value = about.textContent;

// Сохранение изменений и закрытие формы
function formSubmitHandler (evt) {
    evt.preventDefault();
    username.textContent = nameInput.value ;
    about.textContent = aboutInput.value;
    popup.classList.remove('popup__opened')
}

popup.addEventListener('submit', formSubmitHandler);
