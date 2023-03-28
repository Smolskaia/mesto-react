import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, onLoading } = props;

  const [namePlace, setNamePlace] = useState('');
  const [linkPlace, setLinkPlace] = useState('');

  useEffect(() => {
    setNamePlace('');
    setLinkPlace('');
  }, [isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: namePlace,
      link: linkPlace
    });
  }

  function handleChangeNamePlace(evt) {
    setNamePlace(evt.target.value);
  }

  function handleChangeLinkPlace(evt) {
    setLinkPlace(evt.target.value);
  }

  return (
    <PopupWithForm
            name="add"
            title="Новое место"
            btnText={onLoading ? `Сохранение...` : `Создать`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
              <>
                <label className="popup__label">
                  <input
                    onChange={handleChangeNamePlace}
                    name="name"
                    id="image-name"
                    type="text"
                    placeholder="Название"
                    className="popup__input popup__input_text_name"
                    required
                    minLength="2"
                    maxLength="30"
                    value={namePlace || ""}
                  />
                  <span className="image-name-error popup__input-error"></span>
                </label>
                <label className="popup__label">
                  <input
                    onChange={handleChangeLinkPlace}
                    name="link"
                    id="url-image"
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_text_info"
                    required
                    value={linkPlace || ""}
                  />
                  <span className="url-image-error popup__input-error"></span>
                </label>
              </>
            }
          />
  )

}

export default AddPlacePopup;