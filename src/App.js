// Файл App.js — корневой компонент приложения. О нём поговорим чуть позже.

import React from "react";
// import logo from './logo.svg';
import "./App.css";

function App() {
  return (
    <>
      <div class="page__container">
        <header class="header">
          <img
            class="header__logo"
            src="<%=require('./images/header-logo.svg')%>"
            alt="Логотип проекта Место"
          />
        </header>

        <main class="content">
          <section class="profile">
            <div class="profile__wrapper-avatar">
              <img
                class="profile__avatar"
                src="<%=require('./images/profile-avatar.png')%>"
                alt="Аватар профиля"
              />
              <button
                class="profile__btn-edit-avatar"
                type="button"
              ></button>
            </div>

            <div class="profile__info">
              <h1 class="profile__name">Жак-Ив Кусто</h1>
              <button
                class="profile__btn-edit"
                type="button"
                title="Редактировать профиль"
                aria-label="Редактировать профиль"
              ></button>
              <p class="profile__about">Исследователь океана</p>
            </div>
            <button
              class="profile__btn-add"
              type="button"
              title="Добавить новую фотографию"
              aria-label="Добавить новую фотографию"
            ></button>
          </section>

          <section class="elements">
            <ul class="elements__list"></ul>
          </section>
        </main>

        <footer class="footer">
          <p class="footer__author">&copy; 2023 Anna Smolskaya</p>
        </footer>
      </div>

      <div class="popup popup_form_edit">
        <div class="popup__container">
          <button
            type="button"
            class="popup__btn-close"
          ></button>
          <h2 class="popup__title">Редактировать профиль</h2>
          <form
            name="form-edit"
            class="popup__form"
            novalidate
          >
            <label class="popup__label">
              <input
                name="name"
                id="username"
                type="text"
                placeholder="Имя"
                class="popup__input popup__input_text_name"
                required
                minlength="2"
                maxlength="40"
              />
              <span class="username-error popup__input-error"></span>
            </label>
            <label class="popup__label">
              <input
                name="info"
                id="profile-info"
                type="text"
                placeholder="О себе"
                class="popup__input popup__input_text_info"
                required
                minlength="2"
                maxlength="200"
              />
              <span class="profile-info-error popup__input-error"></span>
            </label>
            <button
              name="submitForm"
              type="submit"
              class="popup__btn-save popup__btn-save_disabled"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div class="popup popup_form_add">
        <div class="popup__container">
          <button
            type="button"
            class="popup__btn-close"
          ></button>
          <h2 class="popup__title">Новое место</h2>
          <form
            name="form-add-card"
            class="popup__form"
            novalidate
          >
            <label class="popup__label">
              <input
                name="name"
                id="image-name"
                type="text"
                placeholder="Название"
                class="popup__input popup__input_text_name"
                required
                minlength="2"
                maxlength="30"
              />
              <span class="image-name-error popup__input-error"></span>
            </label>
            <label class="popup__label">
              <input
                name="link"
                id="url-image"
                type="url"
                placeholder="Ссылка на картинку"
                class="popup__input popup__input_text_info"
                required
              />
              <span class="url-image-error popup__input-error"></span>
            </label>
            <button
              name="submitForm"
              type="submit"
              class="popup__btn-save popup__btn-save_disabled"
            >
              Создать
            </button>
          </form>
        </div>
      </div>

      <div class="popup popup_form_viewer">
        <div class="popup__container-img">
          <img
            class="popup__image"
            src="#"
            alt="#"
          />
          <h2 class="popup__description"></h2>
          <button
            class="popup__btn-close"
            type="button"
            title="Закрыть"
          ></button>
        </div>
      </div>

      <div class="popup popup_delete-my-card_confirmation">
        <div class="popup__container">
          <button
            type="button"
            class="popup__btn-close"
          ></button>
          <h2 class="popup__title popup__title_type_delete-confirmation">
            Вы уверены?
          </h2>
          <form
            name="form-delete-confirmation"
            class="popup__form"
            novalidate
          >
            <button
              name="submitForm"
              type="submit"
              class="popup__btn-save"
            >
              Да
            </button>
          </form>
        </div>
      </div>

      <div class="popup popup_form_update-avatar">
        <div class="popup__container">
          <button
            type="button"
            class="popup__btn-close"
          ></button>
          <h2 class="popup__title">Обновить аватар</h2>
          <form
            name="form-update-avatar"
            class="popup__form"
            novalidate
          >
            <input
              name="link"
              id="url-avatar-image"
              type="url"
              placeholder="Ссылка на новый аватар"
              class="popup__input popup__input_text_info"
              required
            />
            <span class="url-avatar-image-error popup__input-error"></span>
            <button
              name="submitForm"
              type="submit"
              class="popup__btn-save"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
