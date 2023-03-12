// Файл App.js — корневой компонент приложения.

import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  // Объявляем новые переменные состояния попапов.
  // Аргумент useState — это начальное состояние.
  // Вызов useState возвращает массив с двумя элементами, который содержит:
  // текущее значение состояния и функцию-сеттер для его обновления.
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  // открытие полноразмерной картинки
  // function handleCardClick(card) {
  //   setSelectedCard({
  //     isOpen: false
  //   })
  // }

  // открытие попапов используя Хук состояния
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
        />

        <Footer />
        
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          btnText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <input
                name="link"
                id="url-avatar-image"
                type="url"
                placeholder="Ссылка на новый аватар"
                className="popup__input popup__input_text_info"
                required
              />
              <span className="url-avatar-image-error popup__input-error"></span>
            </>
          }
        />

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          btnText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label className="popup__label">
                <input
                  name="name"
                  id="username"
                  type="text"
                  placeholder="Имя"
                  className="popup__input popup__input_text_name"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span className="username-error popup__input-error"></span>
              </label>
              <label className="popup__label">
                <input
                  name="info"
                  id="profile-info"
                  type="text"
                  placeholder="О себе"
                  className="popup__input popup__input_text_info"
                  required
                  minLength="2"
                  maxLength="200"
                />
                <span className="profile-info-error popup__input-error"></span>
              </label>
            </>
          }
        />

        <PopupWithForm
          name="add"
          title="Новое место"
          btnText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label className="popup__label">
                <input
                  name="name"
                  id="image-name"
                  type="text"
                  placeholder="Название"
                  className="popup__input popup__input_text_name"
                  required
                  minLength="2"
                  maxLength="30"
                />
                <span className="image-name-error popup__input-error"></span>
              </label>
              <label className="popup__label">
                <input
                  name="link"
                  id="url-image"
                  type="url"
                  placeholder="Ссылка на картинку"
                  className="popup__input popup__input_text_info"
                  required
                />
                <span className="url-image-error popup__input-error"></span>
              </label>
            </>
          }
        />

        <PopupWithForm
          name="delete-confirmation"
          title="Вы уверены?"
          btnText="Да"
        />
      </div>
    </div>
  );
}

export default App;
