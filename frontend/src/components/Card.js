import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete, key, cardOwner }) { //reduje el número de parámetros que paso
  const currentUser = useContext(CurrentUserContext);
  const cardOwnerId = cardOwner._id
  console.log(currentUser._id)
  console.log(cardOwnerId)


  const isOwn = cardOwnerId === currentUser._id;
  const cardDeleteButtonClassName = (`${isOwn ? '' : 'elements-grid__delete-button_hidden'}`)
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  console.log(isLiked)
  const cardLikeButtonClassName = (`${isLiked ? 'elements-grid__like-button_active' : ''}`)

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  return ( 
    <div key={key} className="elements-grid__card">
      <img className="elements-grid__photo" alt={card.name} src={card.link} onClick={handleClick} />
      <button className={`elements-grid__delete-button ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}></button>
      <div className="elements-grid__description">
        <p className="elements-grid__place-name">{card.name}</p>
        <div className="elements-grid__like-section">
          <button className={`elements-grid__like-button ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
          <p className="elements-grid__likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}


export default Card;