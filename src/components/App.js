// Файл App.js — корневой компонент приложения.

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  // Объявляем новые переменные состояния попапов.
  // Аргумент useState — это начальное состояние.
  // Вызов useState возвращает массив с двумя элементами, который содержит:
  // текущее значение состояния и функцию-сеттер для его обновления.
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  // Объявляем переменную состояния массива карточек
  const [cards, setCards] = useState([]);
  // переменная состояния currentUser
  const [currentUser, setCurrentUser] = useState({});

  // эффект при монтировании, который будет вызывать
  // api.getUserInfo и обновлять стейт-переменную currentUser
  // из полученного значения
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        // console.log('userData =>', userData);
        // console.log("cards =>", cards);
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log("App rendered");
  // console.log("currentUser =>", currentUser);
  // console.log("cards =>", cards);

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

  // лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // меняем стейт карточек. Поочередно сравниваем id каждой карточки с id карточки
      // на которой нажали лайк, если id совпадают, тогда обновить карточку с метода api
      // если нет - оставь текущущую карточку
      setCards((state) =>
        state.map((item) => (item._id === card._id ? newCard : item))
      );
    });
  }

  // удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err));
  }
// изменение данных пользователя
  function handleUpdateUser(inputData) {
    api.setUserInfo(inputData)
    .then((res) => {
      // console.log('setUserInfo =>', res);
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
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

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* <PopupWithForm
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
          /> */}

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
    </CurrentUserContext.Provider>
  );
}

export default App;
