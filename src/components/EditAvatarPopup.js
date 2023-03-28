import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            name="link"
            id="url-avatar-image"
            type="url"
            placeholder="Ссылка на новый аватар"
            className="popup__input popup__input_text_info"
            required
            ref={avatarRef}
          />
          <span className="url-avatar-image-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup