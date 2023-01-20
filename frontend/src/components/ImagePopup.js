import React from 'react';

function ImagePopup({selectedCard, onClose}) {

  const card = selectedCard || {link: '', name: ''} //

  return (
    <>
      <div className={`popup popup-image ${card.link ? 'popup_is-opened' : ''}`}>
        <button className="popup__close-button popup-image__close-button" onClick={onClose}></button>
        <img src={card.link} className="popup-image__image" alt={card.name} />
        <p className="popup-image__text">{card.name}</p>
      </div>
      <div className={`overlay_hidden ${card.link ? 'overlay_active' : ''}`} onClick={onClose}>
      </div>
    </>
  );
}

export default ImagePopup;
