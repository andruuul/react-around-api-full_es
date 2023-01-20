import React from 'react'
import PopupWithForm from './PopupWithForm'

export function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit}) {
  const nameRef = React.useRef()
  const linkRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return(
    <PopupWithForm title="New Place" name="new-place" buttonText="Add"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input ref={nameRef} className="popup__input" type="text" placeholder="Title" required minLength={2} maxLength={30} name="name" />
      <span className="popup__input-error inputNewPlaceTitle-input-error"></span>
      <input ref={linkRef} className="popup__input" type="url" placeholder="Image's URL" required name="link" />
      <span className="popup__input-error popup__input-error-lower inputNewPlaceURL-input-error"></span>
    </PopupWithForm>)
    
}