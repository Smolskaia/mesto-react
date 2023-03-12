import React from "react";

function Card (props) {
  const { card } = props;

  function handleCardClick() {
    props.onCardClick(card);
  }  

  return (
    <div className="element">
        <img className="element__img" src={card.link} onClick={handleCardClick} alt={card.name}/>
        <div className="element__group">
          <h2 className="element__title">{card.name}</h2>
          <button type="button" className="element__delete"></button>
          <div className="element__like-section">
            <button type="button" className="element__like"></button>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    
  )
}

export default Card;