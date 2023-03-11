// Файл App.js — корневой компонент приложения. О нём поговорим чуть позже.

import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
// import logo from './logo.svg';
// import "../index.css";

function App() {


  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          
        />
        <ImagePopup  />
        <Footer />

        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          btnText="Сохранить"
          

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
