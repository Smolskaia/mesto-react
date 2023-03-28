// Файл App.js — корневой компонент приложения.

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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
    // проверяем, есть ли уже лайк на этой карточке
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
    api.deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err));
  }
  // изменение данных пользователя
  function handleUpdateUser(inputData) {
    api.setUserInfo(inputData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // изменение аватара
  function handleUpdateAvatar(inputData) {
    api.setAvatar(inputData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // добавление карточки
  function handleAddPlaceSubmit(inputData) {
    api.addNewCard(inputData)
    .then((res) => {
      setCards([res, ...cards]);
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

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
