// Файл App.js — корневой компонент приложения.

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
// import PopupWithForm from "./PopupWithForm";
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

  // Создаем переменную isOpen снаружи useEffect, в которой следим за всеми состояниями попапов.
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  useEffect(() => {
    /* Объявляем функцию внутри useEffect, 
    чтобы она не теряла свою ссылку при обновлении компонента. */
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    
    /* Если хоть одно состояние isOpen true или не null, 
    то какой-то попап открыт, значит, нужно навешивать обработчик. */
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
    /*удаляем обработчик в clean up функции через return */  
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) /*массив зависимостей c isOpen, чтобы отслеживать изменение 
  этого показателя открытости. Как только он становится true, 
  то навешивается обработчик, когда в false, тогда удаляется обработчик.*/
  
  /*переменная для отслеживания состояния загрузки во время 
  ожидания ответа от сервера*/
  const [isLoading, setIsLoading] = React.useState(false);

  // лайк
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      // меняем стейт карточек. Поочередно сравниваем id каждой карточки с id карточки
      // на которой нажали лайк, если id совпадают, тогда обновить карточку с метода api
      // если нет - оставь текущущую карточку
      setCards((state) =>
        state.map((item) => (item._id === card._id ? newCard : item))
      );
    })
    .catch((err) => console.log(err));
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
    setIsLoading(true);
    api.setUserInfo(inputData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // изменение аватара
  function handleUpdateAvatar(inputData) {
    setIsLoading(true);
    api.setAvatar(inputData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // добавление карточки
  function handleAddPlaceSubmit(inputData) {
    setIsLoading(true);
    api.addNewCard(inputData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
            onLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          {/* <PopupWithForm
            name="delete-confirmation"
            title="Вы уверены?"
            btnText="Да"
          /> */}

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
