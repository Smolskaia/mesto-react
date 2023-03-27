import React, { useContext } from "react";
// import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const { cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete } = props;

  // контекст пользователя
  const currentUser = useContext(CurrentUserContext);

  // // Объявляем новые переменные состояния данных пользователя
  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");

  // // Объявляем переменную состояния массива карточек
  // const [cards, setCards] = useState([]);
  
  // useEffect(() => {
  // Promise.all([api.getUserInfo(),  api.getInitialCards()])
  //   .then(([userData, cards])=> {
  //     setUserName(userData.name);
  //     setUserDescription(userData.about);
  //     setUserAvatar(userData.avatar);
  //     setCards(cards);
  //   })
  //   .catch((err) => console.log(err));
  // }, []);
  
  // useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((res) => {
  //       // console.log('res =>', res)
  //       setUserName(res.name);
  //       setUserDescription(res.about);
  //       setUserAvatar(res.avatar);
  //     })
  //     .catch((err) => console.log(err));

  //   api.getInitialCards()
  //     .then((res) => {
  //       // console.log("res =>", res);
  //       setCards(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
  // Императивный подход
  // const handleEditAvatarClick = () => {
  //   const popupSetAvatar = document.querySelector(".popup_form_update-avatar");
  //   popupSetAvatar.classList.add("popup_opened");
  // };
  // const handleEditProfileClick = () => {
  //   const popupEdit = document.querySelector(".popup_form_edit");
  //   popupEdit.classList.add("popup_opened");
  // };
  // const handleAddPlaceClick = () => {
  //   const popupAdd = document.querySelector(".popup_form_add");
  //   popupAdd.classList.add("popup_opened");
  // };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper-avatar">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
          <button
            onClick={onEditAvatar}
            className="profile__btn-edit-avatar"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__btn-edit"
            type="button"
            title="Редактировать профиль"
            aria-label="Редактировать профиль"
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__btn-add"
          type="button"
          title="Добавить новую фотографию"
          aria-label="Добавить новую фотографию"
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              currentUser={currentUser._id}
              likesCount={card.likes.length}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
