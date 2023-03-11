import React from "react";

function Main() {
  const handleEditAvatarClick = () => {
    const popupSetAvatar = document.querySelector(".popup_form_update-avatar");
    popupSetAvatar.classList.add("popup_opened");
  };
  const handleEditProfileClick = () => {
    const popupEdit = document.querySelector(".popup_form_edit");
    popupEdit.classList.add("popup_opened");
  };
  const handleAddPlaceClick = () => {
    const popupAdd = document.querySelector(".popup_form_add");
    popupAdd.classList.add("popup_opened");
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper-avatar">
          <img
            className="profile__avatar"
            src="<%=require('./images/profile-avatar.png')%>"
            alt="Аватар профиля"
          />
          <button onClick={handleEditAvatarClick}
            className="profile__btn-edit-avatar"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <button onClick={handleEditProfileClick}
            className="profile__btn-edit"
            type="button"
            title="Редактировать профиль"
            aria-label="Редактировать профиль"
          ></button>
          <p className="profile__about">Исследователь океана</p>
        </div>
        <button onClick={handleAddPlaceClick}
          className="profile__btn-add"
          type="button"
          title="Добавить новую фотографию"
          aria-label="Добавить новую фотографию"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}

export default Main;
