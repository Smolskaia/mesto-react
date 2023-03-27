import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  //переменные состояния name и description
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
              onChange={handleName}
              value={name || ""}
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
              onChange={handleDescription}
              value={description || ""}
            />
            <span className="profile-info-error popup__input-error"></span>
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
