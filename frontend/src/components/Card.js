import React from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete, currentUser, }) { //reduje el número de parámetros que paso
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`${isOwn ? '' : 'elements-grid__delete-button_hidden'}`)
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`${isLiked ? 'elements-grid__like-button_active' : ''}`)

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card, isLiked)
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  return ( 
    <div className="elements-grid__card">
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